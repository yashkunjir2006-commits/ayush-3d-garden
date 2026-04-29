import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Search, Play, ArrowUpRight, Box } from 'lucide-react';
import { ayushPlants, categories } from '../data/plants';
import PlantStudio from '../components/garden/PlantStudio';

export default function Database() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [playingId, setPlayingId] = useState(null);
  const [activePlant3D, setActivePlant3D] = useState(null);

  const filteredPlants = useMemo(() => {
    return ayushPlants.filter((plant) => {
      const matchCategory = activeCategory === 'All' || plant.category === activeCategory;
      const matchSearch = plant.botanicalName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          plant.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plant.medicinalUses.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchTerm, activeCategory]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleToggleAudio = (plant) => {
    if (playingId === plant.id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
    } else {
      window.speechSynthesis.cancel(); 
      const textToRead = `${plant.commonName}. Botanical name: ${plant.botanicalName}. ${plant.summary} Medicinal uses focus on: ${plant.medicinalUses.join(', ')}.`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
      setPlayingId(plant.id);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-ayush-green-500/30">
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center border-b border-white/5">
        
        {/* Magical Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-emerald-900/40 rounded-[100%] blur-[120px] pointer-events-none opacity-50 z-0 mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-yellow-900/20 rounded-[100%] blur-[100px] pointer-events-none opacity-30 z-0 mix-blend-screen"></div>

        {/* Floating Stars / Dust */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md"
          >
            <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
            <span className="text-sm text-slate-300 font-medium">Digital Collection of Ancient Knowledge.</span>
          </motion.div>

          {/* Elegant Serif Font Simulation using custom classes or standard fonts */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-8 tracking-tighter leading-[1.1] drop-shadow-2xl"
            style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
          >
             The Plant Knowledge <br/> Your Body Deserves
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl font-light mb-10 leading-relaxed"
          >
            Curated wisdom. Blazing health benefits. Built by ancient sages, refined by modern science. This is natural healing, beautifully preserved.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-6 mb-24"
          >
            <button className="group relative flex items-center bg-white/10 hover:bg-white/20 border border-white/20 transition-all px-8 py-3 rounded-full backdrop-blur-md text-white font-medium">
              Explore Database <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button className="group flex items-center text-slate-300 hover:text-white transition-colors font-medium">
              Watch The Overview <Play className="w-4 h-4 ml-2 fill-current opacity-70 group-hover:opacity-100" />
            </button>
          </motion.div>

          {/* Systems Logos */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] text-slate-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full mb-6">Honored By The Systems Of</span>
            <div className="flex flex-wrap justify-center gap-10 md:gap-16 opacity-60 text-slate-300 font-serif italic text-xl md:text-2xl">
              <span>Ayurveda</span>
              <span>Yoga</span>
              <span>Unani</span>
              <span>Siddha</span>
              <span>Homeopathy</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Database Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        
        <div className="text-center mb-16">
          <span className="border border-white/10 px-3 py-1 rounded-full text-xs text-slate-400 tracking-widest uppercase mb-6 inline-block">Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-serif italic text-white" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
             Pro healing. Zero complexity.
          </h2>
        </div>

        <div className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white/5 border border-white/10 p-4 md:p-6 rounded-3xl backdrop-blur-xl">
          
          <div className="relative w-full md:w-[400px]">
            <input 
              type="text" 
              placeholder="Search botanical names or uses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-4 pl-12 bg-black/50 rounded-2xl border border-white/10 focus:outline-none focus:border-white/30 text-white placeholder-slate-500 transition-colors"
            />
            <Search className="w-5 h-5 absolute left-4 top-4.5 text-slate-500" />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'bg-transparent text-slate-400 border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Plant Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPlants.map((plant) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                key={plant.id} 
                className="group bg-white/5 backdrop-blur-md rounded-[2rem] overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 relative flex flex-col"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="h-64 overflow-hidden relative p-4">
                  <div className="absolute top-6 left-6 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                    {plant.category}
                  </div>
                  
                  <img 
                    src={plant.images && plant.images.length > 0 ? plant.images[0] : ''} 
                    alt={plant.commonName} 
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.03] transition-transform duration-700 brightness-90 group-hover:brightness-100 grayscale-[20%] group-hover:grayscale-0" 
                  />
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-3xl font-serif text-white mb-2" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>{plant.commonName}</h3>
                      <h4 className="text-sm italic text-slate-400 mb-6 font-serif">{plant.botanicalName}</h4>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setActivePlant3D(plant)}
                        className="p-3 rounded-full transition-all duration-300 border bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500 hover:text-white"
                        title="View 3D 360° Studio"
                      >
                        <Box className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleToggleAudio(plant)}
                        className={`p-3 rounded-full transition-all duration-300 border ${
                          playingId === plant.id 
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] scale-110' 
                            : 'bg-black/50 text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                        title={playingId === plant.id ? "Stop Audio" : "Listen to Plant Info"}
                      >
                        {playingId === plant.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-8 leading-relaxed flex-1">
                    {plant.summary}
                  </p>
                  
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Key Medicinal Uses</span>
                    <div className="flex flex-wrap gap-2">
                      {plant.medicinalUses.map((use, i) => (
                        <span key={i} className="px-3 py-1.5 bg-black/40 border border-white/5 text-slate-300 text-xs rounded-lg">
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredPlants.length === 0 && (
          <div className="text-center py-32 text-slate-500 border border-white/5 rounded-3xl mt-8">
            <Search className="w-12 h-12 mx-auto text-white/20 mb-6" />
            <p className="text-xl font-serif italic text-white/60">No plants discovered matching your criteria.</p>
          </div>
        )}

      </div>

      {/* 3D Studio Modal */}
      <AnimatePresence>
        {activePlant3D && (
          <PlantStudio 
            plant={activePlant3D} 
            onClose={() => setActivePlant3D(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
