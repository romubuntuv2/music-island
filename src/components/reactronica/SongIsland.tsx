
import { Instrument, Song, Track } from 'reactronica'
import { useMusicStore } from '../../stores/MusicStore'
import {  useMemo } from 'react'
const SongIsland = () => {

  const {isPlaying, tempo,currentStep, setCurrentStep, getStepsByType} = useMusicStore()

  const synthSteps = useMemo(()=> {
    return getStepsByType('synth');
  },[currentStep])

  const bellsSteps = useMemo(()=> {
    return getStepsByType('bells');
  },[currentStep])

  const bassSteps = useMemo(()=> {
    return getStepsByType('bass');
  },[currentStep])

  const voxSteps = useMemo(()=> {
    return getStepsByType('vox');
  },[currentStep])




  return <Song isPlaying={isPlaying} bpm={tempo} >
    <Track //SYNTH TRACK  
      steps={synthSteps}
      >
    <Instrument type='sampler' polyphony={7}
    samples={{
      C3: '/sounds/synth/synth-C.wav',
      'C#3':'/sounds/synth/synth-C#.wav',
      D3: '/sounds/synth/synth-D.wav',
      'D#3':'/sounds/synth/synth-D#.wav',
      E3: '/sounds/synth/synth-E.wav',
      F3:'/sounds/synth/synth-F.wav',
      'F#3':'/sounds/synth/synth-F#.wav',
      G3: '/sounds/synth/synth-G.wav',
      'G#3': '/sounds/synth/synth-G#.wav',
      A3: '/sounds/synth/synth-A.wav',
      'A#3': '/sounds/synth/synth-A#.wav',
      B3: '/sounds/synth/synth-B.wav',
    }}
    />  
    </Track>


    <Track //BELLS TRACK TRACK  
      steps={bellsSteps}
      onStepPlay={(_, index) => {
        setCurrentStep(index)
      }}
    >
    <Instrument type='sampler' polyphony={7}
    samples={{
      C3: '/sounds/bells/bells-C.wav',
      'C#3':'/sounds/bells/bells-C#.wav',
      D3: '/sounds/bells/bells-D.wav',
      'D#3':'/sounds/bells/bells-D#.wav',
      E3: '/sounds/bells/bells-E.wav',
      F3:'/sounds/bells/bells-F.wav',
      'F#3':'/sounds/bells/bells-F#.wav',
      G3: '/sounds/bells/bells-G.wav',
      'G#3': '/sounds/bells/bells-G#.wav',
      A3: '/sounds/bells/bells-A.wav',
      'A#3': '/sounds/bells/bells-A#.wav',
      B3: '/sounds/bells/bells-B.wav',
    }}
    />  
    </Track>

    <Track //BASS TRACK  
      steps={bassSteps}
      >
    <Instrument type='sampler' polyphony={7}
    samples={{
      C3: '/sounds/bass/bass-C.wav',
      'C#3':'/sounds/bass/bass-C#.wav',
      D3: '/sounds/bass/bass-D.wav',
      'D#3':'/sounds/bass/bass-D#.wav',
      E3: '/sounds/bass/bass-E.wav',
      F3:'/sounds/bass/bass-F.wav',
      'F#3':'/sounds/bass/bass-F#.wav',
      G3: '/sounds/bass/bass-G.wav',
      'G#3': '/sounds/bass/bass-G#.wav',
      A3: '/sounds/bass/bass-A.wav',
      'A#3': '/sounds/bass/bass-A#.wav',
      B3: '/sounds/bass/bass-B.wav',
    }}
    />  
    </Track>


    <Track //VOX TRACK  
      steps={voxSteps}
      >
    <Instrument type='sampler' polyphony={7}
    samples={{
      C3: '/sounds/vox/vox-C.wav',
      'C#3':'/sounds/vox/vox-C#.wav',
      D3: '/sounds/vox/vox-D.wav',
      'D#3':'/sounds/vox/vox-D#.wav',
      E3: '/sounds/vox/vox-E.wav',
      F3:'/sounds/vox/vox-F.wav',
      'F#3':'/sounds/vox/vox-F#.wav',
      G3: '/sounds/vox/vox-G.wav',
      'G#3': '/sounds/vox/vox-G#.wav',
      A3: '/sounds/vox/vox-A.wav',
      'A#3': '/sounds/vox/vox-A#.wav',
      B3: '/sounds/vox/vox-B.wav',
    }}
    />  
    </Track>

  </Song>
}

export default SongIsland