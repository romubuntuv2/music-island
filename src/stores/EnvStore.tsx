import { create } from "zustand";
import { IGrabItem, IInstr3D } from "../components/r3f/Grabable/GenGrabItems";

export interface IMusicBoxEl {
    x:number,
    y:number,
    z:number, 
    mainColor:string,
    headColor:string, 
}

export interface IOceanEl {
    x:number, z:number, color:string, scale:number
}


const instr3D_bells:IInstr3D = {
  instrumentType:'bells',
  modelType:"tree",
  numberNotes:3,
}
const instr3D_synth:IInstr3D = {
  instrumentType:'synth',
  modelType:"mill",
  numberNotes:5,
}
const instr3D_bass:IInstr3D = {
  instrumentType:'bass',
  modelType:"rock",
  numberNotes:4,
}
const instr3D_vox:IInstr3D = {
  instrumentType:'vox',
  modelType:"house",
  numberNotes:5,
}

const allInstr = [
    instr3D_bells,
    instr3D_synth,
    instr3D_bass,
    instr3D_vox,
]


export interface IEnvStore {
    musicbox:IMusicBoxEl[],
    ocean:IOceanEl[],
    initEnv:()=> void,

    grabItemsList:IGrabItem[],
    addGrabItems:()=>void,
    
    rebootEnv:()=>void,
}

export const useEnvStore = create<IEnvStore>((set, get)=> ({
    musicbox:[],
    ocean:[],
    initEnv:()=> {
        const musicBoxList =[]
        const center:{x:number, z:number} = {x:Math.floor(Math.random()*4-2),z:Math.floor(Math.random()*4-2)}
        // const divFact = Math.round(Math.random()*3)+6
        // const heightFact = Math.random()+1;
        for(let i = -8; i <8; i++) {
            for(let j = -8; j <8; j++) {
              const value = Math.abs(i+.5)+Math.abs(j+.5)
              if((value <12)) {
                let color
                if((value >9 || i <= -7 || i >= 6 || j <= -7 || j >= 6)) color = (i+j)%2 === 0 ? "#f3fa7c" : "#baab25"
                // if((value ==9 || i == -7 || i == 6 || j == -7 || j == 6)) color = "#f3fa7c"
                // else if((value >10 || i == -8 || i == 7 || j == -8 || j == 7)) color = "#baab25"
                else color = (i+j)%2 === 0 ? "#1a8108" : "#419332"
                const mainColor = (i+j)%2 === 0 ? "#A55140" : "#78413B"



                const divFact = Math.round(Math.random()*4)+6
                const heightFact = Math.random()+0.8;

                const dist = Math.sqrt(Math.pow(center.x-i,2) + Math.pow(center.z -j,2))
                const factor = dist/divFact;
                let y;
                if(factor<=1) y = (1- factor)*heightFact;
                else y = 0;

                musicBoxList.push({x:i,z:j, mainColor:mainColor, headColor:color, y:y})
                }
            }
        }
        const oceanList = []
        for(let i = -10; i <10; i++) {
            for(let j = -10; j <10; j++) {
              const el = musicBoxList.find((el) => el.x == i && el.z == j);
              if(el == undefined) {
                const randColor = Math.random()*3
                const color = randColor<1 ? "#3763f6": randColor <2 ? "#5570cb" : "#5074eb"
                const scale = Math.random() * 0.2
                oceanList.push({x:i,z:j, color:color, scale:scale})
              }
           }
        }
        set({musicbox:musicBoxList, ocean:oceanList})     
    },
    grabItemsList:[],
    addGrabItems:()=> {
        const {grabItemsList} = get()
        const newList = [...grabItemsList]
        const instrIndex = Math.round(Math.random()*(allInstr.length-1))
        const instr = allInstr[instrIndex]

        let x = (Math.random()*40)-20;
        let z = ((Math.random()*30)-15)-5;
        while(x<= 11 && x>=-11 && z >= -11) {
            x = (Math.random()*40)-20;
            z = ((Math.random()*30)-15)-5;
        }

        const noteIndex= Math.round(Math.random()*(instr.numberNotes-1));
        const newGrabItem:IGrabItem = {
            id:1, /// GENERATE NEW IDS
            initX:x, initZ:z,
            instr3D:instr,
            initNoteIndex:noteIndex,
        }
        newList.push(newGrabItem);
        set({grabItemsList:newList})
    },

    rebootEnv:()=> {
        const {initEnv}=get()

        set({grabItemsList:[], ocean:[], musicbox:[]})
        setTimeout(()=> {
            initEnv();
        },20)



    }
}))