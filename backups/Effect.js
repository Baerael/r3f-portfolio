import * as THREE from 'three'
import React, { useRef, useState, useMemo, useCallback, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, Dom, extend } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'

extend({ EffectComposer, ShaderPass, RenderPass,  UnrealBloomPass, FilmPass  })

function Ef() {

  const composer = useRef()
  const { scene, gl, size, camera } = useThree()
  const aspect = useMemo(() => new THREE.Vector2(512, 512), [])

  useFrame(() => composer.current.render(), 1)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[aspect, .5, 1, 0]} />
    </effectComposer>
  )
}