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

//==========================o
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

      //test
      console.log(temp)
    return temp
  }, [count])
  //test
  console.log(p)

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [act, setAct]       = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead

  useFrame(() => {
    inc += 0.02;
    p.forEach((p, i) => {
     let { t, factor, speed, xFactor, yFactor, zFactor } = p; // destruc
     t = p.t += speed / 2;
     const a = Math.cos(t) + Math.sin(t * 1) / 10 + (Math.cos(t * 2));
     const b = Math.sin(t) + Math.cos(t * 2) / 10;
     const s = Math.cos(t);

     // Update the dummy object
     dummy.position.set(
        (p.mx / 10) * t +  Math.sin(t * 2) * (Math.sin(inc) * 2),
        (p.mx / 10) * t +  Math.cos(t * 2) * (Math.sin(inc) * 2),
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

function T1() {
return (
  <mesh
    visible
    userData={{ hello: 'world' }}
    position={new THREE.Vector3(0, 0, 0)}
    rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
    geometry={new THREE.sphereBufferGeometry(1, 16, 16)}
    material={new THREE.PointsMaterial({ color: 'red', size: 0.2 })}
  />
)
}

function Obj2({color}) {
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[1, 10, 10]} />
      <meshPhongMaterial attach="material" color={color} />
    </mesh>
  )
}


function Obj() {
  const colors = ["red", "blue"]

  let time = 0;
  const mesh = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const p = [
    {     mx: -1, my: 0, mz: 0
    }, {  mx:  0, my: 0, mz: 0 }
  ];

  useFrame(() => { 
    time += 0.01
    // i will inc to size of array
    p.forEach((p, i) => {
      dummy.position.set(
        p.mx, p.my, p.mz
     )
     dummy.scale.set(.1, .1, .1);
     dummy.rotation.set(0, time, 0)
     dummy.updateMatrix();

     // And apply the matrix to the instanced item
     mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
    mesh.current.rotation.y += 0.01 // this 
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, 2]}>
      <sphereBufferGeometry attach="geometry" args={[1, 10, 10]} />
      <meshPhongMaterial attach={new THREE.EdgesGeometry() } color="yellow" />
    </instancedMesh>
  )
}

export default function App() {
  return (
    <>
    <Canvas 

      colorManagement
      camera={{ fov: 75, position: [0, 10, 0] }}
    >
      <ambientLight intensity={3} />
      <pointLight color="white" position={[0, 0, 0]} intensity={2.2} />
      <T1 />
    </Canvas>
    </>
  )
}
/*
const p = [
  {     mx: -2, my: 0, mz: -2
  }, {  mx: -2, my: 0, mz: -1.5
  }, {  mx: -2, my: 0, mz: -1
  }, {  mx: -2, my: 0, mz: -.5 },

  {     mx: -1.8, my: 0, mz: -1.2
  }, {  mx: -1.6, my: 0, mz: -1.2 
  }, {  mx: -1.4, my: 0, mz: -1.2 
  }, {  mx: -1.2, my: 0, mz: -1.2 },

  {     mx: -1, my: 0, mz: -2
  }, {  mx: -1, my: 0, mz: -1.5
  }, {  mx: -1, my: 0, mz: -1
  }, {  mx: -1, my: 0, mz: -.5 },

  {     mx: 1, my: 0, mz: -2
  }, {  mx: 1, my: 0, mz: -1.5
  }, {  mx: 1, my: 0, mz: -1
  }, {  mx: 1, my: 0, mz: -.5 }
];
*/

import * as THREE from 'three'
import React, { useRef, useState, useMemo, useCallback, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, Dom } from 'react-three-fiber'
import './App.css';
import { BoxHelper, SpotLightHelper, PointLightHelper, TextureLoader } from "three"
import { useHelper } from '@react-three/drei'
import lerp from 'lerp'

import tx from './texture/wall.jpg'
import tx2 from './texture/wall2.png'
import bl from './bold.blob';

function B({color, pos, speed}) {
  const ref = useRef()
  let time = 0;
  useFrame(() => {
  })
  return (
  <mesh
    position={pos}
    ref={ref}
  >
    <boxBufferGeometry attach="geometry" />
    <meshPhongMaterial attach="material" color={color} />
  </mesh>
  )
}
const r = () => Math.max(0.2, Math.random())

function Scene() {
  let time = 0
  const radius = 10
  const count = 3;
  const colors = ["red", "green", "blue"];

  const ref = useRef()


  const part = useMemo(
    () => 
      new Array(count).fill().map((index) => {
        const a = Math.random() * 3 + 3
        const b = Math.random() * 3 + 3
        const c = Math.random() * 3 + 3
        //const pos = new THREE.Vector3(Math.sin(0) * radius * r(), Math.cos(0) * radius * r(), 0)
        const pos = new THREE.Vector3(a,b,c)
        /*
        const points = new Array(30).fill().map((_, index) => {
          const angle = (index / 20) * Math.PI * 2
          return pos.add(a,a,a).clone()
        })
        */
        //const pos = new THREE.Vector3(a,a,a)
      const select = Math.floor(Math.random() * 3)
      return {
        color: colors[select],
        speed: Math.max(0.001, 0.4 * Math.random()),
        pos
      }
    }), 
    [count, colors]
  )
  console.log(part)

  useFrame(() => {
    time += 0.01
  })

  return (
    <group ref={ref}>
      <group>
        {part.map((props, index) => (
          <B key={index} {...props} />
        ))}
      </group>
      <gridHelper args={[30, 30, 30]} />
    </group>
    /*
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshPhongMaterial attach="material" color="grey" />
      <gridHelper args={[30, 30, 30]} />
    </mesh>
    */
  )
}
function Plane() {
  const ref = useRef()

  useFrame(() => {
  })

  return (
    <>
      <mesh 
        ref={ref}
        position={[0, 0, -20]}
      >
        <planeBufferGeometry attach="geometry" args={[100,50,2]}/>
        <meshPhongMaterial attach="material" color="floralwhite" />
      </mesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}

function Name({text, y}) {
  let time = 0;
  const ref = useRef()
  const size = .5
  const img = useLoader(TextureLoader, tx2)
  const font = useLoader(THREE.FontLoader, bl)
  const config = useMemo(
    () => ({ font, size: 40, height: 30, curveSegments: 32, bevelEnabled: true, bevelThickness: 10, bevelSize: 2, bevelOffset: 0, bevelSegments: 10 }),
    [font]
  )
  useFrame(() => {
  })

  return (
    <>
      <mesh 
        ref={ref}
        position={[-15, y, 2]}
        rotation={[0, 0.5, 0]}
        scale={[0.1 * size, 0.1 * size, 0.1]}
      >
        <textGeometry attach="geometry" args={[text, config]} />
        <meshNormalMaterial attach="material" color="grey"/>
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
      shadowMap
      camera={{ fov: 75, position: [0, 5, 20] }}
    >
      <Suspense fallback={<Dom center className="loading" children="Loading..." />}>
      <ambientLight intensity={3} />
      <pointLight color="red" position={[0, 50, 0]} intensity={10} />
      <pointLight color="red" position={[50, 50, 0]} intensity={2.2} />
      <Name text="BENJAMIN" y={5}/>
      <Name text="PRATTE"   y={0}/>
      <Plane />
      </Suspense>
    </Canvas>
    </>
  )
}

/*
function Plane() {
  const ref = useRef()
  const img = useLoader(TextureLoader, tx2)
  const font = useLoader(THREE.FontLoader, bl)

  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })

  return (
    <>
      <mesh 
        ref={ref}
        position={[0, 1, 0]}
      >
        <boxBufferGeometry attach="geometry" args={[5,2,2]}/>
        <meshPhongMaterial attach="material" color="grey" map={img} />
      </mesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}
*/


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
      <mesh ref={ref} rotation={[0,0,0]} position={[0, 0, 0]}>
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
  const [toggle, setToggle] = useState(false)

  const config = useMemo(
    () => ({ font, size:     40, height:        1, 
             curveSegments:  32, bevelEnabled:  true, 
             bevelThickness: 10, bevelSize:     2, 
             bevelOffset:     0, bevelSegments: 10 }),
    [font]
  )
  useFrame(() => {
    ref.current.position.y = state.y;
    if (toggle) {
      console.log(toggle)
      console.log(ref.current.set)
    } else {
      ref.current.size = size
    }
  })

  console.log("font-render")

  return (
    <>
      <mesh 
        ref={ref}
        position={[-4, y, 0]}
        rotation={[0,0,0]}
        scale={[0.1 * size, 0.1 * size, 0.1]}
        onWheel={(e) => console.log("event")}
        onClick={(e) => setToggle(!toggle)}
      >
        <textGeometry attach="geometry" args={toggle ? ["THIS", config] : ["THAT", config]} />
        <meshPhongMaterial attach="material" color="grey"/>
      </mesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}

let s = 0.1
let string = "CONTACT"
function Contact({text}) {
  const ar = ["STRING1", "STRING2"]
  const count = 1;
  const ref = useRef()
  const [active, setActive] = useState(false)
  const [s1, setS1] = useState("THIS")
  const f = useRef("THIS")

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
      const size = .1
      temp.push({size, mx: -12, my: 0, mz: 0})
    }

    return temp
  }, [count])

  let time = 0;

  useFrame(() => {
    time += 0.01
    p.forEach((p, i) => {
     let { size } = p;
     if (active) {
      dummy.position.set(
        p.mx,
        p.my + Math.sin(time),
        p.mz + Math.sin(time)
      )
     } else {
      // Update the dummy object
      dummy.position.set(
        p.mx,
        p.my,
        p.mz
      )
     }

     dummy.scale.set(s, s, s);
     dummy.updateMatrix();

     // And apply the matrix to the instanced item
     ref.current.setMatrixAt(i, dummy.matrix);
    })
    //mesh.current.rotation.z += .01;
    ref.current.instanceMatrix.needsUpdate = true;
  })

  const onClick = e => {
    setActive(!active) 
    //active ? s = .1 : s = .2
    if (active) {
      console.log(active)
      setS1("THATTER")
      s = 0.1
    } else {
      console.log(active)
      s = 0.12
    }
  }
  console.log('rerender')



  return (
    <>
      <instancedMesh 
        ref={ref} args={[null, null, count]}
        onClick={onClick}
      >
        <textGeometry attach="geometry" args={[s1, config]} />
        <meshPhongMaterial attach="material" color="grey"/>
      </instancedMesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}

function Test() {
  return (
    <Text position={[0, 0, 0]}>Test</Text>
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
        <Contact />
      </Suspense>
    </Canvas>
    </>
  )
}