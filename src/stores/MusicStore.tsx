import { StepNoteType } from "reactronica";
import { create } from "zustand";

interface IGamme {
    color:string, 
    bells:StepNoteType[]
    synth:StepNoteType[]
    vox:StepNoteType[]
    bass:StepNoteType[]
}

interface IStep {
    z:number,
    note:number
}

const Gamme1:IGamme = {
    color:'#3185FC',
    bells:[{name:"C3",duration:2},{name:"E3",duration:2},{name:"G3",duration:2}],
    vox:[{name:"C3",duration:2}, {name:"D3",duration:2},{name:"E3",duration:2},{name:"G3",duration:2},{name:"A3",duration:2}],
    synth:[{name:"C3",duration:2}, {name:"D3",duration:2},{name:"E3",duration:2},{name:"G3",duration:2},{name:"A3",duration:2}],
    bass:[{name:"C3",duration:.5}, {name:"G3",duration:.5},{name:"E3",duration:.5},{name:"A3",duration:.5}]
}
const Gamme2:IGamme = {
    color:'#d74cde',
    bells:[{name:"E3",duration:2},{name:"G3",duration:2},{name:"A3",duration:2}],
    vox:[{name:"E3",duration:2}, {name:"G3",duration:2},{name:"A3",duration:2},{name:"B3",duration:2},{name:"D3",duration:2}],
    synth:[{name:"E3",duration:2}, {name:"G3",duration:2},{name:"A3",duration:2},{name:"B3",duration:2},{name:"D3",duration:2}],
    bass:[{name:"C3",duration:.5}, {name:"B3",duration:.5},{name:"G3",duration:.5},{name:"A3",duration:.5}]
}
const Gamme3:IGamme = {
    color:'#3cd86d',
    bells:[{name:"A3",duration:2},{name:"D#3",duration:2},{name:"E3",duration:2}],
    vox:[{name:"A3",duration:2},{name:"D#3",duration:2},{name:"E3",duration:2},{name:"B3",duration:2},{name:"F#3",duration:2}],
    synth:[{name:"A3",duration:2},{name:"D#3",duration:2},{name:"E3",duration:2},{name:"B3",duration:2},{name:"F#3",duration:2}],
    bass:[{name:"A3",duration:.5}, {name:"E3",duration:.5},{name:"F#3",duration:.5},{name:"C#3",duration:.5}]
}
const Gamme4:IGamme = {
    color:'#d88f3c',
    bells:[{name:"G3",duration:2},{name:"A#3",duration:2},{name:"D3",duration:2}],
    vox:[{name:"G3",duration:2},{name:"A#3",duration:2},{name:"D3",duration:2},{name:"C3",duration:2},{name:"F3",duration:2}],
    synth:[{name:"G3",duration:2},{name:"A#3",duration:2},{name:"D3",duration:2},{name:"C3",duration:2},{name:"F3",duration:2}],
    bass:[{name:"G3",duration:.5}, {name:"D3",duration:.5},{name:"F#3",duration:.5},{name:"A#3",duration:.5}]
}




export interface IMusicStore {
    isPlaying: boolean;
    toogleIsPlayer: () => void;

    tempo: number;
    upTempo: () => void;
    downTempo: () => void;

    rebootSong:()=> void

    steps:{
        synth:IStep[][];
        bells:IStep[][]; 
        bass:IStep[][];
        vox:IStep[][];
    }
    changeNote:(note: IStep, index: number, type:'synth'|'bells'|'vox'|'bass') => void,
    setStepsByType:(note: IStep, index: number, type:'synth'|'bells'|'vox'|'bass') => void
    getBellsSteps:()=> (StepNoteType[]|null)[]
    getStepsByType:(type:'bells'|'synth'|'vox'|'bass')=> (StepNoteType[]|null)[]


    // steps: {
    //     synth: (StepNoteType[] | null)[];
    //     bells:(StepNoteType[] |null)[];
    // };
    // setNullStepsByType:(index:number,type:string )=> void,
    // setStepsByType:(note: StepNoteType | null, index: number, type:string) => void,
    // setStepsSynth: (note: StepNoteType | null, index: number) => void;
    // setStepsBells:(note: StepNoteType | null, index: number) => void;


    currentStep: number;
    setCurrentStep: (step: number) => void;

    gammeIndex:number, 
    allGammes:IGamme[],
    currentGamme:()=> IGamme,
    toggleGamme: () => void,
    getColor:()=> string,
    getDynamicNotes:(index:number,type:'bells'|'synth'|'vox'|'bass')=>StepNoteType

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
    upTempo: () => {
        const {tempo} = get()
        set({ tempo:tempo+10})
    },
    downTempo: () => {
        const {tempo} = get()
        set({ tempo:tempo-10})
    },

    rebootSong:()=> {
        const steps = {
        bells:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
        synth:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
        bass:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
        vox:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
        }

        set({steps:steps})
    },

    steps:{
        bells:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
        synth:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
        bass:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
        vox:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
    },
    changeNote:(step:IStep, index:number, type:'synth'|'bells'|'vox'|'bass')=> {
        const {steps} =get();
        const newSteps = steps
        const typedSteps = newSteps[type]
        const indexedStep = typedSteps[index];
        const itemIndex = indexedStep.findIndex(item => item.z == step.z);
        indexedStep[itemIndex].note = step.note;
        set({steps:newSteps})
    },
    setStepsByType:(step:IStep, index:number, type:'synth'|'bells'|'vox'|'bass') => {
        const {steps} =get();
        // console.log(steps)
        const newSteps = steps
        const typedSteps = newSteps[type]
        if(step.note === -1) {
            const indexedStep = typedSteps[index];
            const itemIndex = indexedStep.findIndex(item => item.z == step.z);
            indexedStep.splice(itemIndex,1);
        } else {
            typedSteps[index].push(step);
        }
        set({steps:newSteps})
    },
    getBellsSteps:() => {
        const {currentGamme, steps} = get()

        const bellsSteps:(StepNoteType[]|null)[] = []
        steps.bells.map((step) => {
            if(step.length == 0) bellsSteps.push(null);
            else {
                const stepArray:StepNoteType[] = []
                step.map((note)=> {
                    stepArray.push(currentGamme().bells[note.note])
                })
                bellsSteps.push(stepArray)
            }
        })
        return bellsSteps
    },

    getStepsByType:(type:'bells'|'synth'|'vox'|'bass') => {
        const {currentGamme, steps} = get()
        const exportedSteps:(StepNoteType[]|null)[] = []
        steps[type].map((step)=> {
            if(step.length == 0) exportedSteps.push(null);
            else {
                const stepArray:StepNoteType[] = []
                step.map((note)=> {
                    stepArray.push(currentGamme()[type][note.note])
                })
                exportedSteps.push(stepArray)
            }
        })
        return exportedSteps
    },

    // steps:{
    //     synth:[null, null, null, null, null, null, null, null,null, null, null, null, null, null, null, null],
    //     bells:[null, null, null, null, null, null, null, null,null, null, null, null, null, null, null, null],
    // },
    // setNullStepsByType:(index:number,type:string )=> {
    //     const {setStepsBells, setStepsSynth} =get();
    //     switch (type) {
    //         case 'synth':
    //             setStepsSynth(null, index);
    //             break;
    //         case 'bells':
    //             setStepsBells(null, index);
    //             break;
    //         default:
    //             break;
    //     }
    // },
    // setStepsByType:(note: StepNoteType | null, index: number, type:string) => {
    //     const {setStepsBells, setStepsSynth} =get();
    //     switch (type) {
    //         case 'synth':
    //             setStepsSynth(note, index);
    //             break;
    //         case 'bells':
    //             setStepsBells(note, index);
    //             break;
    //         default:
    //             break;
    //     }
    // },
    // setStepsSynth:(note: StepNoteType | null, index: number) => {
    //     const { steps:newSteps } = get();
    //     const newStepsSynth = [...newSteps.synth];
    //     if(note == null) newStepsSynth[index] = null; /// ATTENTION, A PERFECTIONNER POUR LA NOTE
    //     else if(note != null && newStepsSynth[index] == null)  newStepsSynth[index] = [note];
    //     else if(note != null && newStepsSynth[index] != null)  newStepsSynth[index] = [... newStepsSynth[index], note]
    //     newSteps.synth = newStepsSynth;
    //     set({ steps: newSteps });
    // },
    // setStepsBells:(note: StepNoteType | null, index: number) => {
    //     const { steps:newSteps } = get();
    //     const newStepsBells = [...newSteps.bells];
    //     if(note == null) newStepsBells[index] = null; /// ATTENTION, A PERFECTIONNER POUR LA NOTE
    //     else if(note != null && newStepsBells[index] == null)  newStepsBells[index] = [note];
    //     else if(note != null && newStepsBells[index] != null)  newStepsBells[index] = [... newStepsBells[index], note]
    //     newSteps.bells = newStepsBells;
    //     set({ steps: newSteps });
    // },


    currentStep:0,
    setCurrentStep: (step: number) => {
        set({ currentStep: step });
    },


    gammeIndex:0,
    allGammes:[Gamme1, Gamme2, Gamme3, Gamme4],
    currentGamme:() => {
        const {gammeIndex, allGammes} = get()
        return allGammes[gammeIndex]
    },
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
    
    getDynamicNotes:(index:number,type:'bells'|'synth'|'vox'|'bass') => {
        const {currentGamme} = get()
        return currentGamme()[type][index]
    }


}))