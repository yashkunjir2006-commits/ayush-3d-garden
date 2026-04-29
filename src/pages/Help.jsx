import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Mail, Phone, Code2, ShieldAlert } from 'lucide-react';

export default function Help() {
  const faqs = [
    {
      q: "What is AYUSH 3D?",
      a: "AYUSH 3D is an immersive botanical gamification platform designed to teach the ancient medicinal systems of Ayurveda, Yoga, Unani, Siddha, and Homeopathy using interactive 3D environments and AI."
    },
    {
      q: "How does the Economy work?",
      a: "You earn AYUSH Coins by spending time learning in the 3D Garden and successfully answering Quiz questions. You can use these coins to unlock premium 3D Avatars in the shop."
    },
    {
      q: "How do I interact with Vaidya AI?",
      a: "Click the floating robot icon on the bottom right of any screen. You can type or use the microphone to speak your symptoms aloud. Vaidya will diagnose you and spawn relevant 3D medicinal plants!"
    },
  ];

  const team = [
    { name: "Yash Kunjir", url: "https://www.linkedin.com/in/yash-kunjir-398608332" },
    { name: "Ishaan Mantri", url: "https://www.linkedin.com/in/ishaan-mantri/" },
    { name: "Pawan Jadhav", url: "https://www.linkedin.com/in/pavan-jadhav-4863293b9/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BTkReBSPeThCRQ6%2FOa00Ugg%3D%3D" },
    { name: "Jeevanrekha Nimbalkar", url: "https://www.linkedin.com/in/jeevanrekha-nimbalkar-b49144334?utm_source=share_via&utm_content=profile&utm_medium=member_ios" }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-ayush-green-500/30 pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-ayush-green-900/30 rounded-full blur-[120px] pointer-events-none opacity-50 z-0 mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none opacity-40 z-0 mix-blend-screen"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <HelpCircle className="w-10 h-10 text-ayush-green-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-serif italic text-white tracking-tight mb-4"
            style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
          >
            Help & Information
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400"
          >
            Everything you need to know about the platform.
          </motion.p>
        </div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-20"
        >
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                <ShieldAlert className="w-4 h-4 text-ayush-green-500 mr-3" />
                {faq.q}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed pl-7">{faq.a}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-ayush-green-500/10 rounded-full blur-[50px]"></div>
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-xs">Reach Out to Us</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="bg-ayush-green-500/20 p-3 rounded-full">
                  <Phone className="w-5 h-5 text-ayush-green-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Helpline</p>
                  <p className="text-lg font-medium text-white tracking-wide">8421574291</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Priority Email</p>
                  <p className="text-sm font-medium text-white tracking-wide">AYUSH3D@GMAIL.COM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Credits Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-xs flex items-center">
              <Code2 className="w-4 h-4 mr-2 opacity-50" />
              Engineers & Creators
            </h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              This platform was architected and developed with passion to digitize and gamify ancient botanical wisdom for the modern world.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {team.map((member, i) => (
                <a 
                  key={i} 
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/50 border border-white/5 px-4 py-3 rounded-xl flex items-center justify-between hover:border-ayush-green-500 hover:bg-ayush-green-500/5 transition-all group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-ayush-green-500 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{member.name}</span>
                  </div>
                  <svg className="w-4 h-4 text-slate-600 group-hover:text-ayush-green-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20 text-slate-600 text-xs font-medium uppercase tracking-widest"
        >
          © 2026 AYUSH 3D PLATFORM • Ancient Wisdom, Modern Healing
        </motion.div>

      </div>
    </div>
  );
}
