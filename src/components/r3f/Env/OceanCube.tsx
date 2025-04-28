import { Instance } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMotionValue, useTime, useTransform } from "motion/react"
import { useRef } from "react"
import { Mesh } from "three"


const OceanCube = (
    {item, index}:{item:{x:number, z:number, scale:number, color:string}, index:number}
) => {

  const ref = useRef<Mesh>(null)
  const offset = useMotionValue(Math.random()*3000)
  const time = useTime();
  const timeMod = useTransform(()=> (time.get()+ offset.get())%3000)
  const timeTransform = useTransform(timeMod, [0,3000], [-2*Math.PI, 0])  


  useFrame(()=> {
    if(ref.current == null) return;
    ref.current.position.y = Math.sin(timeTransform.get())*(-.5+item.scale)*0.2;
  })


  return <Instance ref={ref}
  receiveShadow
  color={item.color}
  position={[item.x, -.5+item.scale, item.z]} key={index}  />
}

export default OceanCube