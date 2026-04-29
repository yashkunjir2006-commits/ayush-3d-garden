import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshWobbleMaterial } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export function PlantModel({ plant, position, color, setActivePlant }) {
  const group = useRef();
  const [hovered, setHovered] = useState(false);

  // Subtle wind sway animation
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.getElapsedTime();
      // Use different phases based on position to avoid synchronous swaying
      const offset = position[0] + position[2];
      group.current.rotation.x = Math.sin(time + offset) * 0.05;
      group.current.rotation.z = Math.cos(time * 0.8 + offset) * 0.05;
    }
  });

  return (
    <group 
      ref={group} 
      position={position}
      scale={2.5}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        setActivePlant(plant);
      }}
    >
      {/* Procedural Tree / Bush Representation */}
      <RigidBody type="fixed" colliders="cuboid">
        {/* Trunk */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.1, 0.15, 1, 8]} />
          <meshStandardMaterial color="#6B4423" />
        </mesh>
        
        {/* Main Leaf Cluster */}
        <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
          <sphereGeometry args={[hovered ? 0.7 : 0.65, 16, 16]} />
          <MeshWobbleMaterial 
            factor={0.4} 
            speed={2} 
            color={color} 
            emissive={hovered ? color : '#000000'}
            emissiveIntensity={hovered ? 0.4 : 0}
            roughness={0.7}
          />
        </mesh>
        
        {/* Secondary Leaf Cluster */}
        <mesh position={[0.3, 1.0, 0.2]} castShadow receiveShadow>
          <sphereGeometry args={[0.4, 16, 16]} />
          <MeshWobbleMaterial 
            factor={0.3} 
            speed={1.5} 
            color={color} 
          />
        </mesh>

        {/* Tertiary Leaf Cluster */}
        <mesh position={[-0.3, 1.1, -0.2]} castShadow receiveShadow>
          <sphereGeometry args={[0.35, 16, 16]} />
          <MeshWobbleMaterial 
            factor={0.5} 
            speed={2.5} 
            color={color} 
          />
        </mesh>
      </RigidBody>

      {/* Floating Name Label */}
      {hovered && (
        <Text 
          position={[0, 2.2, 0]} 
          fontSize={0.3} 
          color="#ffffff" 
          outlineColor="#000000" 
          outlineWidth={0.02}
          anchorX="center" 
          anchorY="middle"
        >
          {plant.commonName}
        </Text>
      )}
    </group>
  );
}
