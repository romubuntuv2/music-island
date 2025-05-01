import { create } from "zustand"


export interface IDeviceStore {
    isMobile:boolean,
    setIsMobile:(value:boolean)=> void
}

export const useDeviceStore = create<IDeviceStore>((set) => ({
    isMobile:false,
    setIsMobile: (value: boolean) => {
        set({ isMobile: value });
    },
}))