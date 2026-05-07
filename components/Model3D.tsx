"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface Model3DProps {
  progress: number;
}

export default function Model3D({ progress }: Model3DProps) {
  const { scene } = useGLTF("/main-1.glb");
  const modelRef = useRef<THREE.Group>(null);

  // Store initial positions and randomized factors for staggering
  const partsData = useMemo(() => {
    const data: { 
      uuid: string; 
      pos: THREE.Vector3; 
      factor: number;
      rotationAxis: THREE.Vector3;
    }[] = [];
    
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        data.push({
          uuid: child.uuid,
          pos: child.position.clone(),
          // Randomized explosion factor for staggered look
          factor: 0.5 + Math.random() * 2.5,
          rotationAxis: new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
          ).normalize()
        });
      }
    });
    return data;
  }, [scene]);

  useFrame((state) => {
    if (!modelRef.current) return;

    const currentProgress = typeof progress === 'number' ? progress : progress.get();

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const part = partsData.find((d) => d.uuid === child.uuid);
        if (part) {
          // Smoother, more controlled easing for the explosion
          // 0 = Assembled, 1 = Exploded
          const easedProgress = currentProgress; 
          const strength = easedProgress * part.factor * 2.5; // Reduced from 8 to 2.5 for control
          
          // Move outward from the local center
          const direction = part.pos.clone().normalize();
          if (direction.length() === 0) direction.set(0, 1, 0);

          child.position.x = part.pos.x + direction.x * strength;
          child.position.y = part.pos.y + direction.y * strength;
          child.position.z = part.pos.z + direction.z * strength;

          // Subtle, controlled rotation instead of chaotic spinning
          child.rotation.x = easedProgress * part.rotationAxis.x * 0.5;
          child.rotation.y = easedProgress * part.rotationAxis.y * 0.5;
        }
      }
    });

    // Slow, professional rotation for the entire group
    modelRef.current.rotation.z = currentProgress * 0.5; // Slight tilt
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={1.8} 
      position={[0, 0, 0]} 
      rotation={[Math.PI / 2, 0, 0]} // Corrected upright rotation (adjusting based on common GLB issues)
    />
  );
}

// Preload the model
useGLTF.preload("/main-1.glb");
