import { Canvas } from "@react-three/fiber"
import styled from "styled-components"
import SongIsland from "../components/reactronica/SongIsland"
import MainHUD from "../components/hud/MainHUD"
import { PerformanceMonitor } from "@react-three/drei"
import Island from "../components/r3f/Island"


const MainExperience = () => {

  
  
  return <>
    <MainHUD/>
    <StyledCanvas shadows >
        <PerformanceMonitor />
        <Island/>
    </StyledCanvas>
    <SongIsland/>
    </>
}

const StyledCanvas = styled(Canvas)`
    margin: 0;
    height: 100%;
    width: 100%;
`

export default MainExperience