"use client";

import { useRef, Suspense, useEffect } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Float, useProgress, Center } from "@react-three/drei";
import Model3D from "./Model3D";

interface ScrollAssemblyProps {
  onLoadComplete: () => void;
  onProgress: (progress: number) => void;
}

export default function ScrollAssembly({ onLoadComplete, onProgress }: ScrollAssemblyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { progress: loadProgress, active } = useProgress();

  useEffect(() => {
    onProgress(loadProgress);
    if (!active && loadProgress === 100) {
      // Delay slightly for smooth transition
      const timer = setTimeout(() => {
        onLoadComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loadProgress, active, onLoadComplete, onProgress]);

  // 1. Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress for a "snappy" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 40,
    restDelta: 0.0001
  });

  return (
    <div ref={containerRef} className="relative h-[800vh] w-full bg-spotify-black">
      {/* Sticky 3D Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas shadows camera={{ position: [0, 0, 12], fov: 40 }}>
            <color attach="background" args={["#191414"]} />
            <ambientLight intensity={1.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={1} />
            
            <Suspense fallback={null}>
              <Center>
                <Model3D progress={smoothProgress} />
              </Center>
              <ContactShadows 
                position={[0, -5, 0]} 
                opacity={0.4} 
                scale={20} 
                blur={2} 
                far={4.5} 
              />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>
        
        {/* Scrollytelling Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* SECTION 1: Intro */}
          <OverlaySection progress={scrollYProgress} range={[0, 0.2]}>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-6xl md:text-8xl mb-4">Grid Sphere</h1>
              <p className="text-xl md:text-2xl text-spotify-green uppercase tracking-[0.2em]">
                The Future is Assembled
              </p>
            </div>
          </OverlaySection>

          {/* SECTION 2: Modular Sensors */}
          <OverlaySection progress={scrollYProgress} range={[0.2, 0.4]} align="left">
            <div className="max-w-md ml-12 md:ml-24">
              <h2 className="text-5xl mb-4">Internal Precision</h2>
              <p className="text-lg text-spotify-textSec">
                Every component is crafted for modularity. As you scroll, 
                witness the complex intelligence hidden beneath the surface.
              </p>
            </div>
          </OverlaySection>

          {/* SECTION 3: Exploded View */}
          <OverlaySection progress={scrollYProgress} range={[0.4, 0.6]} align="right">
            <div className="max-w-md mr-12 md:mr-24 text-right">
              <h2 className="text-5xl mb-4 text-spotify-green">Exploded Intelligence</h2>
              <p className="text-lg text-spotify-textSec">
                40+ individual sensors and processing units working in 
                perfect harmony to monitor your farm 24/7.
              </p>
            </div>
          </OverlaySection>

          {/* SECTION 4: 5G Connected */}
          <OverlaySection progress={scrollYProgress} range={[0.6, 0.8]} align="center-bottom">
            <div className="text-center">
              <h2 className="text-5xl mb-4">Disassembled but Connected</h2>
              <p className="text-lg max-w-lg mx-auto text-spotify-textSec">
                Edge computing ensures that even when modularly separated, 
                the Grid Sphere operates as a singular brain.
              </p>
            </div>
          </OverlaySection>

          {/* SECTION 5: Final Call */}
          <OverlaySection progress={scrollYProgress} range={[0.8, 1.0]}>
            <div className="flex flex-col items-center text-center">
              <h2 className="text-6xl mb-6">Explore the Architecture</h2>
              <p className="text-xl mb-10 max-w-xl text-spotify-textSec">
                Fully exploded. Ready for inspection. Deploy the most advanced weather station ever built.
              </p>
              <button className="btn-primary pointer-events-auto">
                Order Your Unit
              </button>
            </div>
          </OverlaySection>
        </div>
      </div>
    </div>
  );
}

function OverlaySection({ 
  children, 
  progress, 
  range, 
  align = "center" 
}: { 
  children: React.ReactNode; 
  progress: any; 
  range: [number, number];
  align?: "center" | "left" | "right" | "center-bottom";
}) {
  const opacity = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [20, 0, 0, -20]);
  const scale = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0.95, 1, 1, 1.05]);

  const alignmentClasses = {
    "center": "items-center justify-center",
    "left": "items-start justify-center",
    "right": "items-end justify-center",
    "center-bottom": "items-center justify-end pb-32",
  };

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`absolute inset-0 flex flex-col p-8 ${alignmentClasses[align]}`}
    >
      {children}
    </motion.div>
  );
}
