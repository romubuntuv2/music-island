
import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useSFXStore } from '../stores/SFXStore';
import { useRef } from 'react';
import { MotionValue, useMotionValue, useSpring, useTime, useTransform } from 'motion/react';
import { useMusicStore } from '../stores/MusicStore';

const GammeButton= () => {

    const groupRef = useRef<Mesh>(null)
    const buttonRef = useRef<Mesh>(null)

    const { nodes, materials } = useGLTF('/models/gammeButton.glb')

    const {toggleGamme} = useMusicStore();
    const {play, stop} = useSFXStore();

    const time = useTime();
    const timeToScale = useTransform(time, [2000, 2200],[0,.3])
    const springScale = useSpring(timeToScale)
  

    const clicked = useMotionValue(false);
    const posY = useTransform(()=>clicked.get()?0.3:0.6)
    const springPosY = useSpring(posY  as MotionValue<number>, {damping:18, stiffness:400});


    const onClick = (e:ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        clicked.set(true)
        stop('switch')
        play('switch')
        toggleGamme()
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

    return <group ref={groupRef} 
        position={[2, -3, 14]}
        onPointerDown={onClick} dispose={null}>
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
        material={materials['Material.006']}
        // position={[0, 0.6, 0]}
        />
    </group>
    
}

export default GammeButton

useGLTF.preload('/models/gammeButton.glb')
