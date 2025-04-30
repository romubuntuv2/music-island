import { Group } from "three"
import { create } from "zustand"

export interface IControlsStore  {
    isGlobalDragging:boolean,
    setIsGlobalDragging:(isDragging:boolean) => void,
    passGrabNewPos:{x:number, z:number, ref:null|Group},
    setPassGrabNewPos:(x:number, z:number, ref:Group|null) => void,

    cursorType:string,
    setCursorType:(type:string)=>void,


    click:boolean,
    setClick:(value:boolean)=>void;
}


export const useControlsStore = create<IControlsStore>()((set) => ({
    isGlobalDragging:false,
    setIsGlobalDragging:(isDragging:boolean) => {set({ isGlobalDragging:isDragging })},
    passGrabNewPos:{x:0, z:0, ref:null,},
    setPassGrabNewPos:(x:number, z:number, ref:Group|null) => {set({ passGrabNewPos:{x:x, z:z, ref:ref} })},


    cursorType:'none',
    setCursorType:(type:string) => {
        set({cursorType:type})
    },

    click:false,
    setClick:(value:boolean) => {
        set({click:value})
    }
}))