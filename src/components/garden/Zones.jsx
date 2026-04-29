import { useMemo, useEffect, useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Billboard, MeshReflectorMaterial, Sparkles, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';
import { PlantModel } from './PlantSystem';

// Procedural Grass Field - Optimized
function GrassField({ baseColor, count = 500, radius = 19 }) {
  const blades = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      // Random position within a circle
      const r = Math.sqrt(Math.random()) * radius;
      const theta = Math.random() * 2 * Math.PI;
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);

      // Random rotation and scale for natural look
      const rotY = Math.random() * Math.PI;
      const scaleY = 1 + Math.random() * 2; // Made blades bigger to cover more space with fewer instances
      const scaleX = 2 + Math.random(); // Wider blades

      return { position: [x, 0, z], rotation: [0, rotY, 0], scale: [scaleX, scaleY, scaleX] };
    });
  }, [count, radius]);

  // Deriving a slightly darker green for the grass relative to the base color
  // Removed castShadow from grass to massively improve framerate
  return (
    <Instances range={count} position={[0, 0, 0]}>
      <coneGeometry args={[0.15, 0.8, 3]} />
      <meshStandardMaterial color={baseColor} roughness={1} />
      {blades.map((props, i) => (
        <Instance key={i} {...props} />
      ))}
    </Instances>
  );
}

// Zone Definitions
export const ZONES = [
  { id: 'Ayurveda', position: [0, 0, 0], color: '#22c55e', groundColor: '#dcfce7', description: 'Lush Forest', frequency: 329.63 }, // E4 (Flute-like)
  { id: 'Yoga & Naturopathy', position: [0, 0, -50], color: '#0ea5e9', groundColor: '#e0f2fe', description: 'Peaceful Space', frequency: 220.0 }, // A3 (Singing Bowl)
  { id: 'Unani', position: [50, 0, 0], color: '#f59e0b', groundColor: '#fef3c7', description: 'Warm Earth', frequency: 196.0 }, // G3 (Warm tone)
  { id: 'Siddha', position: [0, 0, 50], color: '#64748b', groundColor: '#f1f5f9', description: 'Rocky Ancient Terrain', frequency: 146.83 }, // D3 (Deep Drone)
  { id: 'Homeopathy', position: [-50, 0, 0], color: '#a855f7', groundColor: '#f3e8ff', description: 'Modern Clean Garden', frequency: 440.0 }, // A4 (Clear bell)
];

// Safe 3D Spatial Audio Emitter
function BiomeAudio({ position }) {
  const { camera } = useThree();
  const audioRef = useRef(null);

  useEffect(() => {
    // Using standard HTML5 Audio prevents React Suspense from crashing the whole 3D scene if the file is missing
    const audio = new Audio('/birdsong.mp3');
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const tryPlay = () => {
      audio.play().catch(e => {
        // Silently ignore 404s or autoplay policies so the game doesn't crash
      });
    };

    window.addEventListener('click', tryPlay, { once: true });
    window.addEventListener('keydown', tryPlay, { once: true });

    return () => {
      audio.pause();
      window.removeEventListener('click', tryPlay);
      window.removeEventListener('keydown', tryPlay);
    };
  }, []);

  useFrame(() => {
    if (!audioRef.current) return;

    // Calculate distance from player (camera) to this zone's center
    const dist = camera.position.distanceTo(new THREE.Vector3(...position));

    // Linear audio falloff calculation (Sound travels 30 units before silence)
    let vol = 1.0 - (dist / 30);
    if (vol < 0) vol = 0;
    if (vol > 1) vol = 1;

    audioRef.current.volume = vol;
  });

  return null;
}

function Zone({ zone, plants, setActivePlant, isNight }) {
  return (
    <group position={zone.position}>
      {/* Ground Platform for the Zone */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh receiveShadow position={[0, -0.5, 0]}>
          <boxGeometry args={[40, 1, 40]} />
          {/* Changed ground color to be a darker earth/soil color since grass is on top */}
          <meshStandardMaterial color="#3f3f3f" roughness={1} />
        </mesh>
      </RigidBody>

      {/* Realistic Grass on top of the platform - Super Optimized */}
      <GrassField baseColor={zone.color} count={600} radius={19} />

      {/* Spatial 3D Audio Emitter for this biome using birdsong */}
      <BiomeAudio position={zone.position} />

      {/* Night fireflies covering the whole zone */}
      {isNight && (
        <Sparkles count={150} scale={30} size={6} speed={0.2} opacity={0.6} color="#fef08a" position={[0, 4, 0]} />
      )}

      {/* Zone Signboard */}
      <Billboard position={[0, 2, -15]} follow={true} lockX={false} lockY={false} lockZ={false}>
        {/* Post */}
        <mesh position={[0, -1, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 2]} />
          <meshStandardMaterial color="#8B5A2B" />
        </mesh>
        {/* Board */}
        <mesh position={[0, 0, 0.1]} castShadow>
          <boxGeometry args={[6, 1.5, 0.1]} />
          <meshStandardMaterial color="#A0522D" />
        </mesh>
        <Text position={[0, 0.2, 0.16]} fontSize={0.6} color="#ffffff" anchorX="center" anchorY="center">
          {zone.id}
        </Text>
        <Text position={[0, -0.3, 0.16]} fontSize={0.3} color="#fcd34d" anchorX="center" anchorY="center">
          {zone.description}
        </Text>
      </Billboard>

      {/* Distribute exactly the plants assigned to this zone */}
      {plants.map((plant, idx) => {
        // Arrange plants in a staggered pseudo-random circle or grid
        // to look natural, away from the sign board
        const angle = (idx / Math.max(plants.length, 1)) * Math.PI * 2;
        const radius = 8 + (idx % 2) * 4; // Alternate radii
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={plant.id}>
            {/* Ambient magic particles floating around the plant */}
            <Sparkles count={15} scale={3} size={2} color={zone.color} speed={0.4} position={[x, 1.5, z]} opacity={0.5} />
            <PlantModel
              plant={plant}
              position={[x, 0, z]}
              color={zone.color}
              setActivePlant={setActivePlant}
            />
          </group>
        );
      })}
    </group>
  );
}

export function WorldMap({ ayushPlants, setActivePlant, isNight }) {
  // Memoize random bushes so they don't regenerate on every click (which caused world blinking)
  const forestBushes = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * 120; // outside the central zones
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return (
        <mesh key={`grass-${i}`} position={[x, -0.5, z]} castShadow receiveShadow>
          <sphereGeometry args={[1 + Math.random() * 2, 8, 8]} />
          <meshStandardMaterial color="#166534" roughness={0.9} />
        </mesh>
      );
    });
  }, []);

  return (
    <group>
      {/* Universal Ground Plane underneath everything uniting the space softly (NO PHYSICS SO IT DOESNT INTERFERE WITH BARRIERS) */}
      <mesh receiveShadow position={[0, -2, 0]}>
        <boxGeometry args={[400, 1, 400]} />
        <meshStandardMaterial color="#0f3414" roughness={1} />
      </mesh>

      {/* A Water Area (Large plane intersecting slightly above the base ground but below platforms) */}
      <mesh receiveShadow position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[400, 400]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={10}
          roughness={0.1}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0284c7"
          metalness={0.8}
        />
      </mesh>

      {/* Paths connecting the zones */}
      <RigidBody type="fixed" colliders="cuboid">
        {/* N-S Path */}
        <mesh receiveShadow position={[0, -0.4, 0]}>
          <boxGeometry args={[4, 1, 100]} />
          <meshStandardMaterial color="#8b5a2b" roughness={1} /> {/* dirt color */}
        </mesh>
        {/* E-W Path */}
        <mesh receiveShadow position={[0, -0.4, 0]}>
          <boxGeometry args={[100, 1, 4]} />
          <meshStandardMaterial color="#8b5a2b" roughness={1} />
        </mesh>
      </RigidBody>

      {/* Invisible Barriers blocking off the water/forest quadrants so player can only walk on paths/bridges/zones */}
      <RigidBody type="fixed" colliders="cuboid">
        {/* Top Right Quadrant Barrier */}
        <mesh position={[25, 0, -25]} visible={false}>
          <boxGeometry args={[48, 10, 48]} />
        </mesh>
        {/* Top Left Quadrant Barrier */}
        <mesh position={[-25, 0, -25]} visible={false}>
          <boxGeometry args={[48, 10, 48]} />
        </mesh>
        {/* Bottom Right Quadrant Barrier */}
        <mesh position={[25, 0, 25]} visible={false}>
          <boxGeometry args={[48, 10, 48]} />
        </mesh>
        {/* Bottom Left Quadrant Barrier */}
        <mesh position={[-25, 0, 25]} visible={false}>
          <boxGeometry args={[48, 10, 48]} />
        </mesh>
      </RigidBody>

      {/* Scattered background forest trees / giant bushes */}
      {forestBushes}

      {ZONES.map((zone) => {
        const zonePlants = ayushPlants.filter(p => p.category === zone.id);
        return (
          <Zone
            key={zone.id}
            zone={zone}
            plants={zonePlants}
            setActivePlant={setActivePlant}
            isNight={isNight}
          />
        );
      })}
    </group>
  );
}
