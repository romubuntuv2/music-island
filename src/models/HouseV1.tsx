import { Clone, useGLTF } from '@react-three/drei'
import { Mesh } from 'three'


export function HouseV1() {

  const { nodes, materials } = useGLTF('/models/houseV1.glb')




  return <>
    {/* <Clone object={nodes.Cube} position={[0,5,0]} />
    <Clone object={nodes.Cube} position={[0,5,5]}/>
    <Clone object={nodes.Cube} position={[5,5,0]}/> */}
    <group scale={0.4} position={[0,50,0]}  dispose={null}>
      <mesh castShadow receiveShadow geometry={(nodes.Cube as Mesh).geometry} material={materials.Material} />
    </group>
    </>
}

useGLTF.preload('/models//houseV1.glb')
