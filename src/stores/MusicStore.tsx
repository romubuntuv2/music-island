import { StepNoteType, StepType } from "reactronica";
import { create } from "zustand";

export interface IMusicStore {
    isPlaying: boolean;
    toogleIsPlayer: () => void;

    tempo: number;
    setTempo: (tempo: number) => void;

    steps: {
        synth: (StepType[] | null)[];
        bells:(StepType[] |null)[];
    };
    setNullStepsByType:(index:number,type:string )=> void,
    setStepsByType:(note: StepNoteType | null, index: number, type:string) => void,
    setStepsSynth: (note: StepNoteType | null, index: number) => void;
    setStepsBells:(note: StepNoteType | null, index: number) => void;


    currentStep: number;
    setCurrentStep: (step: number) => void;

}


export const useMusicStore = create<IMusicStore>((set, get) => ({
    isPlaying: false,
    toogleIsPlayer: () => {
        const { isPlaying } = get();
        set({ isPlaying: !isPlaying})
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
        // console.log(note);
        // const { steps:newSteps } = get();
        // const newStepsSynth = [...newSteps.synth];
        // newStepsSynth[index] = note;
        // newSteps.synth = newStepsSynth;
        // set({ steps: newSteps });
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


}))