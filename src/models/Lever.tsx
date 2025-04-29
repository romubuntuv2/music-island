
import { useGLTF } from '@react-three/drei'
import { Group, Mesh } from 'three'
import { useMusicStore } from '../stores/MusicStore'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { MotionValue, useSpring, useTime, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useSFXStore } from '../stores/SFXStore'

const Lever = () => {

  const { nodes, materials } = useGLTF('/models/lever.glb')

  const groupRef = useRef<Group>(null);
  const leverRef = useRef<Group>(null);

  const {toogleIsPlayer, isPlaying} = useMusicStore()
  const {play,stop} = useSFXStore();



  const time = useTime();
  const timeToScale = useTransform(time, [2000, 2200],[0,.2])
  const springScale = useSpring(timeToScale)


  const rotation = useTransform(()=> isPlaying?2.3:0.925)
  const springRotation = useSpring(rotation as MotionValue<number>, {damping:25, stiffness:300});
  const position = useTransform(()=> isPlaying?2.248:-2.248)
  const springPosition = useSpring(position as MotionValue<number>, {damping:25, stiffness:300});



  const handleClick = (e:ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    stop('switch')
    play('switch')
    toogleIsPlayer()
  }

  useFrame(()=> {
    if(!(leverRef ==null || leverRef.current == null)) {
      leverRef.current.rotation.x = springRotation.get();
      leverRef.current.position.z = springPosition.get();
    }

    if(!(groupRef==null || groupRef.current == null)) {
      groupRef.current.scale.x= springScale.get();
      groupRef.current.scale.z= springScale.get();
      groupRef.current.scale.y= springScale.get();
    }



  })


  return (
    <group ref={groupRef}
    onPointerDown={handleClick}
    position={[0,-3,12]} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Box as Mesh).geometry}
        material={materials['Material.001']}
        position={[0, 1.138, 0]}
        scale={[3.585, 1.406, 3.585]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Cylinder as Mesh).geometry}
        material={materials['Material.002']}
        position={[0, 2.33, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[1, 3.277, 1]}
      />
      <group ref={leverRef}
        position={[-0.102, 5.461, -2.248]}  scale={[0.71, 1, 1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cube002 as Mesh).geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cube002_1 as Mesh).geometry}
          material={materials['Material.005']}
        />
      </group>
    </group>
  )
}

export default Lever

useGLTF.preload('/models/lever.glb')
