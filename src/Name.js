
import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { useLoader, useThree} from 'react-three-fiber'
import  blob from './bold.blob'

function Name({text, pos} ) {
  const {size, viewport} = useThree()
  const w = viewport.width * .008
  const ref = useRef()
  const font = useLoader(THREE.FontLoader, blob)

  let [x,y,z] = pos

  const config = useMemo(
    () => ({ font, size:     40, height:        0, 
             curveSegments:  32, bevelEnabled:  true, 
             bevelThickness: 10, bevelSize:     2, 
             bevelOffset:     0, bevelSegments: 10 }),
    [font]
  )


  return (
    <group>
      <mesh 
        position={[x,y,z]}
        //scale={[0.1 * w, 0.1 * w, 0.1]}
        scale={[0.04,0.04,0.04]}
        castShadow
      >
        <textGeometry attach="geometry" args={[text, config]} />
        <meshPhongMaterial attach="material" />
      </mesh>
    </group>

  )
}

export default Name;