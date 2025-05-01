
import { useGLTF } from '@react-three/drei'
import { Group, Mesh } from 'three'
import { useMusicStore } from '../stores/MusicStore'
import { useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const colors = [
  '#b0b0b0',
  '#463e3e',
  '#27303c',
  '#1c1d1a',
]

const Rock = (
  {colorIndex, placedStep}:{colorIndex:number, placedStep:number|null}
) => {

  const groupRef = useRef<Group>(null)

  const { nodes } = useGLTF('/models/rock.glb')
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
    if(groupRef == null || groupRef.current == null) return;
    groupRef.current.rotation.z = springRotation.get();
  })

  return (
    <group ref={groupRef}
    scale={0.5}
    position={[0,-.9,0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Rock as Mesh).geometry}
    >
        <meshStandardMaterial color={colors[colorIndex]} />
    </mesh>
    </group>
  )
}

export default Rock

useGLTF.preload('/models/rock.glb')
