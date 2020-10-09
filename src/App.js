//import * as THREE from 'three'
import React, { useRef, useCallback, Suspense } from 'react'
import { Canvas, Dom, useResource } from 'react-three-fiber'
import { Stats } from '@react-three/drei'

import Setup from './Setup.js'
import './App.css';


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