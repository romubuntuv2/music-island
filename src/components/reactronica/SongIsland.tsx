
import { Instrument, Song, Track } from 'reactronica'
import { useMusicStore } from '../../stores/MusicStore'
import { useEffect, useMemo } from 'react'
import { usePocketBaseStore } from '../../stores/PocketBaseStore'
const SongIsland = () => {

  const {isPlaying, tempo,currentStep, setCurrentStep, getStepsByType} = useMusicStore()
  const {sounds, synthSounds, bassSounds, bellSounds, voxSounds} = usePocketBaseStore();

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


  useEffect(()=> {
    console.log(sounds)
  },[currentStep])


  return <Song isPlaying={isPlaying} bpm={tempo} >
    <Track //SYNTH TRACK  
      steps={synthSteps}
      >
    <Instrument type='sampler' polyphony={7}
    samples={{
      C3: synthSounds.C,
      'C#3':synthSounds['C#'],
      D3: synthSounds['D'],
      'D#3':synthSounds['D#'],
      E3: synthSounds['E'],
      F3:synthSounds['F'],
      'F#3':synthSounds['F#'],
      G3: synthSounds['G'],
      'G#3':synthSounds['G#'],
      A3: synthSounds['A'],
      'A#3':synthSounds['A#'],
      B3: synthSounds['B'],
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
      C3: bellSounds.C,
      'C#3':bellSounds['C#'],
      D3: bellSounds['D'],
      'D#3':bellSounds['D#'],
      E3: bellSounds['E'],
      F3:bellSounds['F'],
      'F#3':bellSounds['F#'],
      G3: bellSounds['G'],
      'G#3':bellSounds['G#'],
      A3: bellSounds['A'],
      'A#3':bellSounds['A#'],
      B3: bellSounds['B'],
    }}
    />  
    </Track>

    <Track //BASS TRACK  
      steps={bassSteps}
      >
    <Instrument type='sampler' polyphony={7}
    samples={{
      C3: bassSounds.C,
      'C#3':bassSounds['C#'],
      D3: bassSounds['D'],
      'D#3':bassSounds['D#'],
      E3: bassSounds['E'],
      F3:bassSounds['F'],
      'F#3':bassSounds['F#'],
      G3: bassSounds['G'],
      'G#3':bassSounds['G#'],
      A3: bassSounds['A'],
      'A#3':bassSounds['A#'],
      B3: bassSounds['B'],
    }}
    />  
    </Track>


    <Track //VOX TRACK  
      steps={voxSteps}
      >
    <Instrument type='sampler' polyphony={7}
    samples={{
      C3: voxSounds.C,
      'C#3':voxSounds['C#'],
      D3: voxSounds['D'],
      'D#3':voxSounds['D#'],
      E3: voxSounds['E'],
      F3:voxSounds['F'],
      'F#3':voxSounds['F#'],
      G3: voxSounds['G'],
      'G#3':voxSounds['G#'],
      A3: voxSounds['A'],
      'A#3':voxSounds['A#'],
      B3: voxSounds['B'],
    }}
    />  
    </Track>

  </Song>
}

export default SongIsland