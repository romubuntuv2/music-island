import { useState } from 'react'
import GrabItem from './GrabItem';
import { IGrabItem, IInstr3D } from '../../../interfaces/Interfaces';
import { ThreeEvent } from '@react-three/fiber';

const instr3D_A:IInstr3D = {
  instrumentType:'bells',
  modelType:"house",
}
const instr3D_B:IInstr3D = {
  instrumentType:'synth',
  modelType:"tree",
}

const grabItem_A:IGrabItem =  {
    instr3D:instr3D_B,
    initX:20,
    initZ:20
}




const GenGrabItems = () => {

    const [grabItemsList, setGrabItemsList] = useState<IGrabItem[]>([grabItem_A])



    const onGenerateItems = (e:ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        const x = 16+(Math.random()*10);
        const z = 16+(Math.random()*10);
        const newGrabItem:IGrabItem = {
            initX:x, initZ:z,
            instr3D:instr3D_A
        }
        setGrabItemsList([...grabItemsList, newGrabItem])
    }


  return <>
      <mesh position={[15,0,15]}  onPointerDown={onGenerateItems} >
        <boxGeometry/>
        <meshStandardMaterial color={'green'} />
      </mesh>

      {grabItemsList.map((grabItem, index) => {
        return <GrabItem  inst3D={grabItem.instr3D} initX={grabItem.initX} initZ={grabItem.initZ} key={index} />
      })}


  </>
}

export default GenGrabItems