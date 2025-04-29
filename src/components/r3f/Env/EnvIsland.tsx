import { Instances } from '@react-three/drei'


import { useEnvStore } from '../../../stores/EnvStore';
import OceanCube from './OceanCube';




const EnvIsland = () => {


  const {ocean} = useEnvStore();



  return <>
{/* 
    <mesh onPointerDown={(e)=> e.stopPropagation()}  scale={[21,2,21]} position={[-.5,0,-.5]} > 
      <meshStandardMaterial color={'orange'} />
      <Geometry >
      <Base scale={1} >
        <boxGeometry />
      </Base>
      <Subtraction position={[0,0,0]}  scale={[20/21,1, 20/21]}>
        <boxGeometry />
      </Subtraction>
      </Geometry>
    </mesh> */}


    <group position={[0,-1,0]} receiveShadow  onPointerDown={(e)=> e.stopPropagation()} >
    <Instances >
      <boxGeometry args={[0.95,1,0.95]} />
      <meshStandardMaterial color={"white"} />
      {ocean.map((item, index) => {
        return <OceanCube item={item} key={index} index={index} />
      })}
    </Instances>
    </group>





  </>

}

export default EnvIsland