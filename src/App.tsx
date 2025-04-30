import styled from "styled-components"

import MainExperience from "./mainExperience/MainExperience"
import { useState } from "react"
import Home from "./components/hud/Home";
import Cursor from "./components/hud/Cursor";
import { Analytics } from "@vercel/analytics/react";


function App() {

  const [start, setIsStart] = useState(true);

  return (
    <Container>
      <Analytics/>
      {start?
      <Home setIsStart={setIsStart} />:
      <MainExperience/>
      }
      <Cursor/>
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