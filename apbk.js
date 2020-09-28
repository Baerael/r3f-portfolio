import * as THREE from 'three'
import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import './App.css';

function Vert({w}) {
  const vertices = [[-w, 0, 0], [0, w, 0], [w, 0, 0], [0, -w, 0], [-w, 0, 0]]
  return (
    <line>
      <geometry attach="geometry" vertices={vertices.map(v => new THREE.Vector3(...v))} />
      <lineBasicMaterial attach="material" color="white" />
    </line>
  )
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Rotate mesh every frame, this is outside of React without overhead
  //useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh
      ref={mesh} >
      <boxBufferGeometry attach="geometry" args={[-10, 5, 5]} />
      <meshStandardMaterial attach="material" roughness={0.5} color="#575757" />
    </mesh>
  )
}

function Sphere(props) {
  // This reference will give us direct access to the mesh
  let count = 1;
  const mesh = useRef()
  let inc = 0;

  const { size, viewport } = useThree()
  //const aspect = size.width / viewport.width

  const dummy = useMemo(() => new THREE.Object3D(), [])
  //const geo = useMemo(() => new THREE.EdgesGeometry())

  const p = useMemo(() => {
    const temp = []

    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const speed   = 0.01 + Math.random() / 200
      const factor  =  20  + Math.random() * 100
      const xFactor = -50  + Math.random() * 100
      const yFactor = -50  + Math.random() * 100
      //const zFactor = -50  + Math.random() * 100
      const zFactor = 0

      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }

    return temp
  }, [count])

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [act, setAct]       = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead

  useFrame(() => {
    inc += 0.02;
    p.forEach((p, i) => {
     let { t, factor, speed, xFactor, yFactor, zFactor } = p;
     t = p.t += speed / 2;
     const a = Math.cos(t) + Math.sin(t * 1) / 10 + (Math.cos(t * 2));
     const b = Math.sin(t) + Math.cos(t * 2) / 10;
     const s = Math.cos(t);

     // Update the dummy object
     dummy.position.set(
        (p.mx / 10) * t +  Math.sin(t * 2) * (Math.sin(inc) * 2),
        (p.mx / 10) * t +  Math.cos(t * 2) * (Math.sin(inc) * 2),
        //(p.my / 10) * t +  Math.sin(t * 2) * (Math.cos(inc) * 2),
        //(p.my / 10) * t +  Math.sin(t * 3) * (t * .02),
       //(p.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10, // x
       //(p.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10, // y
       //(p.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10  // z
     )
     dummy.scale.set(.1, .1, .1);
     dummy.rotation.set(s * 5, s * 5, s * 5);
     dummy.updateMatrix();
     // And apply the matrix to the instanced item
     mesh.current.setMatrixAt(i, dummy.matrix);
    })
    //mesh.current.rotation.z += .01;
    mesh.current.instanceMatrix.needsUpdate = true;
  })

  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronBufferGeometry attach="geometry" args={[7]} />
        <meshPhongMaterial attach="material" color="white" />
      </instancedMesh>
    </>
  )
}

function Box2() {
  const ref = useRef();
  const count = 2;
  

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" roughness={0.5} color="#575757" />
    </mesh>
  )

}

function Sun() {
  const obj = [];
  const mesh = useRef();

  useFrame(() => { 
    mesh.current.rotation.y += 0.01
  })

  return (
    <mesh ref={mesh}>
      <sphereBufferGeometry attach="geometry" args={[1, 6, 6]} />
      <meshPhongMaterial attach="material" color="yellow" />
    </mesh>
  )
}

function Obj({position, c, size}) {
  const mesh = useRef();
  console.log()

  useFrame(() => { 
    mesh.current.rotation.y += 0.01
  })

  return (
    <mesh 
      position={[...position]}
      ref={mesh}
    >
      <sphereBufferGeometry attach="geometry" args={[size, 6, 6]} />
      <meshPhongMaterial attach="material" color={c} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas colorManagement
    camera={{ fov: 100, position: [0, 3, 0] }}
    >
      <ambientLight intensity={1} />
      <pointLight position={[100, 100, 100]} intensity={2.2} />
      <pointLight position={[-100, -100, -100]} intensity={5} color="red" />
      <pointLight position={[10, 10, 10]} />
      <Sun />
    </Canvas>
  )
}