import { Canvas } from "@react-three/fiber"
import styled from "styled-components"
import SongIsland from "../components/reactronica/SongIsland"
import { PerformanceMonitor } from "@react-three/drei"
import Island from "../components/r3f/Island"
import { Suspense, useEffect } from "react"
import { useSFXStore } from "../stores/SFXStore"
import { useMusicStore } from "../stores/MusicStore"


const MainExperience = () => {


    const {getColor} = useMusicStore();
    const {play} = useSFXStore();

    useEffect(()=> {
        play('intro')
    },[])

  
  return <MainContainer color={getColor()} >
    <StyledCanvas shadows >
        <PerformanceMonitor />
        <Suspense>
        <Island/>
        </Suspense>
    </StyledCanvas>
    <SongIsland/>
    </MainContainer>
}

const MainContainer = styled.div<{color:string}>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${props=>props.color};
    /* overflow: hidden; */
`


const StyledCanvas = styled(Canvas)`
    margin: 0;
    height: 100%;
    width: 100%;
`

export default MainExperience