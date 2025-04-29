import { Group } from "three"
import { create } from "zustand"

export interface IControlsStore  {
    isGlobalDragging:boolean,
    setIsGlobalDragging:(isDragging:boolean) => void,
    passGrabNewPos:{x:number, z:number, ref:null|Group},
    setPassGrabNewPos:(x:number, z:number, ref:Group|null) => void,
    hoveringGrabItems:boolean;
    toogleHoveringGrabItems:()=>void;
    movingOrbits:boolean,
    setMovingOrbits:(value:boolean)=>void;
    click:boolean,
    setClick:(value:boolean)=>void;
}


export const useControlsStore = create<IControlsStore>()((set,get) => ({
    isGlobalDragging:false,
    setIsGlobalDragging:(isDragging:boolean) => {set({ isGlobalDragging:isDragging })},
    passGrabNewPos:{x:0, z:0, ref:null,},
    setPassGrabNewPos:(x:number, z:number, ref:Group|null) => {set({ passGrabNewPos:{x:x, z:z, ref:ref} })},
    hoveringGrabItems:false,
    toogleHoveringGrabItems:()=> {
        const {hoveringGrabItems} = get();
        set({hoveringGrabItems:!hoveringGrabItems})
    },
    movingOrbits:false,
    setMovingOrbits:(value:boolean)=> {
        set({movingOrbits:value})
    },
    click:false,
    setClick:(value:boolean) => {
        set({click:value})
    }
}))