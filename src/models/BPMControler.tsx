
import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'
import { useSFXStore } from '../stores/SFXStore'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { useMusicStore } from '../stores/MusicStore'
import { useControlsStore } from '../stores/ControlsStore'
import { useRef } from 'react'
import { MotionValue, useMotionValue, useSpring, useTime, useTransform } from 'motion/react'

const BPMControler = () => {

    const groupRef = useRef<Mesh>(null)
    const leftRef = useRef<Mesh>(null)
    const rightRef = useRef<Mesh>(null)

  const { nodes, materials } = useGLTF('/models/bpm2.glb')

    const {upTempo, downTempo} = useMusicStore();
    const {play, stop} = useSFXStore();
    const {setCursorType} = useControlsStore();

    const time = useTime();
    const timeToScale = useTransform(time, [2000, 2200],[0,.6])
    const springScale = useSpring(timeToScale)
  
    const rClicked = useMotionValue(false);
    const rPosY = useTransform(()=>rClicked.get()?0.35:.45)
    const rSpringPosY = useSpring(rPosY  as MotionValue<number>, {damping:18, stiffness:400});

    const lClicked = useMotionValue(false);
    const lPosY = useTransform(()=>lClicked.get()?0.35:.45)
    const lSpringPosY = useSpring(lPosY  as MotionValue<number>, {damping:18, stiffness:400});

    const onClick = (e:ThreeEvent<MouseEvent>, type:string) => {
        e.stopPropagation()
        stop('switch')
        play('switch')
        switch (type) {
            case 'left':
                downTempo();
                lClicked.set(true) 
                break;
            case 'right':
                rClicked.set(true)
                upTempo();
                break;
            default:
                break;
        }
    }

    const onEnter = (e:ThreeEvent<MouseEvent>, type:string) => {
        e.stopPropagation()
        setCursorType(type)
    }

    const onLeave = (e:ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        setCursorType('none')
    }

    useFrame(()=> {
        if(groupRef && groupRef.current) {
            groupRef.current.scale.x= springScale.get();
            groupRef.current.scale.z= springScale.get();
            groupRef.current.scale.y= springScale.get();
        }

        if(rightRef && rightRef.current) {
            if(rSpringPosY.get()== 0.35) rClicked.set(false);
            rightRef.current.position.y = rSpringPosY.get()
        }

        if(leftRef && leftRef.current) {
            if(lSpringPosY.get()== 0.35) lClicked.set(false);
            leftRef.current.position.y = lSpringPosY.get()
        }

    })

  return (
    <group
    ref={groupRef}
    rotation={[0,Math.PI/2,0]}
    position={[-7,-3,12]} 
    >
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Base as Mesh).geometry}
        material={materials['Material.001']}
        rotation={[-Math.PI, 0, 0]}
        scale={[1, 0.329, 1.319]}
      />
      <mesh
        ref={leftRef}
        onPointerDown={(e) => onClick(e,'left')}
        onPointerEnter={(e) => onEnter(e,'left')}
        onPointerLeave={(e) => onLeave(e)}
        castShadow
        receiveShadow
        geometry={(nodes.ButtonLeft as Mesh).geometry}
        material={(nodes.ButtonLeft as Mesh).material}
        position={[0, 0.334, -0.603]}
        scale={[0.823, 0.037, 0.554]}>
        <mesh

          castShadow
          receiveShadow
          geometry={(nodes.Left as Mesh).geometry}
          material={materials['Material.004']}
          position={[0, -13.169, 1.088]}
          scale={[1.215, 38.556, 1.804]}
        />
      </mesh>
      <mesh
                  ref={rightRef}
        onPointerDown={(e) => onClick(e,'right')}
        onPointerEnter={(e) => onEnter(e,'right')}
        onPointerLeave={(e) => onLeave(e)}
        castShadow
        receiveShadow
        geometry={(nodes.ButtonRight as Mesh).geometry}
        material={(nodes.ButtonRight as Mesh).material}
        position={[0, 0.334, 0.614]}
        scale={[0.823, 0.037, 0.554]}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Right as Mesh).geometry}
          material={materials['Material.004']}
          position={[0, -13.169, -1.107]}
          scale={[1.215, 38.556, 1.804]}
        />
      </mesh>
    </group>
  )
}

export default BPMControler

useGLTF.preload('/models/bpm2.glb')