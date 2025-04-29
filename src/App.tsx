import styled from "styled-components"

import MainExperience from "./mainExperience/MainExperience"
import { useState } from "react"
import Home from "./components/hud/Home";
import Cursor from "./components/hud/Cursor";


function App() {

  const [start, setIsStart] = useState(true);

  return (
    <Container>
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

  cursor: none;
`