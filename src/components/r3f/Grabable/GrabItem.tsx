import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group} from "three";
import useMouseIntersect from "../../../hooks/MouseIntersect";
import { useControlsStore } from "../../../stores/ControlsStore";
import { useMotionValue, useSpring, useTime, useTransform } from "motion/react";
import { useMusicStore } from "../../../stores/MusicStore";
import { Instrument, Song, StepNoteType, Track } from "reactronica";
import House from "../../../models/House";
import { useSFXStore } from "../../../stores/SFXStore";

import Tree from "../../../models/Tree";
import { IGrabItem } from "./GenGrabItems";
import Mill from "../../../models/Mill";
import Rock from "../../../models/Rock";






const GrabItem = (
    {grabItem}:{grabItem:IGrabItem}
) => {


    const ref = useRef<Group>(null)
    const parentRef = useRef<Group>(null)


    const [isDragging, setIsDragging] = useState(false);
    const [hasPlayedPop, setHasPlayedPop] = useState(false);
    const [placedStep, setPlacedStep] = useState<number|null>(null);
    const [isNote, setIsNote]= useState(false)

    const [currentNoteIndex, setCurrentNoteIndex] = useState(grabItem.initNoteIndex);


    // const currentNote = () => {
    //     return {name:getBells()[currentNoteIndex], duration:1.5} as StepNoteType
    // }
    // const colorNote = () => {
    //     return colors[currentNoteIndex]
    // }
 
    const [dynamicNotes, setDynamicNotes] = useState<StepNoteType[]>([])

    const {setStepsByType, currentGamme, getDynamicNotes, changeNote} = useMusicStore();
    const {setIsGlobalDragging, isGlobalDragging, passGrabNewPos, setCursorType} = useControlsStore();
    const {play, stop} = useSFXStore();
    const {motionPointerPos} = useMouseIntersect();
    

    //#region MOTION VALUE
    const time = useTime();
    const timeToScale = useTransform(time,[0,300],[0,1])
    const timeSpringScale = useSpring(timeToScale);

    const yScale = useMotionValue(0);
    const springYScale = useMotionValue(0);
    const scale = useMotionValue(0.9);
    const springScale = useSpring(scale);

    const savedPosX = useMotionValue(grabItem.initX);
    const savedPosY = useMotionValue(-2.3);
    const savedPosZ = useMotionValue(grabItem.initZ);
    const posX = useTransform(()=> {
        if(isDragging) {
            return motionPointerPos.get().x
        } else return savedPosX.get()
    });
    const springX = useSpring(posX, { stiffness: 100, damping: 20 });
    const posY = useTransform(()=> {
        if(isDragging) {
            return 5
        } else return savedPosY.get()
    });
    const springY = useSpring(posY, { stiffness: 100, damping: 20 });
    const posZ = useTransform(()=> {
        if(isDragging) {
            return motionPointerPos.get().z
        } else return savedPosZ.get()
    });
    const springZ = useSpring(posZ, { stiffness: 100, damping: 20 });
    //#endregion


    //#region HANDLE FUNCTIONS
    const onClick = (e:ThreeEvent<MouseEvent>)=> {
        e.stopPropagation()
        if(isGlobalDragging)return;
        if(e.buttons == 1) {
            handleDragStart();
        } else if (e.buttons == 2) {
            handleChangeNote();
        }
    }

    const onEnter= ()=> {
        if(isGlobalDragging) return;
        setCursorType('grab')
        scale.set(.9)
        yScale.set(.1)
    }

    const onLeave = ()=> {
        setCursorType('none')
        scale.set(.85)
        yScale.set(0)
    }

    const handleDragStart = () => {
        play('swipe')
        setDynamicNotes([])

        if(isNote) setStepsByType({note:-1, z:savedPosZ.get()},savedPosX.get()+8, grabItem.instr3D.instrumentType)
        setIsNote(false)
        setIsDragging(true);
        setPlacedStep(null);
        setIsGlobalDragging(true);
        parentRef.current = null
    }

    const handleDragEnd = () => {
        play('swipe')
        if(passGrabNewPos.x == 200 && passGrabNewPos.z == 200 && passGrabNewPos.ref == null) {
            savedPosY.set(-2.3);
            savedPosX.set(springX.get())
            savedPosZ.set(springZ.get())
            parentRef.current = null;
            setIsDragging(false);
        } else {
            if(passGrabNewPos.ref === null) return;
            savedPosX.set(passGrabNewPos.x);
            savedPosY.set(0);
            savedPosZ.set(passGrabNewPos.z);
            parentRef.current = passGrabNewPos.ref;
            setDynamicNotes([getDynamicNotes(currentNoteIndex, grabItem.instr3D.instrumentType)])
            setIsNote(true);
            setStepsByType({note:currentNoteIndex, z:savedPosZ.get()},passGrabNewPos.x+8, grabItem.instr3D.instrumentType)
            setPlacedStep(passGrabNewPos.x+8);
            setIsDragging(false);
        }
    }

    const handleChangeNote = () => {
        let newNoteIndex = currentNoteIndex;
        while(newNoteIndex=== currentNoteIndex) {
            newNoteIndex = Math.floor(Math.random()*(grabItem.instr3D.numberNotes));
        }
        setCurrentNoteIndex(newNoteIndex)
        changeNote({note:newNoteIndex, z:savedPosZ.get()},savedPosX.get()+8, grabItem.instr3D.instrumentType)
    }
    //#endregion


    useEffect(()=> {
        if(!isGlobalDragging && isDragging)  {
            handleDragEnd();
        }
    },[isGlobalDragging])

    useFrame(()=> {
        if(ref == null || ref.current == null) return;
        ref.current.position.x = springX.get();
        ref.current.position.y = springY.get() + springYScale.get();
        ref.current.position.z = springZ.get();

        ref.current.scale.x = timeSpringScale.get()
        ref.current.scale.y = timeSpringScale.get()
        ref.current.scale.z = timeSpringScale.get()

        if(ref.current.scale.x > 0.5 && !hasPlayedPop) {
            setHasPlayedPop(true);
            stop('pop');
            play('pop');
        }

        if(parentRef.current !== null) {
            if(parentRef.current.parent === null) return;
            ref.current.position.y = springY.get() + parentRef.current.position.y + springYScale.get();;
            ref.current.scale.x = springScale.get();
            ref.current.scale.y = springScale.get();
            ref.current.scale.z = springScale.get();


        }
    })


    const getModel = () => {
        switch (grabItem.instr3D.modelType) {
            case 'house':
                return <House colorIndex={currentNoteIndex} placedStep={placedStep} />
            case 'tree':
                return <Tree colorIndex={currentNoteIndex} placedStep={placedStep} />
            case 'mill':
                return <Mill  colorIndex={currentNoteIndex} placedStep={placedStep}/>
            case 'rock':
                return <Rock colorIndex={currentNoteIndex} placedStep={placedStep} />
            default:
                return <></>
        }
    }
    
    return <>
    <group castShadow ref={ref} name="grab-item"
    onPointerDown={onClick} onPointerEnter={()=>onEnter()} onPointerLeave={onLeave}  >
        {getModel()}
    </group>
    <Song>
        
        <Track>
    <Instrument type='sampler' polyphony={7}
    notes={grabItem.instr3D.instrumentType==="synth"?dynamicNotes:[]} 
    samples={{
      C3: '/sounds/synth/synth-C.wav',
      'C#3':'/sounds/synth/synth-C#.wav',
      D3: '/sounds/synth/synth-D.wav',
      'D#3':'/sounds/synth/synth-D#.wav',
      E3: '/sounds/synth/synth-E.wav',
      F3:'/sounds/synth/synth-F.wav',
      'F#3':'/sounds/synth/synth-F#.wav',
      G3: '/sounds/synth/synth-G.wav',
      'G#3': '/sounds/synth/synth-G#.wav',
      A3: '/sounds/synth/synth-A.wav',
      'A#3': '/sounds/synth/synth-A#.wav',
      B3: '/sounds/synth/synth-B.wav',
    }}
    />  
    </Track>


    <Track>
    <Instrument type='sampler' polyphony={7}
    notes={grabItem.instr3D.instrumentType==="bells"?dynamicNotes:[]}
    samples={{
      C3: '/sounds/bells/bells-C.wav',
      'C#3':'/sounds/bells/bells-C#.wav',
      D3: '/sounds/bells/bells-D.wav',
      'D#3':'/sounds/bells/bells-D#.wav',
      E3: '/sounds/bells/bells-E.wav',
      F3:'/sounds/bells/bells-F.wav',
      'F#3':'/sounds/bells/bells-F#.wav',
      G3: '/sounds/bells/bells-G.wav',
      'G#3': '/sounds/bells/bells-G#.wav',
      A3: '/sounds/bells/bells-A.wav',
      'A#3': '/sounds/bells/bells-A#.wav',
      B3: '/sounds/bells/bells-B.wav',
    }}
    />  
    </Track>

    <Track>
    <Instrument type='sampler' polyphony={7}
    notes={grabItem.instr3D.instrumentType==="bass"?dynamicNotes:[]} 
    samples={{
      C3: '/sounds/bass/bass-C.wav',
      'C#3':'/sounds/bass/bass-C#.wav',
      D3: '/sounds/bass/bass-D.wav',
      'D#3':'/sounds/bass/bass-D#.wav',
      E3: '/sounds/bass/bass-E.wav',
      F3:'/sounds/bass/bass-F.wav',
      'F#3':'/sounds/bass/bass-F#.wav',
      G3: '/sounds/bass/bass-G.wav',
      'G#3': '/sounds/bass/bass-G#.wav',
      A3: '/sounds/bass/bass-A.wav',
      'A#3': '/sounds/bass/bass-A#.wav',
      B3: '/sounds/bass/bass-B.wav',
    }}
    />  
    </Track>


    <Track >
    <Instrument type='sampler' polyphony={7}
    notes={grabItem.instr3D.instrumentType==="vox"?dynamicNotes:[]}
    samples={{
      C3: '/sounds/vox/vox-C.wav',
      'C#3':'/sounds/vox/vox-C#.wav',
      D3: '/sounds/vox/vox-D.wav',
      'D#3':'/sounds/vox/vox-D#.wav',
      E3: '/sounds/vox/vox-E.wav',
      F3:'/sounds/vox/vox-F.wav',
      'F#3':'/sounds/vox/vox-F#.wav',
      G3: '/sounds/vox/vox-G.wav',
      'G#3': '/sounds/vox/vox-G#.wav',
      A3: '/sounds/vox/vox-A.wav',
      'A#3': '/sounds/vox/vox-A#.wav',
      B3: '/sounds/vox/vox-B.wav',
    }}
    />  
    </Track>

  </Song>
</>



}

export default GrabItem





