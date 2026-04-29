import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ayushPlants } from '../data/plants';
import { Mic, Send } from 'lucide-react';

export default function VaidyaChat() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'vaidya', text: 'Namaste. I am Vaidya, your ancient healer guide. You may type your ailments or speak them aloud to me.' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        
        // Auto send voice message
        setMessages(prev => [...prev, { sender: 'user', text: transcript }]);
        setInput('');
        setTimeout(() => {
          analyzeSymptom(transcript.toLowerCase());
        }, 800);
      };
      
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      analyzeSymptom(userMsg.toLowerCase());
    }, 800);
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      window.speechSynthesis.cancel();
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const analyzeSymptom = (text) => {
    let responseText = '';
    let recommendedPlants = [];

    // Expanded Intelligent NLP Knowledge Base
    if (text.includes('cold') || text.includes('throat') || text.includes('cough')) {
      responseText = "A sore throat and cold indicate an imbalance of Kapha. I recommend soothing herbs to clear your respiratory channels and boost your internal fire.";
      recommendedPlants = ['tulsi', 'mulethi', 'adalodakam'];
    } else if (text.includes('fever') || text.includes('hot')) {
      responseText = "Fever is your body's attempt to expel toxins. These bitter and potent herbs will cool your system and boost your immunity rapidly.";
      recommendedPlants = ['giloy', 'nilavembu', 'belladonna'];
    } else if (text.includes('stomach') || text.includes('digestion') || text.includes('gas') || text.includes('bloating')) {
      responseText = "Digestive discomfort points to weak Agni, your digestive fire. These traditional remedies will soothe your stomach and immediately restore balance.";
      recommendedPlants = ['saunf', 'ajwain', 'mint'];
    } else if (text.includes('stress') || text.includes('sleep') || text.includes('anxiety')) {
      responseText = "Modern life disrupts our vital energy. To ground your mind, calm your nerves, and invite deep sleep, I highly prescribe these powerful adaptogens.";
      recommendedPlants = ['ashwagandha', 'brahmi', 'lemongrass'];
    } else if (text.includes('skin') || text.includes('wound') || text.includes('cut')) {
      responseText = "For skin ailments and healing, nature provides powerful antimicrobial and soothing flora to instantly purify the blood and skin.";
      recommendedPlants = ['neem', 'aloe-vera', 'calendula'];
    } else if (text.includes('headache') || text.includes('migraine') || text.includes('head')) {
      responseText = "Headaches often stem from restricted blood flow or stress. These cooling and grounding herbs ease vascular tension and clear the mind.";
      recommendedPlants = ['brahmi', 'mint', 'lemongrass'];
    } else if (text.includes('sugar') || text.includes('diabetes')) {
      responseText = "To balance blood sugar levels and manage Prameha, ancient texts rely on bitter compounds to regulate digestion and insulin naturally.";
      recommendedPlants = ['jamun', 'karela', 'giloy'];
    } else if (text.includes('immunity') || text.includes('weak')) {
      responseText = "To build Ojas, or pure vitality, we use Rasayana herbs. They rejuvenate cells, boost absolute immunity, and prolong healthy life.";
      recommendedPlants = ['amla', 'tulsi', 'ashwagandha'];
    } else if (text.includes('joint') || text.includes('pain') || text.includes('body')) {
      responseText = "Aching joints result from accumulated Vata and toxins. These potent anti-inflammatory roots reduce swelling and restore fluid movement.";
      recommendedPlants = ['haldi', 'ashwagandha', 'nirgundi'];
    } else if (text.includes('hair') || text.includes('scalp') || text.includes('fall')) {
      responseText = "Healthy hair requires cooling the scalp and enriching the blood. These traditional oils and herbs stimulate roots and prevent greying.";
      recommendedPlants = ['bhringraj', 'amla', 'neem'];
    } else {
      responseText = "I sense you seek general wellness, or your ailment is quite specific. Explore our 3D garden directly to discover the ancient wisdom of nature's pharmacy, or rephrase your symptoms.";
      recommendedPlants = ['amla', 'tulsi', 'neem'];
    }

    const plantsData = ayushPlants.filter(p => recommendedPlants.includes(p.id));

    setMessages(prev => [
      ...prev, 
      { sender: 'vaidya', text: responseText, plants: plantsData }
    ]);

    // Voice-to-Voice Output Execution
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(responseText);
    
    // Force the most realistic human female voice available in the browser
    const voices = window.speechSynthesis.getVoices();
    
    // Priority: Google's Cloud Voices (extremely realistic) > Indian English (Thematic) > High Quality OS defaults
    const premiumFemaleVoice = 
      voices.find(v => v.name === 'Google UK English Female') || 
      voices.find(v => v.lang === 'en-IN' && (v.name.includes('Veena') || v.name.includes('Lekha'))) ||
      voices.find(v => v.name === 'Google US English') ||
      voices.find(v => v.name.includes('Samantha')) ||
      voices.find(v => v.name.includes('Zira'));
    
    if (premiumFemaleVoice) {
      utterance.voice = premiumFemaleVoice;
    }

    // Tuning out the strict "robot" sound
    utterance.rate = 0.9;  // Slower speech sounds far more natural and wise
    utterance.pitch = 1.2; // Elevated pitch cleanly maps to female resonance
    window.speechSynthesis.speak(utterance);
  };

  const handlePlantClick = (plant) => {
    setIsOpen(false);
    navigate('/database');
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-ayush-green-500 to-ayush-green-700 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] flex items-center justify-center text-white hover:scale-110 transition-transform z-50 overflow-hidden group border-2 border-ayush-green-400/50"
      >
        <span className="text-3xl relative z-10 group-hover:-rotate-12 transition-transform">🤖</span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-28 right-6 w-96 h-[32rem] bg-slate-900/95 backdrop-blur-3xl rounded-3xl border border-slate-700/50 shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-ayush-green-500/20 flex items-center justify-center border border-ayush-green-500/30 relative">
                  <span className="text-xl">🧘‍♂️</span>
                  {isListening && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce"></span>}
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-tight">Vaidya AI</h3>
                  <p className="text-ayush-green-400 text-xs font-medium">Ancient Healer (Voice Enabled)</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  window.speechSynthesis.cancel();
                  if(isListening) recognitionRef.current?.stop();
                }} 
                className="text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 rounded-full p-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col hide-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'vaidya' && (
                    <div className="w-8 h-8 rounded-full bg-ayush-green-500/20 border border-ayush-green-500/30 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                      <span className="text-sm">🌿</span>
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-ayush-green-600 text-white rounded-br-sm shadow-md' 
                      : 'bg-slate-800/80 border border-slate-700/50 text-slate-200 rounded-tl-sm shadow-md'
                  }`}>
                    <p>{msg.text}</p>
                    
                    {/* Interactive Cards */}
                    {msg.plants && msg.plants.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {msg.plants.map(plant => (
                          <div 
                            key={plant.id} 
                            onClick={() => handlePlantClick(plant)}
                            className="bg-slate-900 border border-ayush-green-500/30 rounded-xl overflow-hidden cursor-pointer hover:border-ayush-green-400 transition-colors group flex items-center"
                          >
                             <div className="w-16 h-16 flex-shrink-0 bg-black">
                               <img src={plant.images[0]} alt={plant.commonName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                             </div>
                             <div className="p-3">
                               <h4 className="text-emerald-400 font-bold text-sm">{plant.commonName}</h4>
                               <p className="text-slate-400 text-xs italic">{plant.botanicalName}</p>
                             </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer w/ Voice UI */}
            <div className="p-4 bg-slate-800/80 border-t border-slate-700/50">
              <form onSubmit={handleSend} className="relative flex items-center gap-2">
                <button 
                  type="button"
                  onClick={toggleListen}
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                  title={isListening ? "Stop Listening" : "Speak Symptom"}
                >
                  <Mic className="w-5 h-5" />
                </button>
                
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Format: 'I have a headache'"} 
                    className="w-full bg-slate-900 border border-slate-700 rounded-full px-5 py-3 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-ayush-green-500 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim()}
                    className="absolute right-2 top-2 w-8 h-8 rounded-full bg-ayush-green-500 flex items-center justify-center text-white disabled:opacity-50 disabled:bg-slate-600 transition-colors"
                  >
                    <Send className="w-4 h-4 translate-x-px translate-y-px" />
                  </button>
                </div>
              </form>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
