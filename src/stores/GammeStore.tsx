import { create } from "zustand";


interface IGamme {
    color:string, 
    bellsNote:[string,string,string,string,string]
}


interface IGammeStore {
    currentIndex:number
    allGammes:IGamme[],
    toggleGamme:()=>void,
    getColor:()=>string,
    getBells:()=>string[],
}


const Gamme1:IGamme = {
    color:'#3185FC',
    bellsNote:["C3", "D3","E3","G3","A3"]
}
const Gamme2:IGamme = {
    color:'#d74cde',
    bellsNote:["E3", "G3","A3","B3","D4"]
}

export const useGammeStore = create<IGammeStore>((set,get) => ({
    currentIndex:0,
    allGammes:[Gamme1, Gamme2],
    toggleGamme: () => {
        const {currentIndex, allGammes} = get()
        let newIndex = currentIndex;
        while(newIndex == currentIndex) {
            newIndex = Math.round(Math.random()*(allGammes.length-1))
        }
        set({currentIndex:newIndex})
    },
    getColor:()=> {
        const {currentIndex, allGammes} = get()
        const currentGamme = allGammes[currentIndex]
        return currentGamme.color
    },
    getBells:()=> {
        const {currentIndex, allGammes} = get()
        const currentGamme = allGammes[currentIndex]
        return currentGamme.bellsNote
    }

}))