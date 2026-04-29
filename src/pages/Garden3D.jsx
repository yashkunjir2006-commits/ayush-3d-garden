import { useState, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, KeyboardControls, Environment, Cloud, Stars } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';

import { ayushPlants } from '../data/plants';
import { Player } from '../components/garden/Player';
import { WorldMap } from '../components/garden/Zones';

function GameScene({ setActivePlant }) {
  const currentHour = new Date().getHours();
  // 6 PM to 6 AM is night
  const isNight = currentHour >= 18 || currentHour < 6;

  return (
    <>
      <Sky 
        sunPosition={isNight ? [0, -100, 0] : [100, 20, 100]} 
        turbidity={isNight ? 0.1 : 0.1} 
        rayleigh={isNight ? 0.1 : 0.5} 
      />
      <ambientLight intensity={isNight ? 0.15 : 0.4} color={isNight ? "#8b9dc3" : "#ffffff"} />
      <directionalLight 
        castShadow 
        position={isNight ? [-50, 100, -50] : [50, 100, 50]} 
        intensity={isNight ? 0.3 : 1.0} 
        color={isNight ? "#a3b8c2" : "#ffffff"}
        shadow-mapSize={[2048, 2048]} 
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <fog attach="fog" args={isNight ? ['#0f172a', 15, 120] : ['#e2e8f0', 10, 150]} />

      {isNight && <Stars radius={100} depth={50} count={8000} factor={4} saturation={0} fade speed={1} />}
      <Cloud opacity={isNight ? 0.2 : 0.5} speed={0.4} width={100} depth={1.5} segments={20} position={[0, 40, 0]} />

      <Physics gravity={[0, -20, 0]}>
        <Player />
        <WorldMap ayushPlants={ayushPlants} setActivePlant={setActivePlant} isNight={isNight} />
      </Physics>
      
      {/* Optional cinematic environment reflections */}
      <Environment preset={isNight ? "night" : "park"} />

      {/* Cinematic Post-Processing */}
      <EffectComposer disableNormalPass multisampling={4}>
        <Bloom luminanceThreshold={isNight ? 0.2 : 0.9} luminanceSmoothing={0.5} height={300} intensity={isNight ? 1.5 : 0.6} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}

export default function Garden3D() {
  const [activePlant, setActivePlant] = useState(null);
  
  // Define Keyboard key map
  const keyboardMap = useMemo(() => [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  ], []);

  return (
    <div className="w-full h-screen relative bg-slate-900 font-sans">
      
      <KeyboardControls map={keyboardMap}>
        <div className="w-full h-full cursor-crosshair">
          <Canvas shadows camera={{ fov: 60 }}>
            <Suspense fallback={null}>
              <GameScene setActivePlant={setActivePlant} />
            </Suspense>
          </Canvas>
        </div>
      </KeyboardControls>

      {/* Persistent Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full mix-blend-difference pointer-events-none z-10 opacity-70"></div>

      {/* Instructions overlay */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-none bg-black/50 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/10 text-white text-sm font-medium flex items-center space-x-4">
        <span><kbd className="bg-white/20 px-2 py-1 rounded">W A S D</kbd> to move</span>
        <span className="text-white/30">|</span>
        <span>Mouse to look around</span>
        <span className="text-white/30">|</span>
        <span>Click plants to inspect</span>
      </div>

      {/* UI Overlay for plant info */}
      <AnimatePresence>
        {activePlant && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute bottom-6 right-6 w-96 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-6 z-50 text-white"
          >
            <button 
              onClick={() => setActivePlant(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="h-48 -mt-6 -mx-6 mb-4 overflow-hidden rounded-t-3xl relative">
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
               <img src={activePlant.images && activePlant.images.length > 0 ? activePlant.images[0] : ''} alt={activePlant.commonName} className="w-full h-full object-cover" />
               <h3 className="absolute bottom-4 left-6 z-20 text-3xl font-extrabold text-white mb-0 drop-shadow-md">{activePlant.commonName}</h3>
            </div>
            
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 bg-ayush-green-500/20 text-ayush-green-400 border border-ayush-green-500/30 text-xs font-bold rounded-md uppercase tracking-wider">
                {activePlant.category}
              </span>
              <h4 className="text-sm italic text-slate-300">{activePlant.botanicalName}</h4>
            </div>
            
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {activePlant.summary}
            </p>
            
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Key Uses</span>
              <div className="flex flex-wrap gap-2">
                {activePlant.medicinalUses.map((use, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-800/50 border border-slate-700 text-slate-200 text-xs font-medium rounded-full">
                    {use}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
