import { Instance } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMotionValue, useSpring, useTime, useTransform } from "motion/react"
import { useMemo, useRef } from "react"
import { Mesh } from "three"
import { Dist } from "../../../functions/toolsFunctions"


const OceanCube = (
    {item, index}:{item:{x:number, z:number, scale:number, color:string}, index:number}
) => {

  const dist = useMemo(()=> {
    return Dist(0,item.x, 0, item.z)
  },[])

  const ref = useRef<Mesh>(null)
  const offset = useMotionValue(Math.random()*3000)
  const time = useTime();
  const timeMod = useTransform(()=> (time.get()+ offset.get())%3000)
  const timeTransform = useTransform(timeMod, [0,3000], [-2*Math.PI, 0])  

  const scaleFromTime = useTransform(time, [dist*100, dist*200], [0,1]);
  const springScale = useSpring(scaleFromTime);
  

  useFrame(()=> {
    if(ref.current == null) return;
    ref.current.position.y = Math.sin(timeTransform.get())*(-.5+item.scale)*0.2;


    ref.current.scale.y = springScale.get();
    ref.current.scale.x = springScale.get();
    ref.current.scale.z = springScale.get();
  })


  return <Instance ref={ref}
  receiveShadow
  color={item.color}
  position={[item.x, -.5+item.scale, item.z]} key={index}  />
}

export default OceanCube