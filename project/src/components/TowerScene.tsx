import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function TowerModel({ currentFloor }: { currentFloor: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      position={[0, -1, 0]}
    >
      <mesh ref={mesh} scale={1.5}>
        <boxGeometry args={[1, currentFloor / 25, 1]} />
        <meshStandardMaterial
          color="#1a365d"
          metalness={0.8}
          roughness={0.2}
          emissive="#0f172a"
          emissiveIntensity={0.2}
        />
        {/* Highlight current floor */}
        <mesh position={[0, (currentFloor / 25) / 2 - (currentFloor / 100) * 2, 0.51]}>
          <planeGeometry args={[1.01, 0.04]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      </mesh>
    </Float>
  );
}

export default function TowerScene({ currentFloor }: { currentFloor: number }) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <TowerModel currentFloor={currentFloor} />
      </Canvas>
    </div>
  );
}