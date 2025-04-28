
import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'

export function Rock() {

  const { nodes } = useGLTF('/models/rock.glb')

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Rock as Mesh).geometry}
    >
        <meshStandardMaterial color={'red'} />
    </mesh>
    </group>
  )
}

useGLTF.preload('/models/rock.glb')
