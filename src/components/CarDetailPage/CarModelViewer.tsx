"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import * as THREE from "three";

function Model({ path, color }: { path: string; color: string }) {
  const { scene } = useGLTF(path);

  useEffect(() => {
    // ===== 1. RESET =====
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);
    scene.scale.set(1, 1, 1);

    // ===== 2. CENTER MODEL =====
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    scene.position.x -= center.x;
    scene.position.z -= center.z;
    scene.position.y -= box.min.y; // ground

    // ===== 3. UNIFORM SCALE =====
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 4; // ความใหญ่รถที่ต้องการ
    const scale = targetSize / maxDim;
    scene.scale.setScalar(scale);

    // ===== 4. FORCE FACE CAMERA =====
    scene.rotation.y = Math.PI;

    // ===== 5. COLOR SYSTEM =====
    scene.traverse((child: any) => {
      if (!child.isMesh) return;
      if (!(child.material instanceof THREE.MeshStandardMaterial)) return;

      const mat = child.material.clone();

      // ถ้ามี texture ให้ลบ
      mat.map = null;

      mat.color.set(color);
      mat.metalness = 0.8;
      mat.roughness = 0.3;
      mat.needsUpdate = true;

      child.material = mat;
    });
  }, [scene, color]);

  return <primitive object={scene} />;
}

// =============================
// 🏢 STUDIO ROOM
// =============================
function StudioRoom() {
  return (
    <group>
      {/* Large cyclorama wall */}
      <mesh position={[0, 5, -12]}>
        <cylinderGeometry args={[30, 30, 15, 128, 1, true]} />
        <meshStandardMaterial
          color="#151518"
          side={THREE.BackSide}
          roughness={0.6}
        />
      </mesh>

      {/* Floor at Y=0 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#1c1c20" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
}

// =============================
// 🎥 MAIN VIEWER
// =============================
interface Props {
  modelPath?: string;
  color: string;
  fullScreen?: boolean;
  onClose?: () => void;
}

export default function CarModelViewer({
  modelPath,
  color,
  fullScreen = false,
  onClose,
}: Props) {
  const finalPath = modelPath || "/models/default/default.glb";

  useEffect(() => {
    if (!fullScreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fullScreen, onClose]);

  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          : "w-full h-[430px]"
      }
    >
      <div
        className={
          fullScreen
            ? "relative w-[90vw] h-[85vh] bg-black rounded-2xl shadow-2xl"
            : "relative w-full h-full bg-black rounded-2xl shadow-md"
        }
      >
        {fullScreen && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 p-3 rounded-xl shadow hover:scale-110 transition z-50"
          >
            <IoMdClose size={20} />
          </button>
        )}

        <Canvas camera={{ position: [0, 2, 8], fov: 30 }}>
          <color attach="background" args={["#111114"]} />

          <Suspense fallback={null}>
            <StudioRoom />
            <Model path={finalPath} color={color} />
          </Suspense>

          {/* Lighting */}
          <hemisphereLight intensity={0.25} />

          <directionalLight position={[6, 8, 6]} intensity={2} castShadow />
          <directionalLight position={[-6, 4, -6]} intensity={1} />
          <directionalLight position={[0, 6, 10]} intensity={3} castShadow />
          <directionalLight position={[0, 8, 6]} intensity={2} />
          <directionalLight position={[0, 5, -8]} intensity={1.2} />

          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.5}
            scale={20}
            blur={2}
            far={20}
          />

          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={6}
            maxDistance={12}
            minPolarAngle={Math.PI / 2.4}
            maxPolarAngle={Math.PI / 2}
          />

          <EffectComposer>
            <Bloom intensity={0.05} luminanceThreshold={0.6} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
