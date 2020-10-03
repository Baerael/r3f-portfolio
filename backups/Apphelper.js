import * as THREE from 'three'
import React, { useRef, useState, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import './App.css';
import { BoxHelper, SpotLightHelper, PointLightHelper } from "three"
import { useHelper } from '@react-three/drei'
import lerp from 'lerp'

function B() {
  return (
  <mesh>
    <boxGeometry attach="geometry" />
    <meshPhongMaterial attach="material" color="grey" />
  </mesh>
  )
}

function Scene({mouse}) {
  const ref = useRef()
  const spotLight = useRef()
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  //useHelper(spotLight, SpotLightHelper, "teal")
  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = lerp(ref.current.position.x, mouse.current[0] / aspect / 10, 0.1)
      ref.current.rotation.x = lerp(ref.current.rotation.x, 0 + mouse.current[1] / aspect / 10, 0.1)
      ref.current.position.z = lerp(ref.current.position.x, mouse.current[0] / aspect / 10, 0.1)
    }
  })

  return (
    <>
      <pointLight position={[-10, 0, -20]} color="lightblue" intensity={2.5} />
      <spotLight castShadow position={[2, 5, 2]} ref={spotLight} angle={0.5} distance={20} />
      <mesh ref={ref} position={[0, 2, 0]} castShadow>
      <boxGeometry attach="geometry" />
      <meshPhongMaterial attach="material" color="grey" />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeBufferGeometry args={[100, 100]} attach="geometry" />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}

export default function App() {
  const mouse = useRef([0, 0])
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])
  console.log("test")
  return (
    <>
    <Canvas 
      colorManagement
      shadowMap
      camera={{ fov: 75, position: [-5, 5, 5] }}
      onMouseMove={onMouseMove}
    >
      <ambientLight intensity={3} />
      <pointLight color="red" position={[0, 50, 0]} intensity={2.2} />
      <pointLight color="red" position={[50, 50, 0]} intensity={2.2} />
      <Scene mouse={mouse} />
    </Canvas>
    </>
  )
}