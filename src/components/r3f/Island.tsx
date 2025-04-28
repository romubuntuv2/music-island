import { Environment, OrbitControls, Stage } from "@react-three/drei"
import { useControlsStore } from "../../stores/ControlsStore"
import { ThreeEvent } from "@react-three/fiber"
import { useEnvStore } from "../../stores/EnvStore"
import { useEffect } from "react"
import GenGrabItems from "./Grabable/GenGrabItems"
import MusicBlocks from "./MusicElements/MusicBlocks"
import EnvIsland from "./Env/EnvIsland"





const Island = () => {

  const {initEnv} = useEnvStore();
  useEffect(()=> {
    initEnv();
  },[])

  const {isGlobalDragging, setIsGlobalDragging,setPassGrabNewPos} = useControlsStore();

  const onVoidClick = (e:ThreeEvent<MouseEvent>)=> {
    e.stopPropagation();
    if(isGlobalDragging) {
      setPassGrabNewPos(200,200,null);
      setIsGlobalDragging(false);
    };
  }



  return <group onPointerDown={(e)=> onVoidClick(e)}>
    <OrbitControls target0={[0,0,0]} target={[0,0,0]} 
    enableRotate={!isGlobalDragging} enablePan={false}   
    maxDistance={50} minDistance={20}
    minPolarAngle={0} maxPolarAngle={Math.PI / 2.2} />
    <ambientLight intensity={0.5} />
    <Environment preset="sunset" />
    <Stage center={{disable:true}} adjustCamera={false} name={"stage"} >

      <mesh position={[0,0,0]} > 
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>


      <EnvIsland />
      <MusicBlocks />

      <GenGrabItems />

    </Stage>
    </group>
}

export default Island