'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function Icosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
  })
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color="#FF4D2E" roughness={0.6} metalness={0.2} />
      </mesh>
    </Float>
  )
}

function Octahedron() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.12
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.08
  })
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[3, 1, -2]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#18181B" roughness={0.8} metalness={0.1} />
      </mesh>
    </Float>
  )
}

function Torus() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
  })
  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh ref={meshRef} position={[-3, -1, -1]}>
        <torusGeometry args={[0.5, 0.15, 16, 32]} />
        <meshStandardMaterial color="#E4E4E7" roughness={0.5} metalness={0.3} />
      </mesh>
    </Float>
  )
}

interface FloatingShapesProps {
  className?: string
}

export default function FloatingShapes({ className = '' }: FloatingShapesProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return null

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} color="#FF4D2E" intensity={0.5} />
        <pointLight position={[-10, -10, -10]} color="#FFFFFF" intensity={0.2} />
        <Icosahedron />
        <Octahedron />
        <Torus />
      </Canvas>
    </div>
  )
}
