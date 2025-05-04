import { create } from "zustand";
import { pb } from "../pocketbase/getPocketBase";
import { RecordModel } from "pocketbase";


// interface ISound {

// }

// interface Note {
//     note:'C'|'C#'|'D'|'D#'|'E'|'F'|'F#'|'G'|'G#'|'A'|'A#'|'B'
// }

interface ISoundGroup {
    C:string,
    'C#':string,
    'D':string,
    'D#':string,
    'E':string,
    'F':string,
    'F#':string,
    'G':string,
    'G#':string,
    'A':string,
    'A#':string,
    'B':string,
};

interface IPocketBaseStore{
    isLoaded:boolean;
    sounds:RecordModel[];
    synthSounds:ISoundGroup,
    bellSounds:ISoundGroup;
    bassSounds:ISoundGroup;
    voxSounds:ISoundGroup;
    fetchSounds: () => Promise<void>;
}


export const usePocketBaseStore = create<IPocketBaseStore>((set,get) => ({
    isLoaded:false,
    sounds:[],
    synthSounds:{
        C:'',
        'C#':'',
        'D':'',
        'D#':'',
        'E':'',
        'F':'',
        'F#':'',
        'G':'',
        'G#':'',
        'A':'',
        'A#':'',
        'B':''
    },
    bellSounds:{
        C:'',
        'C#':'',
        'D':'',
        'D#':'',
        'E':'',
        'F':'',
        'F#':'',
        'G':'',
        'G#':'',
        'A':'',
        'A#':'',
        'B':''
    },
    bassSounds:{
        C:'',
        'C#':'',
        'D':'',
        'D#':'',
        'E':'',
        'F':'',
        'F#':'',
        'G':'',
        'G#':'',
        'A':'',
        'A#':'',
        'B':''
    },
    voxSounds:{
        C:'',
        'C#':'',
        'D':'',
        'D#':'',
        'E':'',
        'F':'',
        'F#':'',
        'G':'',
        'G#':'',
        'A':'',
        'A#':'',
        'B':''
    },
    fetchSounds: async () => {
        const { synthSounds, bellSounds, bassSounds, voxSounds } = get();
        const records = await pb.collection('MISounds').getFullList();
        records.map((record:RecordModel) => {
            if(record.Type == 'Synth') {
                //@ts-expect-error ya r tqt
                synthSounds[record.Note] = pb.files.getURL(record, record.Sound);
            } else if(record.Type == 'Bells') {
                //@ts-expect-error ya r tqt
                bellSounds[record.Note] = pb.files.getURL(record, record.Sound);
            } else if(record.Type == 'Bass') {
                //@ts-expect-error ya r tqt
                bassSounds[record.Note] = pb.files.getURL(record, record.Sound);
            } else if(record.Type == 'Vox') {
                //@ts-expect-error ya r tqt
                voxSounds[record.Note] = pb.files.getURL(record, record.Sound);
            }
        })
        console.log('bells', bellSounds);
        console.log('vox', voxSounds);
        set({synthSounds, bellSounds, bassSounds, voxSounds, isLoaded:true})
    }


}))