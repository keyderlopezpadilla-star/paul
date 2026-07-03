"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const dummy = new THREE.Object3D();

/** Deterministic pseudo-random in [0,1) — pure, so safe during render & SSR. */
function hash(n: number): number {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/* ------------------------------------------------------------------ */
/* Rolling terrain — a segmented plane displaced with layered sines.   */
/* ------------------------------------------------------------------ */
export function Terrain() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(120, 120, 80, 80);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const h =
        Math.sin(x * 0.08) * 1.4 +
        Math.cos(y * 0.06) * 1.2 +
        Math.sin((x + y) * 0.15) * 0.5;
      // keep the central "field" flatter so crop rows sit nicely
      const flatten = Math.max(0, 1 - Math.hypot(x, y) / 26);
      pos.setZ(i, h * (1 - flatten * 0.8));
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial color="#3f8a5b" roughness={1} metalness={0} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Crop field — instanced blades swaying in the wind.                  */
/* ------------------------------------------------------------------ */
export function CropField({
  rows = 26,
  cols = 26,
  spacing = 0.85,
}: {
  rows?: number;
  cols?: number;
  spacing?: number;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = rows * cols;

  const data = useMemo(() => {
    const arr: { x: number; z: number; h: number; phase: number }[] = [];
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push({
          x: (c - cols / 2) * spacing + (hash(i * 2.1) - 0.5) * 0.2,
          z: (r - rows / 2) * spacing + (hash(i * 3.7 + 1) - 0.5) * 0.2,
          h: 0.7 + hash(i * 5.3 + 2) * 0.6,
          phase: hash(i * 7.9 + 3) * Math.PI * 2,
        });
        i++;
      }
    }
    return arr;
  }, [rows, cols, spacing]);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const d = data[i];
      const sway = Math.sin(t * 1.5 + d.phase + d.x * 0.3) * 0.18;
      dummy.position.set(d.x, d.h / 2, d.z);
      dummy.rotation.set(0, 0, sway);
      dummy.scale.set(1, d.h, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} castShadow>
      <coneGeometry args={[0.12, 1, 5]} />
      <meshStandardMaterial color="#5bbf76" roughness={0.9} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/* Low-poly tree with foliage that sways gently.                       */
/* ------------------------------------------------------------------ */
function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const foliage = useRef<THREE.Group>(null);
  const phase = useMemo(
    () => hash(position[0] * 12.9 + position[2] * 78.2) * Math.PI * 2,
    [position],
  );

  useFrame((state) => {
    if (foliage.current) {
      foliage.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8 + phase) * 0.05;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.14, 0.2, 1.8, 6]} />
        <meshStandardMaterial color="#6b4a2f" roughness={1} />
      </mesh>
      <group ref={foliage} position={[0, 1.8, 0]}>
        <mesh castShadow position={[0, 0.4, 0]}>
          <coneGeometry args={[1, 1.6, 8]} />
          <meshStandardMaterial color="#2f7d4f" roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0, 1.1, 0]}>
          <coneGeometry args={[0.75, 1.3, 8]} />
          <meshStandardMaterial color="#37975e" roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0, 1.7, 0]}>
          <coneGeometry args={[0.5, 1, 8]} />
          <meshStandardMaterial color="#3fa869" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

export function TreeLine() {
  const trees = useMemo(
    () => [
      { p: [-14, 0, -12], s: 1.2 },
      { p: [-16, 0, -4], s: 1 },
      { p: [-13, 0, 6], s: 1.4 },
      { p: [15, 0, -10], s: 1.1 },
      { p: [17, 0, 0], s: 1.3 },
      { p: [14, 0, 9], s: 1 },
      { p: [-9, 0, 15], s: 1.1 },
      { p: [8, 0, 15], s: 1.2 },
    ],
    [],
  );
  return (
    <>
      {trees.map((t, i) => (
        <Tree key={i} position={t.p as [number, number, number]} scale={t.s} />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Sun — emissive sphere providing the golden-hour glow.               */
/* ------------------------------------------------------------------ */
export function Sun({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[4, 32, 32]} />
      <meshBasicMaterial color="#ffe6a8" toneMapped={false} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Drone — a low-poly quadcopter that patrols the field, rotors spin.  */
/* ------------------------------------------------------------------ */
export function Drone() {
  const group = useRef<THREE.Group>(null);
  const rotors = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      const radius = 11;
      group.current.position.set(
        Math.cos(t * 0.25) * radius,
        5 + Math.sin(t * 0.6) * 0.6,
        Math.sin(t * 0.25) * radius,
      );
      // face direction of travel
      group.current.rotation.y = -t * 0.25 + Math.PI / 2;
      group.current.rotation.z = Math.sin(t * 0.25) * 0.15;
    }
    if (rotors.current) rotors.current.rotation.y = t * 40;
  });

  const arm = (x: number, z: number, key: number) => (
    <group key={key} position={[x, 0, z]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.15, 8]} />
        <meshStandardMaterial color="#14171a" />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.02, 20]} />
        <meshStandardMaterial color="#2563eb" transparent opacity={0.28} />
      </mesh>
    </group>
  );

  return (
    <group ref={group}>
      {/* body */}
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.22, 0.5]} />
        <meshStandardMaterial color="#20242a" roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0, -0.14, 0]}>
        <boxGeometry args={[0.24, 0.1, 0.24]} />
        <meshStandardMaterial color="#34c56a" emissive="#34c56a" emissiveIntensity={1.5} />
      </mesh>
      {/* arms + rotors */}
      <group ref={rotors}>
        {[
          [0.55, 0.4],
          [-0.55, 0.4],
          [0.55, -0.4],
          [-0.55, -0.4],
        ].map(([x, z], i) => arm(x, z, i))}
      </group>
    </group>
  );
}
