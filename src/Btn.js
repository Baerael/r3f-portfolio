//import * as THREE from 'three'
import React, { useRef, useState, useEffect} from 'react'
import { useFrame, useLoader} from 'react-three-fiber'
import { TextureLoader } from "three"
import { Text } from '@react-three/drei'

function Plane({s, pos, color, image}) {
  const ref = useRef()

  return (
    <>
      <mesh ref={ref} rotation={[0,0,0]} position={[...pos]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[...s]} /> 
        <meshPhongMaterial   attach="material" color={color} map={image} />
      </mesh>
    </>
  )
}

function Build({pos, size}) {
  return (
    <mesh
      position={[...pos]}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={[...size]} />
      <meshNormalMaterial attach="material" color="floralwhite" />
    </mesh>
  )
}

function Btn({mouse, pos, image, link = null}) {
  //const {viewport, size} = useThree()
  const ref = useRef()
  const [hovered, setHover] = useState(false)

  useFrame(() => {
    if(ref.current) {
      ref.current.rotation.y = mouse.current[0] * .001 / 3.14
      ref.current.rotation.x = mouse.current[1] * .001 / 3.14
    }
  })

  return (
    <group 
      ref={ref}
      position={[1,1,1]}
      scale={[.1 ,.1 ,.1]}
      onPointerOver={(e) => (document.body.style.cursor = 'pointer', setHover(true))}
      onPointerOut={(e) => (document.body.style.cursor = '', setHover(false))}
      onClick={(e) => link ? window.open(link) : null}
    >
      <Build size={[1,10,1]}  pos={[-11.5, 0  ,0]} />
      <Build size={[1,10,1]}  pos={[ 11.5, 0  ,0]} />
      <Build size={[24,1,1]}  pos={[ 0,   -5.5 ,0]} />
      <Build size={[24,1,1]}  pos={[ 0,  5.5 ,0]} />
      <Plane s={[20, 10]} pos={[0,.2,.1]}   color={hovered ? 'purple' : 'white'}/>
    </group>
  )
}

export default Btn;