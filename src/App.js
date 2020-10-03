import * as THREE from 'three'
import React, { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, Dom, useResource } from 'react-three-fiber'
import './App.css';
import { BoxHelper, SpotLightHelper, PointLightHelper, TextureLoader, BoxBufferGeometry, BackSide } from "three"
import { Stats, useHelper, Text } from '@react-three/drei'
import lerp from 'lerp'
import  bl from './bold.blob'
import { buildQueries } from '@testing-library/react';

function Plane() {
  const ref = useRef()
  const size = 40;

  const x = Math.PI / -2;

  console.log("box-render")

  return (
    <>
      <mesh ref={ref} rotation={[0,0,0]} position={[0, 0, -2]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[size, size + 30]} /> 
        <meshPhongMaterial   attach="material" color="#272730" />
      </mesh>
    </>
  )
}
function Name({text, pos} ) {
  const {s, viewport} = useThree()
  const w = viewport.width * .008
  console.log(w)

  let time = 0;
  const aspect = 1;
  const size = 0.1
  const ref = useRef()
  const font = useLoader(THREE.FontLoader, bl)

  const config = useMemo(
    () => ({ font, size:     40, height:        0, 
             curveSegments:  32, bevelEnabled:  true, 
             bevelThickness: 10, bevelSize:     2, 
             bevelOffset:     0, bevelSegments: 10 }),
    [font]
  )

  return (
      <mesh 
        ref={ref}
        position={[...pos]}
        scale={[0.1 * w, 0.1 * w, 0.1]}
        castShadow
      >
        <textGeometry attach="geometry" args={[text, config]} />
        <meshNormalMaterial attach="material" />
      </mesh>

  )
}

function Driver() {
  let time = 0;
  const {size, viewport} = useThree()
  console.log(viewport)
  const ref = useRef()


  useFrame(() => {
    time += 0.01
    const si = Math.sin(time) / 2
    const co = Math.cos(time) / 2

    ref.current.position.y = 1
    ref.current.rotation.x = si + co
    ref.current.rotation.y = si + co
    ref.current.rotation.z = si + co
    //ref.current.children[0].rotation.x = Math.sin(time)
    //ref.current.children[1].rotation.z += 0.01
  })

  return (
    <group ref={ref}>
      <Name text="CONTACT"  pos={[-2, 0, 0]}/>
    </group>
  )
}
function Lights() {
  const [ref, light] = useResource()
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        ref={ref}
        intensity={0.6}
        position={[5, 5, 5]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
    </>
  )
}

function Box({pos}) {
  const ref = useRef()

  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })

  return (
    <mesh ref={ref} position={[...pos]} castShadow>
      <octahedronBufferGeometry attach="geometry" args={[1]} />
      <meshPhongMaterial attach="material" />
    </mesh>
  )
}

function Setup() {
  return (
    <>
      <Name text="ADHES" pos={[-9,7,-2]}/>
      <Name text="DEVELOPMENT" pos={[-2,3,0]}/>
      <Box pos={[0,0,0]}/>
      <Box pos={[4,0,0]}/>
      <Plane />
      <Lights />
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
      //<meshPhongMaterial attach="material" color="floralwhite" />

function View() {
  return (
    <>
      <Build size={[1,10,1]} pos={[-12,0,0]} />
      <Build size={[1,10,1]} pos={[-5,0,0]} />
      <Build size={[8,1,1]} pos={[-8,-5,0]} />
    </>
  )
}


export default function App() {
  const ref = useRef()

  return (
    <>
      <Canvas shadowMap camera={{ position: [0, 0, 15] }}>
        <Suspense fallback={<Dom center className="loading" children="Loading..."/>}>
          <Setup />
          <View />
        </Suspense>
      </Canvas>
      <Stats />
    </>
  )
}