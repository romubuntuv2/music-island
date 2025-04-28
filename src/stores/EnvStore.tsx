import { create } from "zustand";

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


export interface IEnvStore {
    musicbox:IMusicBoxEl[],
    ocean:IOceanEl[],
    initEnv:()=> void
    
}

export const useEnvStore = create<IEnvStore>((set)=> ({
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
    }
}))