import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'

const FloorPlane = () => {


  return <mesh scale={100} position={[0,-1,0]} rotation={[-Math.PI/2,0,0]} >
    <planeGeometry args={[1,1]} />
    <meshBasicMaterial 
    color={'#0969efb6'}
    // color={'red'}
     />
  </mesh>
}

export default FloorPlane