import { Instance, Instances } from "@react-three/drei"

import { useRef } from "react"
import { Group } from "three"
import { ThreeEvent, useFrame } from "@react-three/fiber"
import { useControlsStore } from "../../../stores/ControlsStore"
import { IMusicBoxEl, useEnvStore } from "../../../stores/EnvStore"
import { useMusicStore } from "../../../stores/MusicStore"
import { MotionValue, useSpring, useTransform } from "motion/react"




const MusicBox = () => {

  const {musicbox} = useEnvStore();
 
  return <Instances>
    <boxGeometry args={[0.95,1,0.95]}/>
    <meshStandardMaterial color={'white'} />
    
    {musicbox.map((item, index) => {
      return <MusicBoxElement  item={item} key={index}  /> 
    })}
  </Instances>
}

const MusicBoxElement = ({item}:{item:IMusicBoxEl}) => {

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
      if(step == item.x-2) return .05
      if(step == item.x-1) return .1
      if(step == item.x) return 1
      if(step == item.x+1) return 0.4
      if(step == item.x+2) return 0.2
      return 0
    } else {
      return 0
    }
  });
  const springY = useSpring(y as MotionValue<number>, {damping: 20, stiffness: 100});


  useFrame(()=> {
    if(meshRef == null || meshRef.current == null) return;
    meshRef.current.position.y = springY.get();

  })

  return <Instance  
  ref={meshRef}
  onPointerDown={(e)=> onClickMesh(e)}
  // color={item.color}s
  position={[item.x,0,item.z]}
  />
}

export default MusicBox