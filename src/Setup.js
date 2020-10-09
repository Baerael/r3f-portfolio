import React, { useRef, useState } from 'react'
import { useThree, useFrame, useResource } from 'react-three-fiber'
import { Text } from '@react-three/drei'

import galx from './texture/galx.png'
import imgdb from './texture/imgdb.png'

import Font from './Font.js'
import Portal from './Portal.js'


function Lights() {
  const [ref, light] = useResource()
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight
        ref={ref}
        intensity={0.6}
        position={[5, 5, 10]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
    </>
  )
}


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


function Button({pos, text, link = null}) {
  //const {viewport} = useThree()
  const ref = useRef()
  const [hovered, setHover] = useState(false)
  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })


  return (
    <>
    <mesh ref={ref} 
      position={[...pos]} 
      onPointerOver={(e) => (document.body.style.cursor = 'pointer', setHover(true))}
      onPointerOut={(e) => (document.body.style.cursor = '', setHover(false))}
      castShadow
      onClick={(e) => link ? window.open(link) : null}
    >
      <octahedronBufferGeometry attach="geometry" args={[1]} />
      <meshPhongMaterial attach="material" color={hovered ? 'hotpink' : 'floralwhite'}/>
    </mesh>
    <Text scale={[9,9,9]} position={[pos[0] + 7,pos[1], pos[2]]} color={hovered ? 'hotpink' : 'floralwhite'}>{text}</Text>
    </>
  )
}


function Setup({mouse}) {
  const {size} = useThree()

  let fontPos1 = [-9, 7, 2]
  let fontPos2 = [0, 3, 2]
  let btnPos1 = [4, -1, 0]
  let btnPos2 = [4, -4, 0]
  let portalPos1 = [-15, 0, -6]
  let portalPos2 = [-15, -16, -6]

  if (size.width < 1250) {
    fontPos1    = [-3, 15, -2]
    fontPos2    = [-6, 12, -2]
    btnPos1     = [-4, 9, -2]
    btnPos2     = [-4, 6, -2]
    portalPos1  = [0, -1, -6]
    portalPos2  = [0, -15, -6]
    //console.log(pos1)
  }

  return (
    <>
      <Font text="ADHES" pos={fontPos1}/>
      <Font text="DEVELOPMENT" pos={fontPos2}/>
      <Button pos={btnPos1} text="Github" link="https://github.com/adhebadhe"/>
      <Button pos={btnPos2} text="placeholder@gmail.com" link="https://www.youtube.com/watch?v=HSmKiws-4NU"/>
      <Plane s={[1000, 1000]} pos={[0, 0, -10]} color="#272730"/>
      <Lights />
      <Portal mouse={mouse} pos={portalPos1} image={galx} link="https://github.com/adhebadhe/galaxian"/>
      <Portal mouse={mouse} pos={portalPos2} image={imgdb} link="https://github.com/adhebadhe/imagedb-backend"/>
    </>
  )
}


export default Setup;