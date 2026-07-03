"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sky,
  Cloud,
  Clouds,
  Sparkles,
  Html,
  AdaptiveEvents,
  PerformanceMonitor,
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

/**
 * Shared parallax tilt, normalized to [-1, 1]. Fed by device orientation
 * (gyroscope) on mobile and combined with the pointer/touch position so the
 * camera reacts on every device — mouse, touch drag, or tilting the phone.
 */
const tilt = { x: 0, y: 0 };

export type SceneQuality = "high" | "low";

/* Camera drift + pointer/gyro parallax. */
function CameraRig() {
  const target = useRef(new THREE.Vector3(0, 2.5, 0));

  useFrame(({ camera, clock, pointer }, delta) => {
    const t = clock.elapsedTime;
    // pointer (mouse or touch on the canvas) + gyroscope tilt
    const px = THREE.MathUtils.clamp(pointer.x + tilt.x, -1.4, 1.4);
    const py = THREE.MathUtils.clamp(pointer.y + tilt.y, -1.4, 1.4);
    const desiredX = Math.sin(t * 0.08) * 4 + px * 3;
    const desiredY = 6.5 + py * 1.5;
    const desiredZ = 18 + Math.cos(t * 0.08) * 2;
    // clamp the damp factor so slow mobile frames don't overshoot
    const k = Math.min(delta, 0.05);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredX, 2, k);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredY, 2, k);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredZ, 2, k);
    camera.lookAt(target.current);
  });
  return null;
}

/* Interactive 3D hotspot — hover on desktop, tap to toggle on touch. */
function Hotspot({
  position,
  title,
  text,
  touch,
}: {
  position: [number, number, number];
  title: string;
  text: string;
  touch: boolean;
}) {
  const [open, setOpen] = useState(false);

  const hoverHandlers = touch
    ? {}
    : {
        onPointerEnter: () => setOpen(true),
        onPointerLeave: () => setOpen(false),
      };

  return (
    <Html position={position} center distanceFactor={18} zIndexRange={[20, 0]}>
      <div className="group relative select-none" {...hoverHandlers}>
        <button
          aria-label={title}
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
          className="flex items-center justify-center rounded-full border border-white/60 bg-white/20 backdrop-blur-sm transition-transform hover:scale-110"
          // larger tap target on touch devices
          style={{ width: touch ? 34 : 24, height: touch ? 34 : 24 }}
        >
          <span className="h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_12px_2px_rgba(52,197,106,0.9)]" />
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400/40" />
        </button>
        <div
          className={`absolute left-1/2 top-9 w-48 -translate-x-1/2 rounded-2xl border border-white/50 bg-white/90 p-4 text-left shadow-xl backdrop-blur-md transition-all duration-300 ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <p className="font-display text-sm font-semibold text-forest-900">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-graphite">{text}</p>
        </div>
      </div>
    </Html>
  );
}

function SceneContents({
  quality,
  touch,
}: {
  quality: SceneQuality;
  touch: boolean;
}) {
  const low = quality === "low";

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
      <ambientLight intensity={low ? 0.5 : 0.35} />
      <directionalLight
        position={SUN_POSITION}
        intensity={2.4}
        color="#ffe4b0"
        castShadow={!low}
        shadow-mapSize={low ? [512, 512] : [1024, 1024]}
        shadow-camera-far={80}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      {/* World — lighter crop field on mobile for smooth framerates */}
      <Terrain />
      <CropField rows={low ? 16 : 26} cols={low ? 16 : 26} />
      <TreeLine />
      <Sun position={SUN_POSITION} />
      <Drone />

      {/* Floating pollen */}
      <Sparkles
        count={low ? 26 : 60}
        scale={[40, 12, 40]}
        position={[0, 5, 0]}
        size={3}
        speed={0.3}
        color="#fff2c8"
        opacity={0.7}
      />

      {/* Soft clouds (single cloud on mobile) */}
      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud
          seed={1}
          position={[-18, 16, -30]}
          bounds={[14, 3, 6]}
          volume={low ? 5 : 7}
          color="#ffffff"
          opacity={0.55}
          speed={0.1}
        />
        {!low && (
          <Cloud
            seed={4}
            position={[20, 18, -34]}
            bounds={[16, 3, 6]}
            volume={8}
            color="#f3f7ff"
            opacity={0.45}
            speed={0.08}
          />
        )}
      </Clouds>

      {/* Interactive hotspots */}
      <Hotspot touch={touch} position={[-3, 2, 2]} title="Poda de precisión" text="Optimizamos cada árbol para una producción abundante y de calidad." />
      <Hotspot touch={touch} position={[15, 4, 0]} title="Fincas sostenibles" text="Gestión integral con métodos respetuosos con el medio ambiente." />
      <Hotspot touch={touch} position={[0, 6.5, -6]} title="Agricultura de datos" text="Monitorización con drones y sensores para decidir con datos." />

      <AdaptiveEvents />
    </>
  );
}

export default function FarmScene({
  quality = "high",
  touch = false,
  paused = false,
}: {
  quality?: SceneQuality;
  touch?: boolean;
  paused?: boolean;
}) {
  const [dpr, setDpr] = useState(quality === "low" ? 1.3 : 1.75);

  // Device-orientation parallax (mobile). Best-effort: on Android it works
  // immediately; on iOS it starts once motion permission is granted.
  useEffect(() => {
    if (!touch || typeof window === "undefined") return;
    const handle = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // left/right [-90, 90]
      const beta = e.beta ?? 0; // front/back [-180, 180]
      tilt.x = THREE.MathUtils.clamp(gamma / 35, -1, 1);
      tilt.y = -THREE.MathUtils.clamp((beta - 45) / 35, -1, 1);
    };
    window.addEventListener("deviceorientation", handle);
    return () => {
      window.removeEventListener("deviceorientation", handle);
      tilt.x = 0;
      tilt.y = 0;
    };
  }, [touch]);

  const low = quality === "low";

  return (
    <Canvas
      shadows={!low}
      frameloop={paused ? "never" : "always"}
      dpr={dpr}
      gl={{
        antialias: !low,
        powerPreference: "high-performance",
        alpha: false,
      }}
      camera={{ position: [0, 7, 18], fov: low ? 58 : 45, near: 0.1, far: 200 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      {/* Drop resolution automatically if the device struggles. */}
      <PerformanceMonitor
        onDecline={() => setDpr((d) => Math.max(1, d - 0.25))}
        onIncline={() => setDpr((d) => Math.min(low ? 1.5 : 2, d + 0.25))}
      />
      <Suspense fallback={null}>
        <SceneContents quality={quality} touch={touch} />
      </Suspense>
    </Canvas>
  );
}
