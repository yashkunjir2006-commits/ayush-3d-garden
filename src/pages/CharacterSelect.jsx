import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEconomy, CHARACTERS } from '../store/useEconomy';
import { Coins, Lock, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function CharacterSelect() {
  const navigate = useNavigate();
  const { coins, ownedCharacters, selectedCharacter, selectCharacter, purchaseCharacter } = useEconomy();

  const handleAction = (charId) => {
    if (ownedCharacters.includes(charId)) {
      selectCharacter(charId);
    } else {
      purchaseCharacter(charId);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f16] text-slate-200 overflow-hidden relative font-sans">
      {/* Background ambient lighting effects for premium feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ayush-green-500/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-700/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto pt-32 pb-20 px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
          <div className="max-w-2xl">
             <motion.div 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 font-medium text-emerald-400 text-sm backdrop-blur-md"
             >
               <Sparkles className="w-4 h-4" />
               <span>Avatar Treasury</span>
             </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 tracking-tight mb-4"
            >
              Choose Your Hero
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-xl font-light"
            >
              Unlock legendary avatars imbued with the energies of the AYUSH ecosystem.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center space-x-4 bg-slate-900/60 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-2xl shadow-emerald-500/10"
          >
             <div className="bg-yellow-500/10 p-3 rounded-2xl border border-yellow-500/20">
               <Coins className="w-8 h-8 text-yellow-400" />
             </div>
             <div>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Balance</p>
               <span className="text-3xl font-black text-white">{coins}</span>
             </div>
          </motion.div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {Object.values(CHARACTERS).map((char, index) => {
            const isOwned = ownedCharacters.includes(char.id);
            const isSelected = selectedCharacter === char.id;
            const canAfford = coins >= char.price;

            return (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className={`relative group flex flex-col overflow-hidden rounded-[2.5rem] p-1 transition-all duration-500 ${
                  isSelected 
                    ? 'bg-gradient-to-b from-ayush-green-400 to-emerald-600 shadow-2xl shadow-ayush-green-500/30' 
                    : 'bg-gradient-to-b from-slate-700/50 to-slate-800/80 hover:from-slate-600 hover:to-slate-700'
                }`}
              >
                <div className="bg-slate-900 rounded-[2.3rem] h-full flex flex-col p-6 relative z-10 overflow-hidden">
                  
                  {/* Subtle background glow matching character body color */}
                  <div 
                    className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-500" 
                    style={{ backgroundColor: char.color }} 
                  />

                  {/* Character Avatar Showcase */}
                  <div className="w-full h-56 rounded-3xl mb-8 relative flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                     <div 
                       className="absolute inset-0 opacity-80"
                       style={{ background: `linear-gradient(135deg, ${char.color} 0%, ${char.emissive} 100%)` }}
                     />
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                     {/* The Avatar Letter Representation */}
                     <motion.span 
                       whileHover={{ scale: 1.1, rotate: [-5, 5, 0] }}
                       className="text-9xl font-black text-white mix-blend-overlay drop-shadow-2xl z-10 relative cursor-default"
                     >
                       {char.name[0]}
                     </motion.span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="mb-8">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-3xl font-black text-white tracking-tight">{char.name}</h3>
                        {!isOwned && (
                          <span className="flex items-center text-yellow-400 font-bold bg-yellow-400/10 border border-yellow-400/20 px-3 py-1.5 rounded-full text-sm">
                            <Coins className="w-4 h-4 mr-1" /> {char.price}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        A unique entity bound to the therapeutic landscapes of AYUSH. Highly resonant with {char.name} environments.
                      </p>
                    </div>

                    <button
                      onClick={() => handleAction(char.id)}
                      disabled={!isOwned && !canAfford}
                      className={`w-full py-5 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 relative overflow-hidden group/btn ${
                        isSelected
                          ? 'bg-ayush-green-500 text-emerald-950 hover:bg-ayush-green-400'
                          : isOwned
                          ? 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md'
                          : canAfford
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed border-t border-white/5'
                      }`}
                    >
                      {/* Highlight sweep effect for afford text */}
                      {(!isSelected && !isOwned && canAfford) && (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full duration-1000 transition-transform"></div>
                      )}

                      <span className="relative flex items-center pointer-events-none">
                        {isSelected ? (
                          <><CheckCircle2 className="w-6 h-6 mr-2" /> Activated</>
                        ) : isOwned ? (
                          'Initialize Link'
                        ) : canAfford ? (
                          <><Sparkles className="w-5 h-5 mr-2" /> Unlock Entity</>
                        ) : (
                          <><Lock className="w-5 h-5 mr-2" /> Missing {char.price - coins}</>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enter Game Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
           <button 
             onClick={() => navigate('/garden')}
             className="group relative px-12 py-6 bg-emerald-500 rounded-full font-black text-xl text-emerald-950 overflow-hidden shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-all hover:scale-105"
           >
             <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-400 to-ayush-green-400 transition-opacity opacity-0 group-hover:opacity-100"></div>
             <span className="relative flex items-center space-x-3">
               <span>ENTER VIRTUAL GARDEN</span>
               <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
             </span>
           </button>
        </motion.div>

      </div>
    </div>
  );
}
