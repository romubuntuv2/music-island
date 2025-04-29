import { Environment, OrbitControls, Stage } from "@react-three/drei"
import { useControlsStore } from "../../stores/ControlsStore"
import { ThreeEvent, useThree } from "@react-three/fiber"
import { useEffect } from "react"
import GenGrabItems from "./Grabable/GenGrabItems"
import MusicBlocks from "./MusicElements/MusicBlocks"
import EnvIsland from "./Env/EnvIsland"
import EnvControls from "./Env/EnvControls"






const Island = () => {

  const {camera} = useThree();

  useEffect(()=> {
    camera.position.x = -10
    camera.position.y =16
    camera.position.z = 20
  },[])





  const {isGlobalDragging, setIsGlobalDragging,setPassGrabNewPos, movingOrbits, setMovingOrbits, click} = useControlsStore();

  const onVoidClick = (e:ThreeEvent<MouseEvent>)=> {
    e.stopPropagation();
    if(isGlobalDragging) {
      setPassGrabNewPos(200,200,null);
      setIsGlobalDragging(false);
    };
  }

  const onStartOrbit = () => {
    if(!movingOrbits && click) setMovingOrbits(true)
  }

  const onEndOrbit = () => {
    setMovingOrbits(false)
  }
 
  return <group onPointerDown={(e)=> onVoidClick(e)}>
    <OrbitControls 
    target0={[0,0,0]} target={[0,0,0]} 
    enableRotate={!isGlobalDragging} enablePan={false}   
    maxDistance={50} minDistance={20}
    minPolarAngle={0} maxPolarAngle={Math.PI / 2.2} 
    onChange={()=> onStartOrbit()}
    onEnd={()=> onEndOrbit()}
    />
    <ambientLight intensity={0.5} />
    <Environment preset="sunset" />
    <Stage center={{disable:true}} adjustCamera={false} name={"stage"} >

      <EnvControls/>

      <EnvIsland />
      <MusicBlocks />

      <GenGrabItems />

    </Stage>
    </group>
}

export default Island