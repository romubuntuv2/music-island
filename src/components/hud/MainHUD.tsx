
import styled from 'styled-components'
import { useMusicStore } from '../../stores/MusicStore'

const MainHUD = () => {

  const {isPlaying, toogleIsPlayer, setTempo, tempo} = useMusicStore()



  return <>
    <Button left={0} onClick={()=> toogleIsPlayer()} >{isPlaying?"Stop":"Play"}</Button>
    <Button left={50} onClick={()=> setTempo(tempo+10)} >TEMPO++</Button>
    <Button left={100} onClick={()=> setTempo(tempo-10)} >TEMPO--</Button>
  </>

}

const Button = styled.button<{left:number}>`
  margin: 0;
  position: absolute;
  top: 0;
  left: ${props => props.left}px;
  z-index: 5;
`



export default MainHUD