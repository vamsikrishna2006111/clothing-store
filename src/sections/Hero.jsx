import React, { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshDistortMaterial,
} from "@react-three/drei";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function FloatingShape() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

    meshRef.current.rotation.y =
      state.clock.elapsedTime * 0.35;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1.5}
      floatIntensity={2}
    >
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />

        <MeshDistortMaterial
          color="#777777"
          roughness={0.18}
          metalness={0.85}
          distort={0.35}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function Hero() {
  return (
    <section className="hero">

      <div className="hero-background">
        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>
      </div>

      <div className="hero-content">

        <motion.p
          className="hero-small-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          NEW COLLECTION · 2026
        </motion.p>

       <motion.p
  className="hero-brand"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  VK FASHIONS
</motion.p>

<motion.h1
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  WEAR YOUR
  <span>IDENTITY.</span>
</motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Discover modern fashion designed for people
          who don't follow the crowd.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Link to="/shop" className="hero-button">
            SHOP COLLECTION
            <span>→</span>
          </Link>
        </motion.div>

      </div>

      <div className="hero-3d">

        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>

          <ambientLight intensity={1.2} />

          <directionalLight
            position={[3, 4, 5]}
            intensity={3}
          />

          <Suspense fallback={null}>
            <FloatingShape />
            <Environment preset="city" />
          </Suspense>

        </Canvas>

      </div>

      <div className="hero-scroll">
        <span></span>
        SCROLL TO EXPLORE
      </div>

    </section>
  );
}

export default Hero;