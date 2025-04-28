import { Clone, useGLTF } from '@react-three/drei'
import React from 'react'
import { Object3D } from 'three'

const Block = () => {

const {nodes} = useGLTF('/models/block.glb')

return <Clone object={[nodes.HeadCube, nodes.MainCube]} 
    inject={(object:Object3D) => object.name =="MainCube" ? <meshStandardMaterial color={"#A55140"} /> :  <meshStandardMaterial color={"#d5d571"} />}
    />
}

export default Block



useGLTF.preload('/models/block.glb')