import { Clone, useGLTF } from '@react-three/drei'
import React from 'react'

const House = (
    {color}:{color:string}
) => {

    const {nodes} = useGLTF('/models/house.glb')


  return <Clone object={[nodes.House, nodes.Toiture, nodes.Windows]}  
    inject={(object) => object.name == "House" ? <meshStandardMaterial color={color} /> : <></>} 
    />
}

export default House


useGLTF.preload('/models/house.glb')