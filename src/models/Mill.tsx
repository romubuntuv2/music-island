import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Group, Mesh } from 'three'
import { useMotionValue, useSpring, useTransform } from 'motion/react';
import { useMusicStore } from '../stores/MusicStore';
import { useFrame } from '@react-three/fiber';


const colors = [
  '#b94e4e',
  '#4e7bb9',
  '#90b94e',
  '#8c4eb9',
  '#b94e80',
]

const Mill =(
     {colorIndex, placedStep}:{colorIndex:number, placedStep:number|null}
) => {



  const palsRef = useRef<Group>(null);

  const { nodes, materials } = useGLTF('/models/mill.glb')

  const {currentStep, isPlaying} = useMusicStore();


  const savedRotation = useMotionValue(0)
  const alreadyPlaced = useMotionValue(false);

  const rotation = useTransform(()=> {
      if(placedStep == null) {
          alreadyPlaced.set(false)
          return savedRotation.get()
      } else if(placedStep !=null && !alreadyPlaced.get()) {
          const oldRot = savedRotation.get();
          const newRot = oldRot+0.07
          savedRotation.set(newRot)
          alreadyPlaced.set(true)
          return newRot
      } else if(isPlaying && (currentStep == placedStep)) {
          const oldRot = savedRotation.get();
          const newRot = oldRot+0.07
          savedRotation.set(newRot)
          return newRot
      }
      return savedRotation.get();
  });
  const springRotation = useSpring(rotation, {damping:10, stiffness:260});

  useFrame(()=> {
    if(palsRef == null || palsRef.current == null) return;
    palsRef.current.rotation.z = springRotation.get();
  })


  return (
    <group
    rotation={[0, -Math.PI/2,0]}
    scale={0.55}
    position={[0,-.5,0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.RoundNose as Mesh).geometry}
        material={materials['Material.002']}
      />
      <group ref={palsRef}
      position={[0, 3.239, 0.741]} rotation={[0, 0, -Math.PI / 4]} scale={0.519}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cube003 as Mesh).geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Cube003_1 as Mesh).geometry}
          material={materials['Material.003']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Cube002 as Mesh).geometry}>
          <meshStandardMaterial color={colors[colorIndex]} />
        </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Cube002_1 as Mesh).geometry}
        material={materials['Material.002']}
      />
    </group>
  )
}

export default Mill

useGLTF.preload('/models/mill.glb')