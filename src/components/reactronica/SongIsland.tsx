
import { Instrument, Song, Track } from 'reactronica'
import { useMusicStore } from '../../stores/MusicStore'

const SongIsland = () => {

  const {isPlaying, tempo, setCurrentStep, steps} = useMusicStore()

  
  return <Song isPlaying={isPlaying} bpm={tempo} >
    <Track //SYNTH TRACK  
      steps={steps.synth}
      onStepPlay={(_, index) => {
        console.log(index);
        setCurrentStep(index)
      }}>
    <Instrument type='synth' />  
    </Track>


    <Track //BELLS TRACK TRACK  
      steps={steps.bells}
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