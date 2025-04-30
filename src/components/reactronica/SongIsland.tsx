
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




  return <Song isPlaying={isPlaying} bpm={tempo} >
    <Track //SYNTH TRACK  
      steps={synthSteps}
      >
    <Instrument type='synth' />  
    </Track>


    <Track //BELLS TRACK TRACK  
      steps={bellsSteps}
      onStepPlay={(_, index) => {
        setCurrentStep(index)
      }}
    >
    <Instrument type='sampler' polyphony={7}
    samples={{
      C3: '/sounds/bells/bell-C.wav',
      D3: '/sounds/bells/bell-D.wav',
      E3: '/sounds/bells/bell-E.wav',
      G3: '/sounds/bells/bell-G.wav',
      A3: '/sounds/bells/bell-A.wav',
    }}
    />  
    </Track>

  </Song>
}

export default SongIsland