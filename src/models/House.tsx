import { Clone, useGLTF } from '@react-three/drei'
import { useMusicStore } from '../stores/MusicStore'
import { useTransform } from 'motion/react'

const colors = [
  '#c64f4f',
  '#c64f71',
  '#4fc6c0',
  '#4fc64f',
  '#b4c64f',
  '#ba4fc6',
  '#4f5fc6',
]


const House = (
  {colorIndex, placedStep}:{colorIndex:number, placedStep:number|null}
) => {

  const {nodes} = useGLTF('/models/house.glb')

  const {currentStep} = useMusicStore();


  const windowColor = useTransform(()=> {
    if(placedStep == null) return;
    if(currentStep == placedStep || currentStep == placedStep+1) return 'yellow'
    else return 'black'
  })


  return <Clone position={[0,-.5,0]} object={[nodes.House, nodes.Toiture, nodes.Windows]}  
    inject={(object) => object.name == "House" ? <meshStandardMaterial color={colors[colorIndex]} /> :
    object.name == "Windows" ? <meshStandardMaterial color={windowColor.get()} /> : <></>} 
    />
}

export default House


useGLTF.preload('/models/house.glb')