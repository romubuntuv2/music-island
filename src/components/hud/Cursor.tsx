import { motion, MotionValue, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useControlsStore } from '../../stores/ControlsStore'

const Cursor = () => {

    const {isGlobalDragging, cursorType, setClick} = useControlsStore();
    

    const motionClick = useMotionValue(false)
    const scale = useTransform(()=> motionClick.get()?0.8:1)
    const springScale = useSpring(scale as MotionValue<number>)

    const cursorX = useMotionValue(0);
    const x = useTransform(()=> cursorX.get()-5)
    const cursorY = useMotionValue(0);
    const y = useTransform(()=> cursorY.get()-5)

    const img = useTransform(()=> {  
        if(cursorType!=='none') {
            switch (cursorType) {
                case 'left':
                    return '/cursor/left.png'
                case 'right':
                    return '/cursor/right.png'
                case 'spawn':
                    return '/cursor/plus.png'
                case 'grab':
                    return '/cursor/grab.png'
                case 'move':
                    return '/cursor/move.png'
                case 'custom':
                    return '/cursor/brush.png'
                case 'reboot':
                    return '/cursor/reboot.png'
                case 'play':
                    return '/cursor/play.png'
                case 'pause':
                    return '/cursor/pause.png'
                default:
                    return '/cursor/grab.png'
            }
        }
        else if(isGlobalDragging) return '/cursor/grabbing.png'
        else return '/cursor/point.png'
    })

    useEffect(()=> {
        const handleMove = (e:MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        }
        const handleClickStart = () => {
            motionClick.set(true);
            setClick(true)
        }
        const handleClickEnd = () => {
            motionClick.set(false);
            setClick(false)
        }
        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mousedown', handleClickStart)
        window.addEventListener('mouseup', handleClickEnd)
        return () => window.removeEventListener('mousemove', handleMove);
    },[])


  return (
    <MainCursor
    style={{x:x, y:y, scale:springScale}}
    >
        <CursorImg src={img.get()} />
    </MainCursor>
  )
}

const MainCursor = styled(motion.div)`
    z-index: 5;
    position: absolute;
    width: 50px;
    height: 50px;

    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
    user-drag: none;  
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
`

const CursorImg = styled.img`
    height: 100%;
    width: 100%;
    object-fit: contain;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
    user-drag: none;  
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
`

export default Cursor