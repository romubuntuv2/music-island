import { Clone, useGLTF } from '@react-three/drei'
import { Mesh, Object3D } from 'three'

export function HouseV2(
    {clone, color}:{clone:boolean, color?:string}
) {

  const { nodes, materials } = useGLTF('/models/houseV2.glb')




  return !clone?
    <group position={[0,0,0]} scale={0.0001}  dispose={null}>
      <mesh castShadow receiveShadow geometry={(nodes.Cube as Mesh).geometry} material={materials.Material} />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Cube001 as Mesh).geometry}
        material={materials['Material.003']}
        position={[-0.562, 1.173, -0.646]}
        scale={0.195}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Cube002 as Mesh).geometry}
        material={materials['Material.001']}
        position={[0.987, 0.416, 0.484]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Cube003 as Mesh).geometry}
        position={[0.987, 0.416, -0.476]}
      >
        <meshStandardMaterial color={'red'} />
      </mesh>
    </group>
    :<Clone scale={0.4} object={[nodes.Cube,nodes.Cube001,nodes.Cube002, nodes.Cube003]} 
    inject={(object:Object3D) => object.name =="Cube003" ? <meshStandardMaterial color={color} /> : null}
    />
  
}

useGLTF.preload('/models/houseV2.glb')
