import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, Float, ContactShadows, Sparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlantStudio({ plant, onClose }) {
  // Map category to a cinematic color tone
  const colors = {
    'Ayurveda': '#22c55e',
    'Yoga & Naturopathy': '#0ea5e9',
    'Unani': '#f59e0b',
    'Siddha': '#64748b',
    'Homeopathy': '#a855f7'
  };
  const color = colors[plant.category] || '#22c55e';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-slate-950 flex shadow-2xl items-center justify-center p-0 md:p-8"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 bg-gradient-to-radial from-transparent to-black pointer-events-none opacity-80 z-0"></div>

      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 md:top-12 md:right-12 text-white hover:text-white bg-white/5 hover:bg-red-500/80 border border-white/10 p-4 rounded-full z-50 transition-all font-bold tracking-widest uppercase text-xs"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      {/* Info overlay */}
      <div className="absolute bottom-6 left-6 right-6 md:bottom-auto md:top-12 md:left-12 z-10 md:max-w-sm pointer-events-none flex flex-col gap-4">
         <div>
           <div className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white uppercase tracking-wider border border-white/20 mb-3">
             3D Studio Analysis \ {plant.category}
           </div>
           <h2 className="text-5xl md:text-6xl font-serif italic text-white mb-1 drop-shadow-lg" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>{plant.commonName}</h2>
           <h3 className="text-xl text-ayush-green-400 mb-6 font-medium">{plant.botanicalName}</h3>
         </div>
         
         <div className="backdrop-blur-xl bg-black/40 p-6 rounded-3xl border border-white/10 shadow-2xl flex-1 pointer-events-auto">
           <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-3 border-b border-white/10 pb-3">Properties</h4>
           <div className="space-y-4">
             <div>
               <p className="text-slate-400 text-xs font-bold uppercase">Medical Focus</p>
               <div className="flex flex-wrap gap-2 mt-2">
                 {plant.medicinalUses.map((use, i) => (
                   <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 text-white text-xs rounded-md">
                     {use}
                   </span>
                 ))}
               </div>
             </div>
             <div>
               <p className="text-slate-400 text-xs font-bold uppercase mt-4 mb-2">Botanical Summary</p>
               <p className="text-slate-300 leading-relaxed text-sm">
                 {plant.summary}
               </p>
             </div>
           </div>
         </div>
      </div>
      
      {/* 3D Canvas */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing rounded-[2rem] overflow-hidden border border-white/5">
        <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={2} castShadow />
          <directionalLight position={[-10, 0, -10]} intensity={0.5} color={color} />
          
          <OrbitControls 
            enablePan={false} 
            minDistance={3} 
            maxDistance={12} 
            maxPolarAngle={Math.PI / 2 + 0.1}
            autoRotate
            autoRotateSpeed={1}
            dampingFactor={0.05}
          />
          
          {/* Magic ambient particles around the plant */}
          <Sparkles count={100} scale={5} size={3} speed={0.4} opacity={0.4} color={color} />

          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[0, -1.5, 0]}>
               {/* Extremely detailed generative studio mesh */}
               
               {/* Main Trunk / Stem */}
               <mesh castShadow receiveShadow>
                 <cylinderGeometry args={[0.1, 0.25, 3, 32]} />
                 <meshStandardMaterial color="#3e2723" roughness={0.9} bumpScale={0.02} />
               </mesh>

               {/* Branch left */}
               <mesh position={[-0.5, 0.5, 0]} rotation={[0, 0, 0.5]} castShadow>
                 <cylinderGeometry args={[0.05, 0.1, 1.5, 16]} />
                 <meshStandardMaterial color="#3e2723" roughness={0.9} />
               </mesh>

               {/* Branch right */}
               <mesh position={[0.5, 1, 0.2]} rotation={[0.2, 0, -0.6]} castShadow>
                 <cylinderGeometry args={[0.04, 0.08, 1.2, 16]} />
                 <meshStandardMaterial color="#3e2723" roughness={0.9} />
               </mesh>
               
               {/* Root annotation */}
               <Html position={[0.3, -1, 0]} center zIndexRange={[100, 0]}>
                 <div className="bg-black/70 backdrop-blur-lg border border-white/10 text-white text-[11px] px-4 py-2 rounded-full whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity cursor-pointer group flex items-center shadow-2xl">
                   <div className="w-2 h-2 bg-yellow-500 rounded-full inline-block mr-3 animate-pulse shadow-[0_0_10px_rgba(234,179,8,1)]"></div>
                   <span className="font-medium tracking-wide">Root System</span>
                   <div className="hidden group-hover:block absolute left-1/2 -top-12 -translate-x-1/2 bg-black text-white text-[10px] px-3 py-2 rounded border border-white/20">
                     Extracts vital earth nutrients.
                   </div>
                 </div>
               </Html>

               {/* Generative Canopy */}
               <group position={[0, 1.5, 0]}>
                 {[...Array(35)].map((_, i) => {
                   // Fibonacci sphere distribution for natural look
                   const phi = Math.acos(-1 + (2 * i) / 35);
                   const theta = Math.sqrt(35 * Math.PI) * phi;
                   
                   const r = 1.2 + Math.random() * 0.4; // canopy radius
                   const x = r * Math.cos(theta) * Math.sin(phi);
                   const y = r * Math.cos(phi);
                   const z = r * Math.sin(theta) * Math.sin(phi);
                   
                   return (
                     <mesh key={i} position={[x, y, z]} castShadow receiveShadow>
                       <sphereGeometry args={[0.4 + Math.random() * 0.25, 16, 16]} />
                       {/* Subsurface scattering effect simulation */}
                       <meshPhysicalMaterial 
                         color={color} 
                         roughness={0.4}
                         metalness={0.1}
                         transmission={0.4} 
                         thickness={1.5}
                         clearcoat={0.3}
                         emissive={color}
                         emissiveIntensity={0.1}
                       />
                     </mesh>
                   );
                 })}
               </group>

               {/* Leaf Node Annotation */}
               <Html position={[-1.2, 2.2, 0.5]} center zIndexRange={[100, 0]}>
                 <div className="bg-black/70 backdrop-blur-lg border border-white/10 text-white text-[11px] px-4 py-2 rounded-full whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity cursor-pointer group flex items-center shadow-2xl">
                   <div className={`w-2 h-2 rounded-full inline-block mr-3 animate-pulse`} style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}></div>
                   <span className="font-medium tracking-wide">Foliage / {plant.medicinalUses[0]}</span>
                 </div>
               </Html>

               <Html position={[1.2, 1.8, -0.5]} center zIndexRange={[100, 0]}>
                 <div className="bg-black/70 backdrop-blur-lg border border-white/10 text-white text-[11px] px-4 py-2 rounded-full whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity cursor-pointer flex items-center shadow-2xl">
                   <div className={`w-2 h-2 rounded-full inline-block mr-3 bg-white`}></div>
                   <span className="font-medium tracking-wide">Stem Extracts</span>
                 </div>
               </Html>

            </group>
          </Float>

          {/* Under-shadow for realism */}
          <ContactShadows opacity={0.6} scale={15} blur={2.5} far={4} position={[0, -2, 0]} color="#000000" resolution={512} />
        </Canvas>
      </div>
    </motion.div>
  );
}
