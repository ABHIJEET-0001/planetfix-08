import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";

type Hotspot = {
  name: string;
  lat: number;
  lon: number;
  co2: string;
  intensity: number; // 0..1
};

const HOTSPOTS: Hotspot[] = [
  { name: "China", lat: 35, lon: 104, co2: "11.4 Gt", intensity: 1 },
  { name: "USA", lat: 39, lon: -98, co2: "5.0 Gt", intensity: 0.85 },
  { name: "India", lat: 22, lon: 79, co2: "2.7 Gt", intensity: 0.7 },
  { name: "EU", lat: 50, lon: 10, co2: "2.6 Gt", intensity: 0.65 },
  { name: "Russia", lat: 61, lon: 90, co2: "1.7 Gt", intensity: 0.55 },
  { name: "Japan", lat: 36, lon: 138, co2: "1.1 Gt", intensity: 0.45 },
  { name: "Brazil", lat: -10, lon: -55, co2: "0.5 Gt", intensity: 0.4 },
  { name: "S. Africa", lat: -29, lon: 24, co2: "0.45 Gt", intensity: 0.38 },
];

function latLonToVec3(lat: number, lon: number, radius = 1): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Earth({ onHover }: { onHover: (h: Hotspot | null) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.12;
  });

  // Procedural continents via noise-like pattern using canvas texture
  const earthTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size / 2;
    const ctx = canvas.getContext("2d")!;
    // Ocean
    const grad = ctx.createLinearGradient(0, 0, 0, size / 2);
    grad.addColorStop(0, "#0a4d6b");
    grad.addColorStop(0.5, "#0d6b8a");
    grad.addColorStop(1, "#0a4d6b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size / 2);
    // Continents (rough blobs)
    ctx.fillStyle = "#1a7a3e";
    const blobs = [
      [120, 70, 80, 50], [180, 60, 50, 30], // Eurasia
      [70, 90, 30, 60], // Africa
      [380, 80, 35, 45], // N America
      [400, 160, 25, 50], // S America
      [300, 100, 40, 25], // Asia east
      [250, 200, 30, 15], // Australia
    ];
    blobs.forEach(([x, y, w, h]) => {
      ctx.beginPath();
      ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    // Add darker terrain detail
    ctx.fillStyle = "#0f5e2e";
    for (let i = 0; i < 80; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * size, Math.random() * size / 2, Math.random() * 8 + 2, 0, Math.PI * 2);
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Earth sphere */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={earthTexture} roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Atmosphere glow */}
      <mesh scale={1.08}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#4ade80"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh scale={1.15}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef} scale={1.02}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="white" transparent opacity={0.08} />
      </mesh>

      {/* Hotspots */}
      {HOTSPOTS.map((h) => {
        const pos = latLonToVec3(h.lat, h.lon, 1.01);
        return <Hotspot key={h.name} hotspot={h} position={pos} onHover={onHover} />;
      })}
    </group>
  );
}

function Hotspot({
  hotspot,
  position,
  onHover,
}: {
  hotspot: Hotspot;
  position: THREE.Vector3;
  onHover: (h: Hotspot | null) => void;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Orient ring tangent to sphere
  const quaternion = useMemo(() => {
    const up = new THREE.Vector3(0, 0, 1);
    const dir = position.clone().normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(up, dir);
    return q;
  }, [position]);

  useFrame((state) => {
    if (ringRef.current) {
      const t = state.clock.elapsedTime;
      const pulse = 1 + Math.sin(t * 2 + hotspot.intensity * 5) * 0.4;
      ringRef.current.scale.setScalar(pulse);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.6 - Math.sin(t * 2 + hotspot.intensity * 5) * 0.3;
    }
  });

  const color = hotspot.intensity > 0.7 ? "#ef4444" : hotspot.intensity > 0.45 ? "#f59e0b" : "#22c55e";
  const size = 0.015 + hotspot.intensity * 0.025;

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(hotspot);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
        document.body.style.cursor = "default";
      }}
    >
      {/* Core dot */}
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Pulsing ring */}
      <mesh ref={ringRef} quaternion={quaternion}>
        <ringGeometry args={[size * 1.5, size * 2.2, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Vertical beam */}
      <mesh position={position.clone().normalize().multiplyScalar(0.05)} quaternion={quaternion}>
        <cylinderGeometry args={[size * 0.3, size * 0.3, 0.1, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      {hovered && (
        <Html distanceFactor={6} position={[0, 0.08, 0]} center>
          <div className="pointer-events-none whitespace-nowrap rounded-lg glass px-2.5 py-1.5 text-xs font-semibold shadow-elegant border border-border/50">
            <div className="text-foreground">{hotspot.name}</div>
            <div className="text-muted-foreground text-[10px]">{hotspot.co2} CO₂/yr</div>
          </div>
        </Html>
      )}
    </group>
  );
}

export function Globe3D() {
  const [active, setActive] = useState<Hotspot | null>(null);

  return (
    <div className="relative aspect-square max-w-lg mx-auto">
      {/* Glow backdrop */}
      <div className="absolute inset-0 rounded-full gradient-bg blur-3xl opacity-40 animate-pulse-glow pointer-events-none" />

      <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} />
        <directionalLight position={[-5, -2, -3]} intensity={0.3} color="#60a5fa" />
        <Suspense fallback={null}>
          <Stars radius={50} depth={50} count={1500} factor={2} fade speed={0.5} />
          <Earth onHover={setActive} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          rotateSpeed={0.5}
        />
      </Canvas>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 glass rounded-xl px-3 py-2 text-[10px] font-medium space-y-1 shadow-soft pointer-events-none">
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-500" />High emissions</div>
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500" />Medium</div>
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green-500" />Lower</div>
      </div>

      {/* Active readout */}
      <div className="absolute top-2 right-2 glass rounded-xl px-3 py-2 text-xs shadow-soft min-w-[120px] pointer-events-none">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">CO₂ Hotspot</div>
        <div className="font-display font-bold text-sm">{active?.name ?? "Drag to explore"}</div>
        <div className="text-[10px] text-muted-foreground">{active ? `${active.co2} per year` : "Hover a marker"}</div>
      </div>
    </div>
  );
}
