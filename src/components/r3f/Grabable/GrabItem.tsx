import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group} from "three";
import useMouseIntersect from "../../../hooks/MouseIntersect";
import { useControlsStore } from "../../../stores/ControlsStore";
import { useMotionValue, useSpring, useTransform } from "motion/react";
import { useMusicStore } from "../../../stores/MusicStore";
import { Instrument, Song, StepNoteType, Track } from "reactronica";
import House from "../../../models/House";
import { useSFXStore } from "../../../stores/SFXStore";
import { useGammeStore } from "../../../stores/GammeStore";
import Tree from "../../../models/Tree";
import { IInstr3D } from "./GenGrabItems";



const gamme = [
    "C3", "D3","E3","G3","A3"
]

const colors = [
    'red','green','blue','purple', 'black'
]


const GrabItem = (
    {inst3D, initX, initZ}:{inst3D:IInstr3D, initX:number, initZ:number}
) => {


    const ref = useRef<Group>(null)
    const parentRef = useRef<Group>(null)


    const [isDragging, setIsDragging] = useState(false);
    const [placedStep, setPlacedStep] = useState<number|null>(null);
    const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
    const [isNote, setIsNote] = useState(false)
    const currentNote = () => {
        return {name:getBells()[currentNoteIndex], duration:1.5} as StepNoteType
    }
    const colorNote = () => {
        return colors[currentNoteIndex]
    }
 
    const [dynamicNotes, setDynamicNotes] = useState<StepNoteType[]>([])

    const {getBells} = useGammeStore();
    const {setStepsByType, setNullStepsByType} = useMusicStore();
    const {setIsGlobalDragging, isGlobalDragging, passGrabNewPos, toogleHoveringGrabItems} = useControlsStore();
    const {play} = useSFXStore();
    const {motionPointerPos} = useMouseIntersect();
    

    //#region MOTION VALUE
    const yScale = useMotionValue(0);
    const springYScale = useMotionValue(0);
    const scale = useMotionValue(0.9);
    const springScale = useSpring(scale);

    const savedPosX = useMotionValue(initX);
    const savedPosY = useMotionValue(-3);
    const savedPosZ = useMotionValue(initZ);
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
        if(e.buttons == 1) {
            handleDragStart();
        } else if (e.buttons == 2) {
            handleChangeNote();
        }
    }

    const onEnter= ()=> {
        toogleHoveringGrabItems();
        scale.set(.9)
        yScale.set(.1)
    }

    const onLeave = ()=> {
        toogleHoveringGrabItems();
        scale.set(.85)
        yScale.set(0)
    }

    const handleDragStart = () => {
        play('swipe')
        if(isNote) {
            setNullStepsByType(savedPosX.get()+8, inst3D.instrumentType);
        }
        setDynamicNotes([])
        setIsNote(false);
        setIsDragging(true);
        setPlacedStep(null);
        setIsGlobalDragging(true);
        parentRef.current = null
    }

    const handleDragEnd = () => {
        play('swipe')
        if(passGrabNewPos.x == 200 && passGrabNewPos.z == 200 && passGrabNewPos.ref == null) {
            savedPosY.set(-3);
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
            setDynamicNotes([currentNote()])
            setStepsByType(currentNote(),passGrabNewPos.x+8, inst3D.instrumentType)
            setPlacedStep(passGrabNewPos.x+8);
            setIsDragging(false);
            setIsNote(true);
        }
    }

    const handleChangeNote = () => {
        let newNoteIndex = currentNoteIndex;
        while(newNoteIndex=== currentNoteIndex) {
            newNoteIndex = Math.floor(Math.random()*(gamme.length-1));
        }
        setCurrentNoteIndex(newNoteIndex)
        setStepsByType(currentNote(),savedPosX.get()+8, inst3D.instrumentType)
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

        if(parentRef.current !== null) {
            if(parentRef.current.parent === null) return;
            ref.current.position.y = springY.get() + parentRef.current.position.y + springYScale.get();;
            ref.current.scale.x = springScale.get();
            ref.current.scale.y = springScale.get();
            ref.current.scale.z = springScale.get();

        }
    })


    const getModel = () => {
        switch (inst3D.modelType) {
            case 'house':
                return <House color={colorNote()} placedStep={placedStep} />
            case 'tree':
                return <Tree colorIndex={currentNoteIndex} placedStep={placedStep} />
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
        notes={inst3D.instrumentType==="bells"?dynamicNotes:[]}
        samples={{
        C3: '/sounds/bells/bell-C.wav',
        D3: '/sounds/bells/bell-D.wav',
        E3: '/sounds/bells/bell-E.wav',
        G3: '/sounds/bells/bell-G.wav',
        A3: '/sounds/bells/bell-A.wav',
        }}
        />
        </Track>
    </Song>
    </>



}

export default GrabItem





