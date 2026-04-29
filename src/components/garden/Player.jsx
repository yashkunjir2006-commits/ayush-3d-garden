import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls, OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import * as THREE from 'three';

const SPEED = 16;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

function CharacterModel({ currentAction, modelRef }) {
  const { scene, animations } = useGLTF('/Xbot.glb');
  const { actions } = useAnimations(animations, modelRef);

  // Apply shadows to all meshes inside the Xbot model
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!animations.length) return;
    
    // Attempt to dynamically find Idle and Walk/Run
    const idleName = animations.find(a => a.name.toLowerCase().includes('idle'))?.name || animations[0]?.name;
    const walkName = animations.find(a => a.name.toLowerCase().includes('run') || a.name.toLowerCase().includes('walk'))?.name || idleName;
    
    const actionName = currentAction === 'walk' ? walkName : idleName;
    const action = actions[actionName];
    
    if (action) {
      action.reset().fadeIn(0.2).play();
      return () => action.fadeOut(0.2);
    }
  }, [currentAction, actions, animations]);

  return (
    <group ref={modelRef} position={[0, -0.9, 0]} scale={0.9} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the GLTF to avoid popping in
useGLTF.preload('/Xbot.glb');

export function Player() {
  const ref = useRef();
  const controlsRef = useRef();
  const modelRef = useRef();
  const [, get] = useKeyboardControls();
  
  const [action, setAction] = useState('idle');

  useFrame((state) => {
    if (!ref.current) return;
    
    // 1. Move Player
    const { forward, backward, left, right } = get();
    const velocity = ref.current.linvel();
    
    // Front/Side movement
    frontVector.set(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0));
    sideVector.set((left ? 1 : 0) - (right ? 1 : 0), 0, 0);
    
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED);

    const isMoving = direction.length() > 0.1;
    if (isMoving && action !== 'walk') setAction('walk');
    if (!isMoving && action !== 'idle') setAction('idle');

    // Apply rotation from the CAMERA so player moves forward relative to where we look
    // We only care about the Y rotation of the camera
    const cameraRotationY = Math.atan2(
      state.camera.position.x - ref.current.translation().x,
      state.camera.position.z - ref.current.translation().z
    );
    direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraRotationY);

    // Set physical velocity
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);
    
    // Rotate character mesh to face the movement direction
    if (isMoving && modelRef.current) {
      const targetAngle = Math.atan2(direction.x, direction.z);
      const currentQ = modelRef.current.quaternion;
      const targetQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), targetAngle);
      currentQ.slerp(targetQ, 0.2); // Smooth turn
    }
    
    // 2. Camera Tracking
    const pos = ref.current.translation();
    
    if (pos.y < -15) {
      // Teleport back to spawn instead of reloading the page to avoid SPA 404 errors
      ref.current.setTranslation({ x: 0, y: 5, z: 0 }, true);
      ref.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
    
    // Update OrbitControls target to follow the player tightly
    if (controlsRef.current) {
      controlsRef.current.target.set(pos.x, pos.y + 1, pos.z);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <OrbitControls 
        ref={controlsRef} 
        makeDefault 
        minDistance={2} 
        maxDistance={15} 
        maxPolarAngle={Math.PI / 2.1} // Prevent looking completely under ground
        enablePan={false}
      />
      
      <RigidBody ref={ref} colliders={false} mass={1} position={[0, 5, 0]} enabledRotations={[false, false, false]} linearDamping={3}>
        <CapsuleCollider args={[0.5, 0.4]} />
        <CharacterModel currentAction={action} modelRef={modelRef} />
      </RigidBody>
    </>
  );
}
