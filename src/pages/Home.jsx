import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// FadeIn Component
function FadeIn({ children, delay, duration = 1000, className = '' }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div 
      className={`transition-opacity ${className}`}
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

// AnimatedHeading Component
function AnimatedHeading({ text }) {
  const [start, setStart] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStart(true), 200);
    return () => clearTimeout(t);
  }, []);

  const lines = text.split('\n');
  const charDelay = 30; // ms

  return (
    <h1 
      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 font-sans text-white" 
      style={{ letterSpacing: '-0.04em' }}
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex}>
          {line.split('').map((char, charIndex) => {
            const delay = (lineIndex * line.length * charDelay) + (charIndex * charDelay);
            return (
              <span
                key={charIndex}
                className="inline-block transition-all"
                style={{
                  opacity: start ? 1 : 0,
                  transform: start ? 'translateX(0)' : 'translateX(-18px)',
                  transitionDuration: '500ms',
                  transitionDelay: `${delay}ms`
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
      ))}
    </h1>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        
        /* Apply fonts and smoothing */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .liquid-glass {
          background: rgba(0, 0, 0, 0.4);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 20%,
            rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.3) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Hero Content (Bottom of viewport) */}
        <div className="flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 lg:pb-16 pointer-events-none">
          <div className="lg:grid lg:grid-cols-2 lg:items-end w-full">
            
            {/* Left Column */}
            <div className="pointer-events-auto w-full max-w-2xl">
              <AnimatedHeading text={"Ancient Wisdom.\nModern Healing."} />
              
              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5">
                  Immerse yourself in a beautiful 3D botanical world. Discover the incredible healing properties of plants documented throughout history.
                </p>
              </FadeIn>
              
              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/garden" className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Enter 3D Garden
                  </Link>
                  <Link to="/database" className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
                    Browse Database
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right Column */}
            <div className="mt-8 lg:mt-0 flex items-end justify-start lg:justify-end pointer-events-auto">
              <FadeIn delay={1400} duration={1000}>
                <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl inline-block max-w-sm lg:max-w-md">
                  <span className="text-lg md:text-xl font-light">
                    Ayurveda. Yoga. Unani. Siddha. Homeopathy.
                  </span>
                </div>
              </FadeIn>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
