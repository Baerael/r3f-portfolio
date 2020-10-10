
//import { useLoader, useThree} from 'react-three-fiber'

import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { useLoader,useFrame } from 'react-three-fiber'
import  blob from './bold.blob'

function Font({text, pos, scale} ) {
  //const {size, viewport} = useThree()
  const ref = useRef()
  const font = useLoader(THREE.FontLoader, blob)

  let [x,y,z] = pos
  //let [x,y,z] = scale

  let time = 0;
  useFrame(() => {
    time += 0.03
    ref.current.position.y = y + Math.sin(time) / 3
  })

  const config = useMemo(
    () => ({ font, size:     40, height:        0, 
             curveSegments:  32, bevelEnabled:  true, 
             bevelThickness: 10, bevelSize:     2, 
             bevelOffset:     0, bevelSegments: 10 }),
    [font]
  )

  return (
    <group
    >
      <mesh 
        ref={ref}
        position={[x,y,z]}
        scale={[...scale]}
        castShadow
      >
        <textGeometry attach="geometry" args={[text, config]} />
        <meshPhongMaterial attach="material" />
      </mesh>
    </group>

  )
}

export default Font;