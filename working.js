import * as THREE from 'three'
import React, { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, Dom, extend } from 'react-three-fiber'
import './App.css';
import { BoxHelper, SpotLightHelper, PointLightHelper, TextureLoader, BoxBufferGeometry } from "three"
import { useHelper, Text } from '@react-three/drei'
import lerp from 'lerp'
//import tx from './texture/wall.jpg'
//import tx2 from './texture/wall2.png'
import bl from './bold.blob';
//import state from './store'

function Box() {
  const ref = useRef()
  const size = 40;

  const x = Math.PI / -2;

  console.log("box-render")

  return (
    <>
      <mesh ref={ref} rotation={[0,0,0]} position={[0, 0, -2]}>
        <planeBufferGeometry attach="geometry" args={[size, size]} /> 
        <meshPhongMaterial   attach="material" color="floralwhite" />
      </mesh>
    </>
  )
}

const data = {
  string: [
  {
    y: 1,
    z: 7,
    text: "CONTACT",
  },
  { 
    y: 1,
    z: 4,
    text: "WHOIIS",
  }
]}

/// NAME
function Name({text, pos} ) {
  const {s, viewport} = useThree()
  const w = viewport.width * .008
  console.log(w)

  let time = 0;
  const aspect = 1;
  const size = 0.2
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
  time += 0.01
  //ref.current.rotation.x = Math.sin(time)
  //ref.current.rotation.y = Math.sin(time)
})

  return (
      <mesh 
        ref={ref}
        position={[...pos]}
        scale={[0.1 * w, 0.1 * w, 0.1]}
      >
        <textGeometry attach="geometry" args={[text, config]} />
        <meshPhongMaterial attach="material" color="grey"/>
      </mesh>

  )
}
//    <instancedMesh ref={ref} args={[null, null, count]} ></instancedMesh>

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
 


export default function App() {
  const {size, viewport} = useThree()
  const ref = useRef()
  //const [y, setY] = useState(0)
  //const [active, setActive] = useState(false)


  //useEffect(() => void onScroll({target: ref.current}), [])
  console.log("render")


  return (
    <Canvas 
      colorManagement
      //camera={{ fov: 75, position: [10, 10, 10] }}
      camera={{ fov: 75, position: [0, 1, 10] }}
      //onWheel={onScroll}
      //concurrent
    >
      <Suspense fallback={<Dom center className="loading" children="Loading..." />}>
        <pointLight position={[10, 10, 10]} />
        <pointLight color="red" position={[50, 50, 0]} intensity={2.2} />
        <fog attach="fog" args={['white', 50, 190]} />
        <Text 
          position={[0, 6, 0]}
          fontSize={2}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >Hello</Text>
        <Driver />
        <gridHelper args={[30, 30, 30]} />
      </Suspense>
    </Canvas>
  )
}