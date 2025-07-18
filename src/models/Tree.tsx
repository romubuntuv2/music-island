
import { useMemo, useRef } from 'react'
import { Clone, useGLTF } from '@react-three/drei'
import { Group } from 'three'
import { useMusicStore } from '../stores/MusicStore'
import { useFrame } from '@react-three/fiber'
import { useMotionValue, useSpring, useTransform } from 'motion/react'

const treeColor = [
    '#3e663a',
    '#0e732b',
    '#238345',
]

const Tree = (
    {colorIndex, placedStep}:{colorIndex:number, placedStep:number|null}
) => {

    const color = useMemo(()=> {
        return treeColor[colorIndex]
    },[colorIndex])

    const groupRef = useRef<Group>(null)

    const { nodes } = useGLTF('/models/tree.glb')

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
        groupRef.current.rotation.y = springRotation.get();
    })


  return <group ref={groupRef} scale={0.4} position={[0,-0.6,0]} >
  <Clone  
  object={[nodes.Base, nodes.LeavesA,nodes.LeavesB,nodes.LeavesC,]} 
  inject={(object) => object.name.includes("Leaves") ? <meshStandardMaterial color={color} /> :<></>
} 
  />
  </group>
}

export default Tree;

useGLTF.preload('/models/tree.glb')