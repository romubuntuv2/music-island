import { Clone, useGLTF } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import { Group, Object3D } from 'three'
import { IMusicBoxEl, useEnvStore } from '../../../stores/EnvStore'
import { useMusicStore } from '../../../stores/MusicStore'
import { useControlsStore } from '../../../stores/ControlsStore'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { MotionValue, useSpring, useTime, useTransform } from 'motion/react'
import { Dist } from '../../../functions/toolsFunctions'


const MusicBlocks = () => {

    const {musicbox} = useEnvStore();

    return musicbox.map((item, index) => {
        return <MusicBlock key={index} item={item} />
    })
}



const MusicBlock = (
    {item}:{item:IMusicBoxEl}
) => {

const dist = useMemo(()=> {
  return Dist(0,item.x, 0, item.z)
},[])

const {nodes} = useGLTF('/models/block.glb')

const meshRef = useRef<Group>(null);

const [isClick, setIsClick] = useState(false);
const [hover, isHover] = useState(false);

const {currentStep, isPlaying} = useMusicStore();
const {isGlobalDragging, setIsGlobalDragging, setPassGrabNewPos} = useControlsStore();

const time = useTime();
const scaleFromTime = useTransform(time, [dist*100, dist*200], [0,1]);
const springScale = useSpring(scaleFromTime);

const onClickMesh = (e:ThreeEvent<MouseEvent>) => {
  if(meshRef.current === null) return;
  e.stopPropagation();
  setIsClick(true);
  if(isGlobalDragging) {
    setPassGrabNewPos(item.x,item.z, meshRef.current);
    setIsGlobalDragging(false);
  };
}

const onEnter = (e:ThreeEvent<MouseEvent>) => {
  e.stopPropagation()
  isHover(true)
}

const onLeave = (e:ThreeEvent<MouseEvent>) => {
  e.stopPropagation()
  isHover(false)
}

const y = useTransform(()=> {
  const step = currentStep - 8
  if(isPlaying) {
    if(step == item.x-2) return item.y+.025-1
    if(step == item.x-1) return item.y+.05-1
    if(step == item.x) return item.y+.5-1
    if(step == item.x+1) return item.y+0.3-1
    if(step == item.x+2) return item.y+0.1-1
    return item.y-1
  } else if(isClick) {
    return item.y - .25 -1
  } else {
    return item.y -1
  }
  
});
const springY = useSpring(y as MotionValue<number>, {damping: 20, stiffness: 100});


useFrame(()=> {
  if(meshRef == null || meshRef.current == null) return;
  if(meshRef.current.position.y == item.y - .25) setIsClick(false);
  meshRef.current.position.y = springY.get();


  meshRef.current.scale.y = springScale.get();
  meshRef.current.scale.x = springScale.get();
  meshRef.current.scale.z = springScale.get();
})






return <Clone 
    ref={meshRef} onPointerDown={onClickMesh} onPointerEnter={(e)=>onEnter(e)} onPointerLeave={(e)=> onLeave(e)}
    position={[item.x, item.y, item.z]} scale={[0.95,1,0.95]}  
    object={[nodes.HeadCube, nodes.MainCube]} 
    inject={(object:Object3D) => object.name =="MainCube" ? <meshStandardMaterial color={item.mainColor} /> :  <meshStandardMaterial color={hover&&isGlobalDragging?'red':item.headColor} />}
    />
}


export default MusicBlocks


useGLTF.preload('/models/block.glb')