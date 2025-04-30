
import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useSFXStore } from '../stores/SFXStore';
import { useMemo, useRef } from 'react';
import { MotionValue, useMotionValue, useSpring, useTime, useTransform } from 'motion/react';
import { useMusicStore } from '../stores/MusicStore';
import { useControlsStore } from '../stores/ControlsStore';
import { useEnvStore } from '../stores/EnvStore';

const GammeButton= (
    {type}:{type:string}
) => {

    const groupRef = useRef<Mesh>(null)
    const buttonRef = useRef<Mesh>(null)

    const { nodes, materials } = useGLTF('/models/gammeButton.glb')

    const {toggleGamme, rebootSong} = useMusicStore();
    const {addGrabItems, grabItemsList, rebootEnv} = useEnvStore();
    const {setCursorType} = useControlsStore();
    const {play, stop} = useSFXStore();

    const time = useTime();
    const timeToScale = useTransform(time, [2000, 2200],[0,.6])
    const springScale = useSpring(timeToScale)
  

    const clicked = useMotionValue(false);
    const posY = useTransform(()=>clicked.get()?0.3:0.6)
    const springPosY = useSpring(posY  as MotionValue<number>, {damping:18, stiffness:400});


    const onClick = (e:ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        clicked.set(true)
        stop('switch')
        play('switch')
        handleFunction();
    }

    const onEnter = (e:ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        switch (type) {
            case 'spawn':
                setCursorType('spawn');
                break;
            case 'reboot':
                setCursorType('reboot')
                break;
            case 'custom':
                setCursorType('custom')
                break;
            default:
                break;
        }
    }
    const onLeave = (e:ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        setCursorType('none')
    }

    useFrame(()=> {
        if(buttonRef && buttonRef.current) {
            if(springPosY.get()== 0.3) clicked.set(false);
            buttonRef.current.position.y = springPosY.get()
        }

        if(!(groupRef==null || groupRef.current == null)) {
            groupRef.current.scale.x= springScale.get();
            groupRef.current.scale.z= springScale.get();
            groupRef.current.scale.y= springScale.get();
        }
    })

    const handleFunction = (()=> {
        switch (type) {
            case 'spawn':
                if(grabItemsList.length < 35) {
                    addGrabItems();
                }
                break;
            case 'reboot':
                play('trash')
                rebootEnv();
                rebootSong();
                setTimeout(()=> {
                    play('intro')
                },20)
                break;
            case 'custom':
                toggleGamme();
                break;
            default:
                break;
        }
    })

    const getColor = useMemo(()=> {
        switch (type) {
            case 'spawn':
                return "blue";
            case 'reboot':
                return "red"
            case 'custom':
                return "green"
            default:
                return "green"

        }

    },[type])
    const getX = useMemo(()=> {
        let x = 5;
        switch (type) {
            case 'spawn':
                return -4
            case 'reboot':
                x = 2
                break;
            case 'custom':
                x= -1
                break;
            default:
                x= -7
                break;
        }
        return x
    },[type])

    return <group ref={groupRef} 
        position={[getX, -3, 12]}
        onPointerDown={onClick} 
        onPointerEnter={onEnter} onPointerLeave={onLeave}
        >
            <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Base as Mesh).geometry}
            material={materials['Material.001']}
            />
            <mesh
            ref={buttonRef}
            castShadow
            receiveShadow
            geometry={(nodes.Button as Mesh).geometry}
            >
                <meshStandardMaterial color={getColor} />
            </mesh>
    </group>
    
}

export default GammeButton

useGLTF.preload('/models/gammeButton.glb')
