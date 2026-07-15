import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function GlowingBox({ position, color, speed }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * speed) * 0.4;
      meshRef.current.rotation.y = t * speed * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
        {/* Wireframe overlay */}
        <mesh>
          <boxGeometry args={[1.42, 1.42, 1.42]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
        </mesh>
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-3, 2, 4]} intensity={3} color="#6366f1" distance={10} />
      <pointLight position={[3, -2, -4]} intensity={2} color="#3b82f6" distance={10} />
      <pointLight position={[0, 3, 0]} intensity={2} color="#8b5cf6" distance={10} />

      <GlowingBox position={[-2.5, 0.5, 0]} color="#6366f1" speed={0.4} />
      <GlowingBox position={[0, -0.3, 1]} color="#3b82f6" speed={0.3} />
      <GlowingBox position={[2.5, 0.5, -0.5]} color="#8b5cf6" speed={0.35} />
    </>
  );
}

export default function Interactive3DShowcase() {
  return (
    <section className="relative py-28 px-6 overflow-hidden bg-[#050505]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
              Next-Gen Architecture
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              Build with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400">
                Modular Intelligence
              </span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
              Every component WabiAI generates is a self-contained, reusable module. 
              Like building blocks, they snap together to form complex applications — 
              each one optimized, tested, and production-ready.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Components', value: '500+' },
                { label: 'Frameworks', value: '12+' },
                { label: 'Avg Build Time', value: '< 60s' },
                { label: 'Uptime SLA', value: '99.9%' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[400px] md:h-[500px] w-full"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              </div>
            }>
              <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}
              >
                <Scene />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
