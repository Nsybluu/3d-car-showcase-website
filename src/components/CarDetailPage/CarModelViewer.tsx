"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useState, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import * as THREE from "three";
import * as React from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

// ===============================
// Per-model body material names (lowercase)
// ===============================
const MODEL_BODY_MATERIALS: Record<string, string[]> = {
  "720spider": ["car_paint"],
  "aston_martin_db11": ["amdb11"],
  "carrera4s": ["paint"],
  "cls53": ["body"],
  "default": ["wire_006134113"],
  "g63": ["bodypaint"],
  "fordeverest": ["carpaint"],
  "lpi800": ["material.008", "material.004", "material.009", "material.012", "material.042"],
  "m3touring81": [
    "m3g81law_coloured_gloss",
    "m3g81law",
  ],
  "m4": ["m4car_body1", "m4car_hood1", "m4car_bodykit1"],
  "maybach": ["car_paint", "car_paint.001", "car_paint_with_flakes"],
  "nissancab2021": ["carpaint"],
  "r34": ["material.001"],
  "r35": ["r35_paint"],
  "supra": ["body.012"],
  "toyotafortuner": ["carpaint"],
  "typer": [
    "honda_civictyperewardrecycled_2023paint_material",
  ],
};

// Mesh node names to EXCLUDE from color change (lowercase substrings)
const MODEL_MESH_EXCLUDES: Record<string, string[]> = {
  "m3touring81": ["grille", "intercooler", "exh_tip", "diffuser", "headlight"],
};

function getModelKey(path: string): string | null {
  const lower = path.toLowerCase();
  for (const key of Object.keys(MODEL_BODY_MATERIALS)) {
    if (lower.includes(key)) return key;
  }
  return null;
}

function isBodyMaterialHeuristic(matName: string): boolean {
  const name = matName.toLowerCase();
  return (
    name.includes("carpaint") ||
    name.includes("car_paint") ||
    name.includes("bodypaint") ||
    name.includes("body_paint") ||
    (name.includes("paint") &&
      !name.includes("interior") &&
      !name.includes("plastic") &&
      !name.includes("urus") &&
      !name.includes("generic")) ||
    (name.includes("coloured") &&
      !name.includes("interior"))
  );
}

function isBodyMaterial(matName: string, path: string, forceHeuristic = false): boolean {
  const name = matName.toLowerCase();

  if (!forceHeuristic) {
    const key = getModelKey(path);
    if (key) {
      const list = MODEL_BODY_MATERIALS[key];
      return list.some((m) => name === m || name.startsWith(m + "."));
    }
  }

  return isBodyMaterialHeuristic(name);
}

// Compute bounding box from mesh geometry only
function getMeshBounds(object: THREE.Object3D): THREE.Box3 {
  const box = new THREE.Box3();
  object.updateMatrixWorld(true);
  object.traverse((child: any) => {
    if (child.isMesh && child.geometry && child.geometry.attributes.position) {
      const geom = child.geometry;
      geom.computeBoundingBox();
      if (geom.boundingBox) {
        const b = geom.boundingBox.clone();
        b.applyMatrix4(child.matrixWorld);
        box.union(b);
      }
    }
  });
  return box;
}

function Model({ path, color }: { path: string; color: string }) {
  const { scene } = useGLTF(path);

  const model = React.useMemo(() => {
    if (!scene) return null;

    const clone = scene.clone(true);
    clone.updateMatrixWorld(true);

    // 1️⃣ FIX AXIS
    let box = getMeshBounds(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);

    if (size.y > size.x && size.y > size.z) {
      clone.rotation.x = -Math.PI / 2;
      clone.updateMatrixWorld(true);
      box = getMeshBounds(clone);
      box.getSize(size);
    }

    // 2️⃣ SCALE
    const targetLength = 3.8;
    const longestHorizontal = Math.max(size.x, size.z);
    const scaleFactor = targetLength / longestHorizontal;
    clone.scale.setScalar(scaleFactor);

    clone.updateMatrixWorld(true);
    box = getMeshBounds(clone);
    box.getSize(size);
    box.getCenter(center);

    // 3️⃣ CENTER
    clone.position.x -= center.x;
    clone.position.z -= center.z;

    // 4️⃣ SUV / กระบะ
    const lower = path.toLowerCase();
    if (
      lower.includes("fortuner") ||
      lower.includes("everest") ||
      lower.includes("g63") ||
      lower.includes("nissancab")
    ) {
      clone.scale.multiplyScalar(1.1);
    }

    // 5️⃣ FINAL GROUNDING
    clone.position.set(0, 0, 0);
    clone.updateMatrixWorld(true);
    box = new THREE.Box3().setFromObject(clone);
    const groundCenter = new THREE.Vector3();
    box.getCenter(groundCenter);
    clone.position.x = -groundCenter.x;
    clone.position.z = -groundCenter.z;
    clone.position.y = -box.min.y;

    return clone;
  }, [scene, path]);

  // 🎨 เปลี่ยนสี
  React.useEffect(() => {
    if (!model) return;

    const applyColor = (child: any) => {
      const mat = child.material;
      child.material = mat.clone();
      child.material.color = new THREE.Color(color);
      child.material.map = null;
      child.material.emissiveMap = null;
      child.material.aoMap = null;
      if ('metalness' in child.material) child.material.metalness = 0.4;
      if ('roughness' in child.material) child.material.roughness = 0.25;
      if ('clearcoat' in child.material) child.material.clearcoat = 0.8;
      if ('clearcoatRoughness' in child.material) child.material.clearcoatRoughness = 0.1;
      child.material.needsUpdate = true;
    };

    let changed = 0;
    model.traverse((child: any) => {
      if (!child.isMesh) return;
      const mat = child.material;
      if (!mat || !mat.name) return;
      if (isBodyMaterial(mat.name, path)) {
        const meshKey = getModelKey(path);
        const excludes = meshKey ? MODEL_MESH_EXCLUDES[meshKey] : null;
        if (excludes) {
          const nodeName = (child.name || '').toLowerCase();
          if (excludes.some((ex) => nodeName.includes(ex))) return;
        }
        applyColor(child);
        changed++;
      }
    });

    if (changed === 0) {
      model.traverse((child: any) => {
        if (!child.isMesh) return;
        const mat = child.material;
        if (!mat || !mat.name) return;
        if (isBodyMaterial(mat.name, path, true)) {
          applyColor(child);
          changed++;
        }
      });
    }
  }, [model, color, path]);

  if (!model) return null;

  return <primitive object={model} />;
}

// =============================
// 🏢 STUDIO ROOM
// =============================
function StudioRoom() {
  return (
    <group>
      <mesh position={[0, 5, -12]}>
        <cylinderGeometry args={[30, 30, 15, 128, 1, true]} />
        <meshStandardMaterial
          color="#1a1a1f"
          side={THREE.BackSide}
          roughness={0.9}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#18181c" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

function LoaderOverlay() {
  const { active, progress } = useProgress();
  if (!active) return null;

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#111115] rounded-2xl">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white/80 animate-spin" />
      </div>
      <p className="text-white/50 text-sm font-medium tracking-wide">
        Loading 3D Model... {Math.floor(progress)}%
      </p>
    </div>
  );
}

function ResizeFix() {
  const { gl, camera } = useThree();

  React.useEffect(() => {
    const canvas = gl.domElement;
    const parent = canvas.parentElement;
    if (!parent) return;

    const syncSize = () => {
      const rect = parent.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        gl.setSize(rect.width, rect.height, false);
        const cam = camera as THREE.PerspectiveCamera;
        cam.aspect = rect.width / rect.height;
        cam.updateProjectionMatrix();
      }
    };

    const observer = new ResizeObserver(syncSize);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [gl, camera]);

  return null;
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
  const finalPath = modelPath || "https://pub-6c082fd2916247f384ce18d4075bfb85.r2.dev/defaultCar.glb";

  useEffect(() => {
    if (!fullScreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fullScreen, onClose]);

  // Self-healing: when WebGL context is lost (page navigation),
  // increment key to force fresh Canvas. Does NOT fire during
  // fullscreen toggle because the Canvas stays mounted.
  const [canvasKey, setCanvasKey] = useState(0);
  const handleCanvasCreated = useCallback((state: any) => {
    const canvas = state.gl.domElement;
    canvas.addEventListener('webglcontextlost', () => {
      setCanvasKey(prev => prev + 1);
    });
  }, []);

  return (
    <>
      {/* Fullscreen backdrop overlay */}
      <AnimatePresence>
        {fullScreen && (
          <motion.div
            key="fs-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Single Canvas container — CSS changes for fullscreen, Canvas stays mounted */}
      <div
        className={
          fullScreen
            ? "fixed z-50 rounded-2xl shadow-2xl overflow-hidden"
            : "absolute inset-0"
        }
        style={
          fullScreen
            ? { top: "7.5vh", left: "5vw", width: "90vw", height: "85vh" }
            : undefined
        }
      >
        <div className="relative w-full h-full bg-[#111115] rounded-2xl shadow-2xl overflow-hidden">
          {/* Close button (fullscreen only) */}
          {fullScreen && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 p-3 rounded-xl shadow hover:scale-110 transition z-50"
            >
              <IoMdClose size={20} />
            </button>
          )}

          <Canvas
            key={`viewer-${canvasKey}`}
            onCreated={handleCanvasCreated}
            frameloop="always"
            dpr={[1, 1.5]}
            camera={{ position: [4.5, 1.8, 5], fov: 32 }}
            resize={{ debounce: 0 }}>
            <color attach="background" args={["#111115"]} />

            <Suspense fallback={null}>
              <StudioRoom />
              <Model path={finalPath} color={color} />
            </Suspense>

            <Environment preset="warehouse" />
            <ambientLight intensity={0.15} />
            <spotLight position={[5, 8, 5]} intensity={80} angle={0.5} penumbra={0.8} castShadow />
            <directionalLight position={[-5, 4, 2]} intensity={0.8} />
            <spotLight position={[0, 5, -8]} intensity={40} angle={0.6} penumbra={1} />
            <directionalLight position={[0, 10, 0]} intensity={0.5} />

            <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={20} blur={1} far={20} />

            <OrbitControls
              enablePan={false}
              target={[0, 0.7, 0]}
              minDistance={5}
              maxDistance={10}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.15}
            />

            <ResizeFix />
          </Canvas>

          <LoaderOverlay />
        </div>
      </div>
    </>
  );
}
