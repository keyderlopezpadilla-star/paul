"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sky,
  Cloud,
  Clouds,
  Sparkles,
  Html,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";
import * as THREE from "three";
import {
  Terrain,
  CropField,
  TreeLine,
  Sun,
  Drone,
} from "@/components/three/scene-objects";

const SUN_POSITION: [number, number, number] = [34, 9, -26];

/* Camera drift + subtle mouse parallax. */
function CameraRig() {
  const target = useRef(new THREE.Vector3(0, 2.5, 0));

  useFrame(({ camera, clock, pointer }, delta) => {
    const t = clock.elapsedTime;
    const desiredX = Math.sin(t * 0.08) * 4 + pointer.x * 3;
    const desiredY = 6.5 + pointer.y * 1.5;
    const desiredZ = 18 + Math.cos(t * 0.08) * 2;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredX, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredY, 2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredZ, 2, delta);
    camera.lookAt(target.current);
  });
  return null;
}

/* Interactive 3D hotspot with expanding label. */
function Hotspot({
  position,
  title,
  text,
}: {
  position: [number, number, number];
  title: string;
  text: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Html position={position} center distanceFactor={18} zIndexRange={[20, 0]}>
      <div
        className="group relative select-none"
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
      >
        <button
          aria-label={title}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-white/60 bg-white/20 backdrop-blur-sm transition-transform hover:scale-110"
        >
          <span className="h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_12px_2px_rgba(52,197,106,0.9)]" />
          <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-accent-400/40" />
        </button>
        <div
          className={`absolute left-1/2 top-8 w-52 -translate-x-1/2 rounded-2xl border border-white/50 bg-white/85 p-4 text-left shadow-xl backdrop-blur-md transition-all duration-300 ${
            open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <p className="font-display text-sm font-semibold text-forest-900">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-graphite">{text}</p>
        </div>
      </div>
    </Html>
  );
}

function SceneContents() {
  return (
    <>
      <CameraRig />

      {/* Atmosphere */}
      <color attach="background" args={["#eaf3ea"]} />
      <fog attach="fog" args={["#dfeede", 34, 96]} />
      <Sky
        sunPosition={SUN_POSITION}
        turbidity={8}
        rayleigh={3}
        mieCoefficient={0.006}
        mieDirectionalG={0.9}
      />

      {/* Lighting */}
      <hemisphereLight args={["#eaf6ff", "#5b8a5f", 0.7]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={SUN_POSITION}
        intensity={2.4}
        color="#ffe4b0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={80}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      {/* World */}
      <Terrain />
      <CropField />
      <TreeLine />
      <Sun position={SUN_POSITION} />
      <Drone />

      {/* Floating pollen */}
      <Sparkles count={60} scale={[40, 12, 40]} position={[0, 5, 0]} size={3} speed={0.3} color="#fff2c8" opacity={0.7} />

      {/* Soft clouds */}
      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud seed={1} position={[-18, 16, -30]} bounds={[14, 3, 6]} volume={7} color="#ffffff" opacity={0.55} speed={0.1} />
        <Cloud seed={4} position={[20, 18, -34]} bounds={[16, 3, 6]} volume={8} color="#f3f7ff" opacity={0.45} speed={0.08} />
      </Clouds>

      {/* Interactive hotspots */}
      <Hotspot position={[-3, 2, 2]} title="Poda de precisión" text="Optimizamos cada árbol para una producción abundante y de calidad." />
      <Hotspot position={[15, 4, 0]} title="Fincas sostenibles" text="Gestión integral con métodos respetuosos con el medio ambiente." />
      <Hotspot position={[0, 6.5, -6]} title="Agricultura de datos" text="Monitorización con drones y sensores para decidir con datos." />

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  );
}

export default function FarmScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 7, 18], fov: 45, near: 0.1, far: 200 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <Suspense fallback={null}>
        <SceneContents />
      </Suspense>
    </Canvas>
  );
}
