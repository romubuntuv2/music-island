import { motion } from "motion/react"
import styled from "styled-components"
import { useEnvStore } from "../../stores/EnvStore";
import { useEffect } from "react";
import { useSFXStore } from "../../stores/SFXStore";


const Home = (
    {setIsStart}:{setIsStart:(value:boolean)=>void}
) => {

  const {initEnv} = useEnvStore();
  const {initSounds, play} = useSFXStore();
  useEffect(()=> {
    initEnv();
    initSounds();
  },[])

  const onStart = () => {
    play('swipe')
    setIsStart(false)
  }


  return (
    <Container>

        <TextContainer>

        <Title
        initial={{scale:0}}
        animate={{scale:1}}
        >Musical Island</Title>

        <Text fontSize="32px"
        onClick={()=> open('https://me.romubuntu.dev')}
        initial={{scale:0}}
        animate={{scale:1}}
        whileHover={{scale:0.9}}
        >Developped by romubuntu</Text>

        <StartButton
        onClick={()=> onStart()}
        initial={{scale:0}}
        animate={{scale:1}}
        whileHover={{scale:1.2}}
        >
            Start
        </StartButton>

        <Text fontSize='24px'
        initial={{scale:0}}
        animate={{scale:1}}
        transition={{delay:1}}
        >Grab some items and decorate your island... <br/> and make music with it !
        </Text>
        <Text fontSize='18px'
        initial={{scale:0,marginTop:'3%'}}
        animate={{scale:1,marginTop:'3%'}}
        transition={{delay:1}}
        >Left Click on items to move them <br/> Right Click to change their note
        </Text>
        
        <Text fontSize='12px'
        
        initial={{scale:0,marginTop:'10%'}}
        animate={{scale:1, marginTop:'10%'}}
        transition={{delay:2}}
        >Freely inspired by Odadda created by Sven Ahlgrimm
        </Text>

        </TextContainer>

    </Container>
  )
}

const StartButton = styled(motion.div)`
    margin-top: 5%;
    margin-bottom: 5%;
    background-color: white;
    border: 5px solid black;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
    width: 15%;

    font-size: 48px;

    font-family: "Fredoka", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-variation-settings:
    "wdth" 100;
`

const TextContainer = styled.div`
    height: 80%;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #3185FC;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Text = styled(motion.p)<{fontSize:string}>`
    margin: 0;
    color: white;
    font-size: ${props=>props.fontSize};
    text-align: center;

    font-family: "Fredoka", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-variation-settings:
    "wdth" 100;
`



const Title = styled(motion.h1)`
    margin: 0;
    color: white;
    font-size: 52px;
    text-align: center;


    font-family: "Fredoka", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-variation-settings:
    "wdth" 100;`

export default Home