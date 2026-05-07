"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface Model3DProps {
  progress: number;
}

export default function Model3D({ progress }: Model3DProps) {
  const { scene } = useGLTF("/main.glb");
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
          // Calculate explosion based on staggered factor
          // We use a power function to make it "pop" like anime.js
          const easedProgress = Math.pow(currentProgress, 1.5);
          const strength = easedProgress * part.factor * 8;
          
          const direction = part.pos.clone().normalize();
          if (direction.length() === 0) direction.set(0, 1, 0);

          child.position.x = part.pos.x + direction.x * strength;
          child.position.y = part.pos.y + direction.y * strength;
          child.position.z = part.pos.z + direction.z * strength;

          // Add staggered rotation
          child.rotation.x = easedProgress * part.rotationAxis.x * 4;
          child.rotation.y = easedProgress * part.rotationAxis.y * 4;
          child.rotation.z = easedProgress * part.rotationAxis.z * 4;
        }
      }
    });

    // Constant slow drift
    modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.1 + (currentProgress * 2);
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={1.5} 
      position={[0, -1, 0]} 
    />
  );
}

// Preload the model
useGLTF.preload("/main.glb");
