import { create } from "zustand"

const SwitchSound = '/sfx/Switch.mp3'
const SwipeSound = '/sfx/Swipe.wav'
const IntroSound = '/sfx/intro.wav'
const Pop = '/sfx/Pop.wav'
const Trash = '/sfx/Trash.wav'

interface Sound {
    id:string,
    sound:HTMLAudioElement|null
}

interface SFXStore {
    switchSound:Sound,
    swipeSound:Sound,
    popSound:Sound,
    trashSound:Sound,
    introSound:Sound,
    play:(id:string)=>void,
    stop:(id:string)=>void,
    initSounds:()=> void,
}


export const useSFXStore = create<SFXStore>((set, get) => ({
    switchSound:{id:'switch', sound:null},
    swipeSound:{id:'swipe', sound:null},
    introSound:{id:'intro', sound:null},
    trashSound:{id:'trash', sound:null},
    popSound:{id:'pop', sound:null},
    play:(id:string)=> {
        const {switchSound, swipeSound, introSound, popSound,trashSound} = get()
        const allSounds = [switchSound, swipeSound, introSound, popSound,trashSound]
        const findedSound = allSounds.find(sound => sound.id === id);
        if(findedSound && findedSound.sound != null) {
            findedSound.sound.play()
        }
    },
    stop:(id:string)=> {
        const {switchSound, swipeSound,popSound} = get()
        const allSounds = [switchSound, swipeSound,popSound]
        const findedSound = allSounds.find(sound => sound.id === id);
        if(findedSound  && findedSound.sound != null) {
            if(findedSound.sound.loop) {
                findedSound.sound.loop = false;
            }
            findedSound.sound.pause();
            findedSound.sound.currentTime = 0;
        }
    }, 
    initSounds:()=> {
        const {swipeSound, switchSound, introSound, popSound,trashSound} = get();
        swipeSound.sound = new Audio(SwipeSound)
        switchSound.sound = new Audio(SwitchSound)
        introSound.sound = new Audio(IntroSound)
        popSound.sound = new Audio(Pop)
        trashSound.sound = new Audio(Trash)

        set({swipeSound, switchSound,introSound,popSound,trashSound})
    }
}))