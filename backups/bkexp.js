import * as THREE from 'three'
import React, { useRef, useState, useMemo, useCallback, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, Dom, extend } from 'react-three-fiber'
import './App.css';
import { BoxHelper, SpotLightHelper, PointLightHelper, TextureLoader } from "three"
import { useHelper } from '@react-three/drei'
import lerp from 'lerp'

import tx from './texture/wall.jpg'
import tx2 from './texture/wall2.png'
import bl from './bold.blob';

function Plane() {
  const ref = useRef()
  return (
    <>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}

function Box() {
  const ref = useRef()
  const size = 20;

  const x = Math.PI / -2;

  return (
    <>
      <mesh ref={ref} rotation={[x,0,0]}>
        <planeBufferGeometry attach="geometry" args={[size, size]} /> 
        <meshPhongMaterial   attach="material" color="floralwhite" />
      </mesh>
      <mesh ref={ref} rotation={[0,0,0]} position={[0, size/2, -size/2]}>
        <planeBufferGeometry attach="geometry" args={[size, size]} /> 
        <meshPhongMaterial   attach="material" color="floralwhite" />
      </mesh>
      <mesh ref={ref} rotation={[0,-x,0]} position={[-size/2, size/2, 0]}>
        <planeBufferGeometry attach="geometry" args={[size, size]} /> 
        <meshPhongMaterial   attach="material" color="floralwhite" />
      </mesh>
    </>
  )
}

function Name({text, y}) {
  const size = .5
  const ref = useRef()
  const font = useLoader(THREE.FontLoader, bl)

  const config = useMemo(
    () => ({ font, size:     40, height:        1, 
             curveSegments:  32, bevelEnabled:  true, 
             bevelThickness: 10, bevelSize:     2, 
             bevelOffset:     0, bevelSegments: 10 }),
    [font]
  )

  useFrame(() => {
  })

  return (
    <>
      <mesh 
        ref={ref}
        position={[-4, y, 0]}
        rotation={[0,1,0]}
        scale={[0.1 * size, 0.1 * size, 0.1]}
      >
        <textGeometry attach="geometry" args={[text, config]} />
        <meshPhongMaterial attach="material" color="grey"/>
      </mesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}

export default function App() {
  return (
    <>
    <Canvas 
      colorManagement
      camera={{ fov: 75, position: [10, 10, 10] }}
    >
      <Suspense fallback={<Dom center className="loading" children="Loading..." />}>
        <pointLight position={[10, 10, 10]} />
        <pointLight color="red" position={[50, 50, 0]} intensity={2.2} />
        <fog attach="fog" args={['white', 50, 190]} />
        <Box />
        <Name text="TEST" y={2} />
      </Suspense>
    </Canvas>
    </>
  )
}