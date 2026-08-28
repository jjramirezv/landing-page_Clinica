"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { Suspense, useMemo } from "react";

function MedicalCross() {
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      <group rotation={[0.3, 0.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.55, 1.6, 0.55]} />
          <meshStandardMaterial
            color="#0891b2"
            metalness={0.3}
            roughness={0.25}
            emissive="#0891b2"
            emissiveIntensity={0.15}
          />
        </mesh>
        <mesh castShadow>
          <boxGeometry args={[1.6, 0.55, 0.55]} />
          <meshStandardMaterial
            color="#0891b2"
            metalness={0.3}
            roughness={0.25}
            emissive="#0891b2"
            emissiveIntensity={0.15}
          />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitParticles() {
  const points = useMemo(() => {
    const count = 60;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 1.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#38bdf8"
        sizeAttenuation
        transparent
        opacity={0.85}
      />
    </points>
  );
}

function GlowSphere() {
  return (
    <Sphere args={[1.35, 64, 64]} position={[0, 0, -0.6]}>
      <MeshDistortMaterial
        color="#5eead4"
        distort={0.35}
        speed={1.6}
        roughness={0.2}
        metalness={0.1}
        transparent
        opacity={0.35}
      />
    </Sphere>
  );
}

export function HeroScene() {
  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} />
        <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#10b981" />
        <Suspense fallback={null}>
          <GlowSphere />
          <MedicalCross />
          <OrbitParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
