import { Group } from "three"
import { create } from "zustand"

export interface IControlsStore  {
    isGlobalDragging:boolean,
    setIsGlobalDragging:(isDragging:boolean) => void,
    passGrabNewPos:{x:number, z:number, ref:null|Group},
    setPassGrabNewPos:(x:number, z:number, ref:Group|null) => void,

}


export const useControlsStore = create<IControlsStore>()((set) => ({
    isGlobalDragging:false,
    setIsGlobalDragging:(isDragging:boolean) => {set({ isGlobalDragging:isDragging })},
    passGrabNewPos:{x:0, z:0, ref:null,},
    setPassGrabNewPos:(x:number, z:number, ref:Group|null) => {set({ passGrabNewPos:{x:x, z:z, ref:ref} })},

}))