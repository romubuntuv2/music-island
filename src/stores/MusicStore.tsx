import { StepNoteType } from "reactronica";
import { create } from "zustand";

interface IGamme {
    color:string, 
    bellsNote:StepNoteType[]
}

interface IStep {
    
}

const Gamme1:IGamme = {
    color:'#3185FC',
    bellsNote:[{name:"C3",duration:0.5}, {name:"D3",duration:0.5},{name:"E3",duration:0.5},{name:"G3",duration:0.5},{name:"A3",duration:0.5}]
}
const Gamme2:IGamme = {
    color:'#d74cde',
    bellsNote:[{name:"E3",duration:0.5}, {name:"G3",duration:0.5},{name:"A3",duration:0.5},{name:"B3",duration:0.5},{name:"D4",duration:0.5}]
}




export interface IMusicStore {
    isPlaying: boolean;
    toogleIsPlayer: () => void;

    tempo: number;
    setTempo: (tempo: number) => void;

    steps: {
        synth: (StepNoteType[] | null)[];
        bells:(StepNoteType[] |null)[];
    };
    setNullStepsByType:(index:number,type:string )=> void,
    setStepsByType:(note: StepNoteType | null, index: number, type:string) => void,
    setStepsSynth: (note: StepNoteType | null, index: number) => void;
    setStepsBells:(note: StepNoteType | null, index: number) => void;


    currentStep: number;
    setCurrentStep: (step: number) => void;

    gammeIndex:number, 
    allGammes:IGamme[]
    toggleGamme: () => void,
    getColor:()=> string,

}


export const useMusicStore = create<IMusicStore>((set, get) => ({ 
    isPlaying: false,
    toogleIsPlayer: () => {
        const { isPlaying, currentStep} = get();
        const newIsPlaying = !isPlaying
        let current = currentStep;
        if(!newIsPlaying) {
            current = 0
        }
        set({ isPlaying: newIsPlaying, currentStep:current})
    },
    tempo: 120,
    setTempo: (tempo: number) => {set({ tempo })},


    steps:{
        synth:[null, null, null, null, null, null, null, null,null, null, null, null, null, null, null, null],
        bells:[null, null, null, null, null, null, null, null,null, null, null, null, null, null, null, null],
    },
    setNullStepsByType:(index:number,type:string )=> {
        const {setStepsBells, setStepsSynth} =get();
        switch (type) {
            case 'synth':
                setStepsSynth(null, index);
                break;
            case 'bells':
                setStepsBells(null, index);
                break;
            default:
                break;
        }
    },
    setStepsByType:(note: StepNoteType | null, index: number, type:string) => {
        const {setStepsBells, setStepsSynth} =get();
        switch (type) {
            case 'synth':
                setStepsSynth(note, index);
                break;
            case 'bells':
                setStepsBells(note, index);
                break;
            default:
                break;
        }
    },
    setStepsSynth:(note: StepNoteType | null, index: number) => {
        const { steps:newSteps } = get();
        const newStepsSynth = [...newSteps.synth];
        if(note == null) newStepsSynth[index] = null; /// ATTENTION, A PERFECTIONNER POUR LA NOTE
        else if(note != null && newStepsSynth[index] == null)  newStepsSynth[index] = [note];
        else if(note != null && newStepsSynth[index] != null)  newStepsSynth[index] = [... newStepsSynth[index], note]
        newSteps.synth = newStepsSynth;
        set({ steps: newSteps });
    },
    setStepsBells:(note: StepNoteType | null, index: number) => {
        const { steps:newSteps } = get();
        const newStepsBells = [...newSteps.bells];
        if(note == null) newStepsBells[index] = null; /// ATTENTION, A PERFECTIONNER POUR LA NOTE
        else if(note != null && newStepsBells[index] == null)  newStepsBells[index] = [note];
        else if(note != null && newStepsBells[index] != null)  newStepsBells[index] = [... newStepsBells[index], note]
        newSteps.bells = newStepsBells;
        set({ steps: newSteps });
    },


    currentStep:0,
    setCurrentStep: (step: number) => {
        set({ currentStep: step });
    },


    gammeIndex:0,
    allGammes:[Gamme1, Gamme2],
    toggleGamme: () => {
        const {gammeIndex, allGammes} = get()
        let newIndex = gammeIndex;
        while(newIndex == gammeIndex) {
            newIndex = Math.round(Math.random()*(allGammes.length-1))
        }
        set({gammeIndex:newIndex})
    },
    getColor:()=> {
        const {gammeIndex, allGammes} = get()
        const currentGamme = allGammes[gammeIndex]
        return currentGamme.color
    },


}))