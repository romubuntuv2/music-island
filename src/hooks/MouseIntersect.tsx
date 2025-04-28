import { useThree } from "@react-three/fiber";
import { useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import * as THREE from "three"

const useMouseIntersect = () => {

    const {camera, scene} = useThree();



    const pointerPos = useRef<THREE.Vector3>(new THREE.Vector3(0,0,0));
    const motionPointerPos = useMotionValue<THREE.Vector3>(new THREE.Vector3(0,0,0));
     
    useEffect(()=> {
        const raycast = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        const onMouseMove = (event: MouseEvent) => {
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
            raycast.setFromCamera(pointer, camera);
            const intersects = raycast.intersectObjects(scene.children, true);
      
            if (intersects.length > 0) {

              pointerPos.current = intersects[0].point;
              motionPointerPos.set(intersects[0].point);
            }
        }
        
        const onMouseDown = (event:MouseEvent) => {
          pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
          pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
          raycast.setFromCamera(pointer, camera);
          const intersects = raycast.intersectObjects(scene.children, true);
    
          if (intersects.length > 0) {

            // intersects[0].object._listeners.onClick[0]()
          }
        }
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        return ()=> {
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
        }
    })   


  return {pointerPos, motionPointerPos}
}

export default useMouseIntersect