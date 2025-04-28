import { Clone, useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { Group, Object3D } from 'three'
import { IMusicBoxEl, useEnvStore } from '../../../stores/EnvStore'
import { useMusicStore } from '../../../stores/MusicStore'
import { useControlsStore } from '../../../stores/ControlsStore'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { MotionValue, useSpring, useTransform } from 'motion/react'


const MusicBlocks = () => {

    const {musicbox} = useEnvStore();


    return musicbox.map((item, index) => {
        return <MusicBlock key={index} item={item} />
    })
}



const MusicBlock = (
    {item}:{item:IMusicBoxEl}
) => {

const {nodes} = useGLTF('/models/block.glb')
const meshRef = useRef<Group>(null);
const {currentStep, isPlaying} = useMusicStore();
const {isGlobalDragging, setIsGlobalDragging, setPassGrabNewPos} = useControlsStore();

const onClickMesh = (e:ThreeEvent<MouseEvent>) => {
  if(meshRef.current === null) return;
  e.stopPropagation();
  if(isGlobalDragging) {
    setPassGrabNewPos(item.x,item.z, meshRef.current);
    setIsGlobalDragging(false);
  };
}

const y = useTransform(()=> {
  const step = currentStep - 8
  if(isPlaying) {
    if(step == item.x-2) return item.y+.025
    if(step == item.x-1) return item.y+.05
    if(step == item.x) return item.y+.5
    if(step == item.x+1) return item.y+0.3
    if(step == item.x+2) return item.y+0.1
    return item.y
  } else {
    return item.y
  }
});
const springY = useSpring(y as MotionValue<number>, {damping: 20, stiffness: 100});


useFrame(()=> {
  if(meshRef == null || meshRef.current == null) return;
  meshRef.current.position.y = springY.get();
})






return <Clone 
    ref={meshRef} onPointerDown={onClickMesh}
    position={[item.x, item.y, item.z]} scale={[0.95,1,0.95]}  
    object={[nodes.HeadCube, nodes.MainCube]} 
    inject={(object:Object3D) => object.name =="MainCube" ? <meshStandardMaterial color={item.mainColor} /> :  <meshStandardMaterial color={item.headColor} />}
    />
}


export default MusicBlocks


useGLTF.preload('/models/block.glb')