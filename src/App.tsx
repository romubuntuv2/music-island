import styled from "styled-components"

import MainExperience from "./mainExperience/MainExperience"
import { useEffect, useState } from "react"
import Home from "./components/hud/Home";
import Cursor from "./components/hud/Cursor";
import { Analytics } from "@vercel/analytics/react";
import { useDeviceStore } from "./stores/DeviceStore";
import { usePocketBaseStore } from "./stores/PocketBaseStore";


function App() {

  const [start, setIsStart] = useState(true);

  const {setIsMobile, isMobile} = useDeviceStore();
  const {fetchSounds, isLoaded} = usePocketBaseStore();
  useEffect(()=> {
    setIsMobile(window.innerWidth <= 1024);
  },[])

  useEffect(()=> {
    if(!isLoaded) {
      fetchSounds();
    }
  }, [isLoaded])


  return (
    <Container>
      <Analytics/>
      {start?
      <Home setIsStart={setIsStart} />:
      <MainExperience/>
      }
      {!isMobile && <Cursor/>}
    </Container>
  )
}

export default App



const Container = styled.div`
  margin: 0;
  height: 100vh;
  width: 100vw;
  overflow:none;
  cursor: none;
`