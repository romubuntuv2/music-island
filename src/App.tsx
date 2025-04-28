import styled from "styled-components"

import MainExperience from "./mainExperience/MainExperience"


function App() {

  return (
    <Container >
      <MainExperience/>
    </Container>
  )
}

export default App



const Container = styled.div`
  margin: 0;
  height: 100vh;
  width: 100vw;
  background-color: #3185FC;
  overflow: none;
`