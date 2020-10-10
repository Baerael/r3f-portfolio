import React, { useEffect, useRef, useState } from 'react'
import { useThree, useFrame, useResource } from 'react-three-fiber'
import { Text } from '@react-three/drei'

import galx from './texture/galx.png'
import imgdb from './texture/imgdb.png'

import Font from './Font.js'
import Portal from './Portal.js'
import Btn from './Portal.js'


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

  let [x,y,z] = pos

  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer'
      console.log("fire")
    } else {
      document.body.style.cursor = ''
    }
  })

  return (
    <group
      onPointerOver={(e) => (setHover(true))}
      onPointerOut={(e) =>  (setHover(false))}
      onClick={(e) => link ? window.open(link) : null}
      scale={[.9,.9,.9]}
    >
    <mesh ref={ref} 
      position={[...pos]} 
      castShadow
    >
      <octahedronBufferGeometry attach="geometry" args={[1]} />
      <meshPhongMaterial attach="material" color={hovered ? 'hotpink' : 'floralwhite'}/>
    </mesh>
    <Text scale={[9,9,9]} position={[pos[0] + 7,pos[1], pos[2]]} color={hovered ? 'hotpink' : 'floralwhite'}>{text}</Text>
    </group>
  )
}


function Setup({mouse}) {
  const {size} = useThree()

  let fontPos1 = [-4, 7, 0]
  let fontPos2 = [-1, 4, 0]
  let fontScale = [.04,.04,.04]
  let btnPos1 = [4, -1, -2]
  let btnPos2 = [4, -4, -2]
  let portalPos1 = [-15, 4, -10]
  let portalPos2 = [-15, -10, -10]
  let portalScale = .9

  if (size.width < 1250) {
    fontPos1    = [-2, 11, -2]
    fontPos2    = [-3, 10, -2]
    fontScale = [.02,.02,.02]
    btnPos1     = [-4, 9, -2]
    btnPos2     = [-4, 6, -2]
    portalPos1  = [0, 0, -6]
    portalPos2  = [0, -10, -6]
    portalScale = .7
    //console.log(pos1)
  }


  return (
    <>
      <Font text="BENJAMINS" pos={fontPos1} scale={fontScale}/>
      <Font text="DEVELOPMENT" pos={fontPos2} scale={fontScale} />
      <Button pos={btnPos1} text="Github" link="https://github.com/adhebadhe"/>
      <Button pos={btnPos2} text="bendpratte@gmail.com" link="https://www.youtube.com/watch?v=HSmKiws-4NU"/>
      <Plane s={[1000, 1000]} pos={[0, 0, -15]} color="#272730"/>
      <Lights />
      <Portal mouse={mouse} pos={portalPos1} scale={portalScale} image={galx} link="https://github.com/adhebadhe/galaxian"/>
      <Portal mouse={mouse} pos={portalPos2} scale={portalScale} image={imgdb} link="https://github.com/adhebadhe/imagedb-backend"/>
    </>
  )
}


export default Setup;