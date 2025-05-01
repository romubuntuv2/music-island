import GrabItem from './GrabItem';
import { useEnvStore } from '../../../stores/EnvStore';


export interface IInstr3D {
  instrumentType:'bells'|'synth'|'vox'|'bass',
  modelType:string,
  numberNotes:number,
}

export interface IGrabItem {
  id:number,
  instr3D:IInstr3D,
  initX:number,
  initZ:number,
  initNoteIndex:number,
}


// const instr3D_B:IInstr3D = {
//   instrumentType:'synth',
//   modelType:"tree",
//   numberNotes:8,
// }

// const grabItem_A:IGrabItem =  {
//     id:0,
//     instr3D:instr3D_B,
//     initX:20,
//     initZ:20,
//     initNoteIndex:2,
// }




const GenGrabItems = () => {

  const {grabItemsList} = useEnvStore();

  return <>
    {grabItemsList.map((grabItem, index) => {
      return <GrabItem  grabItem={grabItem} key={index} />
    })}
  </>
}

export default GenGrabItems