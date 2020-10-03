import * as THREE from 'three'
import React, { useRef, useState, useMemo, useCallback, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, Dom, extend } from 'react-three-fiber'
import './App.css';
import { BoxHelper, SpotLightHelper, PointLightHelper, TextureLoader } from "three"
import { useHelper, Text } from '@react-three/drei'
import lerp from 'lerp'
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import tx from './texture/wall.jpg'
import tx2 from './texture/wall2.png'
import bl from './bold.blob';
import state from './store'
import { act } from 'react-dom/test-utils';

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
function Name({text, y}) {
  let time = 0;
  const count = 2
  const size = .5
  const ref1 = useRef()
  const ref2 = useRef()
  const ref = useRef()

  const font = useLoader(THREE.FontLoader, bl)
  const [toggle, setToggle] = useState(false)

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const config = useMemo(
    () => ({ font, size:     40, height:        1, 
             curveSegments:  32, bevelEnabled:  true, 
             bevelThickness: 10, bevelSize:     2, 
             bevelOffset:     0, bevelSegments: 10 }),
    [font]
  )
  const p = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      let r = Math.random() * 5
      const size = .1
      temp.push({size, mx: -r * 2, my: r, mz: 0})
    }

    return temp
  }, [count])
  useFrame(() => {
    time += 0.01
   })
   
   useEffect(() => {
     console.log(ref.current.children)
   })


  const onSc = (e) => { 
    console.log("event")
    console.log(data.string[0].x)
  }

  return data.string.map((d, index) =>
      <mesh 
        key={index}
        ref={ref}
        position={[-4, d.y, d.z]}
        rotation={[0,0,0]}
        scale={[0.1 * size, 0.1 * size, 0.1]}
      >
        <textGeometry attach="geometry" args={[d.text, config]} />
        <meshPhongMaterial attach="material" color="grey"/>
      </mesh>

  )
}
//    <instancedMesh ref={ref} args={[null, null, count]} ></instancedMesh>
/*
  return data.string.map((d, index) =>
      <mesh 
        key={index}
        ref={d.ref}
        position={[-4, d.y, d.z]}
        rotation={[0,0,0]}
        scale={[0.1 * size, 0.1 * size, 0.1]}
      >
        <textGeometry attach="geometry" args={[d.text, config]} />
        <meshPhongMaterial attach="material" color="grey"/>
      </mesh>
  )

    <group ref={ref}>
      <instancedMesh 
        key={index}
        ref={ref} args={[null, null, count]} 
        position={[-4, d.y, d.z]}
        >
          <textGeometry attach="geometry" args={[d.text, config]} />
          <meshPhongMaterial attach="material" color="grey"/>
      </instancedMesh

*/





let s = 0.1
let inc = 0;
const str = ["STRING1", "STRING2"]
function Contact({text}) {
  const count = 2;
  const ref = useRef()
  const [active, setActive] = useState(false)

  const font = useLoader(THREE.FontLoader, bl)
  const config = useMemo(
    () => ({ font, size:     40, height:        1, 
             curveSegments:  32, bevelEnabled:  true, 
             bevelThickness: 10, bevelSize:     2, 
             bevelOffset:     0, bevelSegments: 10 }),
    [font]
  )

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const p = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      let r = Math.random() * 5
      const size = .1
      temp.push({size, mx: -r * 2, my: r, mz: 0})
    }

    return temp
  }, [count])

  let time = 0;

  useFrame(() => {
    time += 0.01
    p.forEach((p, i) => {
     let { size } = p;

    // Update the dummy object
    dummy.position.set(
      p.mx,
      p.my,
      p.mz
    )

     dummy.scale.set(s, s, s);
     dummy.updateMatrix();

     // And apply the matrix to the instanced item
     ref.current.setMatrixAt(i, dummy.matrix);
    })
    //mesh.current.rotation.z += .01;
    ref.current.instanceMatrix.needsUpdate = true;
  })

  const onClick = e => {
  }
  console.log('rerender')



  return (
    <>
      <instancedMesh 
        ref={ref} args={[null, null, count]}
        onClick={onClick}
      >
        <textGeometry attach="geometry" args={[str[inc], config]} />
        <meshPhongMaterial attach="material" color="grey"/>
      </instancedMesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}



export default function App() {
  const ref = useRef()
  const t = useRef(1)
  let inc = 0;
  const [y, setY] = useState(0)
  const [active, setActive] = useState(false)

  const onScroll = e => { 
    e.deltaY < 0 ? state.y += 1 : state.y += -1;
  }

  //useEffect(() => void onScroll({target: ref.current}), [])
  console.log("render")


  return (
    <>
    <Canvas 
      colorManagement
      //camera={{ fov: 75, position: [10, 10, 10] }}
      camera={{ fov: 75, position: [10, 10, 20] }}
      onWheel={onScroll}
    >
      <Suspense fallback={<Dom center className="loading" children="Loading..." />}>
        <pointLight position={[10, 10, 10]} />
        <pointLight color="red" position={[50, 50, 0]} intensity={2.2} />
        <fog attach="fog" args={['white', 50, 190]} />
        <Box />
        <Name text="CCC" y={1} />
        <gridHelper args={[30, 30, 30]} />
      </Suspense>
    </Canvas>
    </>
  )
}