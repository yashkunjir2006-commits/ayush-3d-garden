import { Link, useLocation } from 'react-router-dom';
import { Leaf, Box, Database, BrainCircuit, User, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEconomy } from '../store/useEconomy';
import InstallPWA from './InstallPWA';

export default function Navbar() {
  const location = useLocation();
  const coins = useEconomy(state => state.coins);
  const profile = useEconomy(state => state.profile);

  const links = [
    { name: 'Home', path: '/', icon: <Leaf size={20} /> },
    { name: '3D Garden', path: '/garden', icon: <Box size={20} /> },
    { name: 'Characters', path: '/character-select', icon: <User size={20} /> },
    { name: 'Plant Database', path: '/database', icon: <Database size={20} /> },
    { name: 'Quiz', path: '/quiz', icon: <BrainCircuit size={20} /> },
    { name: 'Help', path: '/help', icon: <HelpCircle size={20} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto glass-dark rounded-full px-6 py-3 flex justify-between items-center transition-all duration-300 shadow-lg text-white">
        <Link to="/" className="flex items-center space-x-2 text-ayush-green-500 font-bold text-xl hover:text-ayush-green-400 transition-colors">
          <Leaf className="text-ayush-green-500" />
          <span>AYUSH 3D</span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <Link key={link.path} to={link.path} className="relative group flex items-center space-x-1 text-sm font-medium hover:text-ayush-green-400 transition-colors">
              <span className="text-gray-400 group-hover:text-ayush-green-400">{link.icon}</span>
              <span>{link.name}</span>
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="underline"
                  className="absolute left-0 top-full mt-1 h-0.5 w-full bg-ayush-green-500 rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
           <InstallPWA />
           {profile ? (
             <>
               <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                 <span className="text-yellow-400 font-black">🪙</span>
                 <span className="font-bold text-white">{coins}</span>
               </div>
               <div className="flex items-center space-x-2 bg-ayush-green-500/20 px-3 py-1.5 rounded-full border border-ayush-green-500/30">
                 <User size={16} className="text-ayush-green-400" />
                 <span className="text-sm font-bold text-ayush-green-400">{profile.name.split(' ')[0]}</span>
               </div>
             </>
           ) : (
             <Link to="/login" className="bg-ayush-green-600 hover:bg-ayush-green-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-ayush-green-500/30 transition-all">
               Login
             </Link>
           )}
        </div>
      </div>
    </nav>
  );
}
