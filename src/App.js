import * as THREE from 'three'
import React, { useRef, useState, useEffect, useCallback, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, Dom, useResource } from 'react-three-fiber'
import './App.css';
import { BoxHelper, SpotLightHelper, PointLightHelper, TextureLoader, BoxBufferGeometry, BackSide, Texture } from "three"
import { Stats, useHelper, Text, Html } from '@react-three/drei'
import lerp from 'lerp'
import  bl from './bold.blob'

import Portal from './Portal.js'
import Name from './Name.js'

import tx from './texture/wall.jpg'
import galx from './texture/galx.png'
import imgdb from './texture/imgdb.png'

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

function Button({pos, text, link = null}) {
  const {viewport} = useThree()
  const w = viewport.width
  const max = viewport.width

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
      //onPointerOver={(e) => setHover(true)}
      //onPointerOut={(e) => setHover(false)}
      onPointerOver={(e) => (document.body.style.cursor = 'pointer', setHover(true))}
      onPointerOut={(e) => (document.body.style.cursor = '', setHover(false))}
      castShadow
      onClick={(e) => link ? window.open(link) : null}
    >
      <octahedronBufferGeometry attach="geometry" args={[1]} />
      <meshPhongMaterial attach="material" color={hovered ? 'hotpink' : 'floralwhite'}/>
    </mesh>
    <Text scale={[9,9,9]} position={[pos[0] + 8,pos[1], pos[2]]} color={hovered ? 'hotpink' : 'floralwhite'}>{text}</Text>
    </>
  )
}

function Setup({mouse}) {
  const {size} = useThree()
  let fontPos1 = [-9, 7, 2]
  let fontPos2 = [-1, 3, 2]
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
      <Name text="ADHES" pos={fontPos1}/>
      <Name text="DEVELOPMENT" pos={fontPos2}/>
      <Button pos={btnPos1} text="Github" link="https://github.com/adhebadhe"/>
      <Button pos={btnPos2} text="bendpratte@gmail.com" link="https://www.youtube.com/watch?v=HSmKiws-4NU"/>
      <Plane s={[1000, 1000]} pos={[0, 0, -10]} color="#272730"/>
      <Lights />
      <Portal mouse={mouse} pos={portalPos1} image={galx} link="https://github.com/adhebadhe/galaxian"/>
      <Portal mouse={mouse} pos={portalPos2} image={imgdb} link="https://github.com/adhebadhe/imagedb-backend"/>
    </>
  )
}


export default function App() {
  const ref = useRef()
  const mouse = useRef([0, 0])
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])

  return (
    <>
      <Canvas 
        shadowMap 
        camera={{ fov: 100, position: [0, 1, 15] }}
        onMouseMove={onMouseMove}
        concurrent
      >
        <Suspense fallback={<Dom center className="loading" children="Loading..."/>}>
          <Setup mouse={mouse}/>
        </Suspense>
      </Canvas>
      <Stats />
    </>
  )
}