import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X, Github, Activity, ShieldCheck, Database, Layout } from 'lucide-react';

// --- HLS Video Background Component (Ambient Motion) ---
const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // High-quality blue technical lattice-style background stream
  const videoUrl = "https://stream.mux.com/6fiS9E96uW00PqRFE02eI4S2unv8x7x00tJ.m3u8";

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: false });
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(e => console.error("Video play failed:", e));
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoUrl;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(e => console.error("Video play failed:", e));
        });
      }
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden text-glade-cyan">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-30 mix-blend-screen scale-110 grayscale brightness-125 saturate-[0.8]"
      />
      {/* Simulation-like Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1C] via-[#0A0F1C]/90 to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#0A0F1C] to-transparent z-10" />
      <div className="absolute inset-0 simulation-grid opacity-20 z-10" />
      <div className="absolute inset-0 scanlines opacity-5 z-10" />
    </div>
  );
};

// --- Data Torrent Animation (Global Background Detail) ---
const DataTorrent = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const generateLine = () => {
      const parts = [
        `REF 0x${Math.floor(Math.random() * 0xffff).toString(16).toUpperCase()}`,
        `NODE ${Math.floor(Math.random() * 999)}`,
        `[${(Math.random() * 100).toFixed(2)}%]`,
        `SYNC ${Math.floor(Math.random() * 10000)}`,
        `OPTIMIZED`
      ];
      return parts.join("    ");
    };

    setLines(Array.from({ length: 12 }, generateLine));
    
    const interval = setInterval(() => {
      setLines(prev => [generateLine(), ...prev.slice(0, 11)]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none opacity-[0.15] font-mono text-[10px] truncate select-none">
      <div className="flex flex-col gap-8 p-16">
        {lines.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1 - (idx * 0.08), x: 0 }}
            className="text-white whitespace-nowrap tracking-[0.8em]"
          >
            {line}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Numerical Grid Animation (Background Aesthetic) ---
const NumericalGrid = () => {
  const [nodes, setNodes] = useState<{ id: number; x: number; y: number; val: string }[]>([]);

  useEffect(() => {
    const initialNodes = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      val: (Math.random() * 100).toFixed(2)
    }));
    setNodes(initialNodes);

    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        val: (Math.random() * 100).toFixed(2),
        y: node.y > 110 ? -10 : node.y + 0.15
      })));
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden opacity-50">
      {nodes.map(node => (
        <motion.div
          key={node.id}
          className="absolute font-mono text-[9px] text-glade-cyan"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, delay: node.id * 0.1 }}
        >
          {node.val}
        </motion.div>
      ))}
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0A0F1C] selection:bg-glade-cyan selection:text-white font-sans text-white/90">
      {/* 1. Background Layers */}
      <VideoBackground />
      <DataTorrent />
      <NumericalGrid />
      
      {/* Scanning Line Animation */}
      <motion.div 
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="fixed left-0 right-0 h-[2px] bg-glade-cyan/40 z-10 pointer-events-none blur-[2px] opacity-30 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
      />

      {/* Numerical Tracking HUD (Corners) */}
      <div className="fixed top-24 left-12 z-10 pointer-events-none hidden lg:flex flex-col gap-1 opacity-40 font-mono text-[9px] tracking-widest text-glade-cyan uppercase">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-glade-cyan animate-pulse" />
          <span>Tracking Mode: Active</span>
        </div>
        <span className="mt-2 text-white/30">X: 104.229</span>
        <span className="text-white/30">Y: 882.103</span>
      </div>

      <div className="fixed bottom-24 right-12 z-10 pointer-events-none hidden lg:flex flex-col gap-1 opacity-40 font-mono text-[9px] tracking-widest text-glade-cyan uppercase text-right">
        <span>Node Integrity: 99.4%</span>
        <span>Mesh Density: High</span>
        <span>Signal: Isolated</span>
      </div>
      
      {/* Structural Overlays */}
      <div className="fixed inset-0 z-10 pointer-events-none hidden lg:block opacity-10">
        <div className="absolute left-[20%] top-0 w-[1px] h-full bg-white/10" />
        <div className="absolute left-[40%] top-0 w-[1px] h-full bg-white/10" />
        <div className="absolute left-[60%] top-0 w-[1px] h-full bg-white/10" />
        <div className="absolute left-[80%] top-0 w-[1px] h-full bg-white/10" />
      </div>

      {/* Subtle Glows */}
      <div className="fixed top-0 right-0 w-[700px] h-[700px] bg-sky-500/5 blur-[180px] rounded-full z-10 pointer-events-none opacity-50 translate-x-1/4 -translate-y-1/4" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-glade-accent/5 blur-[150px] rounded-full z-10 pointer-events-none opacity-40 -translate-x-1/4 translate-y-1/4" />

      {/* 2. LAB NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 h-16 md:h-20 px-6 md:px-12 flex items-center justify-between z-50 border-b border-white/[0.03] backdrop-blur-md bg-[#0A0F1C]/40">
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">GLADE</span>
          <span className="text-[7px] uppercase tracking-[0.4em] text-glade-cyan font-mono font-bold opacity-80 leading-none mt-1 text-nowrap">Research Engine Laboratory</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-glade-cyan/10 border border-glade-cyan/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-glade-cyan animate-pulse shadow-[0_0_8px_#38BDF8]" />
            <span className="text-[9px] font-black tracking-[0.2em] text-glade-cyan uppercase font-mono">STATUS: COMING SOON</span>
          </div>
        </div>
      </header>

      {/* 3. CORE SECTION */}
      <main className="relative z-20 h-full flex flex-col items-center justify-center px-6 md:px-12 pt-16 pb-16">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center">
          
          <div className="w-full max-w-5xl flex flex-col items-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-8 md:mb-12 relative"
            >
              {/* Radiating Signal Pulse */}
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <motion.div 
                  animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="w-64 h-64 border border-glade-cyan/30 rounded-full blur-xl"
                />
                <motion.div 
                  animate={{ scale: [1, 2.5], opacity: [0.2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                  className="w-64 h-64 border border-glade-cyan/20 rounded-full blur-2xl"
                />
              </div>

              <div className="inline-flex items-center gap-4 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-full mb-6 md:mb-8 backdrop-blur-sm">
                <span className="text-[10px] font-black text-glade-cyan tracking-[0.3em] uppercase font-mono">Internal Lab Alpha</span>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-[10px] font-medium text-white/30 tracking-[0.3em] uppercase font-mono">Build 2026.04</span>
              </div>

              <h1 className="text-[80px] md:text-[130px] lg:text-[160px] font-black leading-[0.75] tracking-[-0.05em] text-white flex flex-col">
                <span className="block italic hover:text-glade-cyan transition-colors duration-700 cursor-default">GLADE</span>
              </h1>
              <p className="mt-4 md:mt-6 text-[11px] md:text-[13px] font-bold text-white/30 tracking-[0.5em] uppercase font-mono text-center">
                Architect — Abdullah El Sabea
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-[700px] mb-10 md:mb-14 px-4"
            >
              <p className="text-[17px] md:text-[19px] text-white/60 font-sans leading-relaxed tracking-tight mb-8 text-center balance">
                A physics-informed computational framework for generating and validating lattice structures. This system is currently being refined through iterative mesh-free design protocols.
              </p>
              
              <div className="flex items-center justify-center gap-6 opacity-40 text-[10px] uppercase tracking-[0.5em] font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-glade-cyan">0x01</span>
                  <span>ANALYSIS</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <div className="flex items-center gap-3">
                  <span className="text-glade-cyan">0x02</span>
                  <span>SYNTHESIS</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <div className="flex items-center gap-3">
                  <span className="text-glade-cyan">0x03</span>
                  <span>VALIDATION</span>
                </div>
              </div>
            </motion.div>

            {/* BIG REPO HEADLINE LINK */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="group relative w-full max-w-3xl"
            >
              <a 
                href="https://github.com/abdullahsabea" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-[1px] bg-gradient-to-r from-glade-cyan/50 via-white/10 to-glade-cyan/50 rounded-2xl overflow-hidden hover:scale-[1.01] transition-all duration-500 shadow-[0_0_80px_rgba(56,189,248,0.1)]"
              >
                <div className="bg-[#0A0F1C]/90 backdrop-blur-xl rounded-[15px] p-8 md:p-12 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-10 group-hover:bg-[#0F172A] transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 simulation-grid opacity-[0.03] pointer-events-none" />
                  
                  <div className="flex flex-col items-center md:items-start text-center md:text-left z-10">
                    <span className="text-[11px] font-black text-glade-cyan tracking-[0.4em] uppercase mb-4 opacity-70 font-mono">REPOSITORY ACCESS G 01</span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter group-hover:text-glade-cyan transition-colors leading-none">
                      VIEW LAB SOURCE
                    </h2>
                    <p className="mt-5 text-[10px] text-white/30 uppercase tracking-[0.3em] font-mono">
                      Systems Operational / High Efficiency Target
                    </p>
                  </div>
                  
                  <div className="relative group-hover:rotate-12 transition-transform duration-700 z-10">
                    <div className="absolute -inset-10 bg-glade-cyan/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 border border-white/10 rounded-full flex items-center justify-center group-hover:border-glade-cyan transition-colors bg-white/[0.03] backdrop-blur-md">
                      <Github size={40} className="md:size-48 lg:size-64 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </a>
              
              <div className="mt-6 flex items-center justify-center gap-8 text-[9px] text-white/10 tracking-[0.8em] uppercase font-mono">
                 <span>Full System Deployment</span>
                 <span className="text-glade-cyan font-bold italic">COMING SOON</span>
              </div>
            </motion.div>
          </div>

        </div>
      </main>

      {/* 4. LAB STATUS FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 px-6 md:px-12 border-t border-white/[0.03] flex items-center justify-center text-[8px] font-bold text-white/20 tracking-[0.7em] z-40 bg-[#0A0F1C]/90 backdrop-blur-xl pointer-events-none uppercase font-mono">
        <span>© 2026 GLADE LABORATORY — Research Terminal Isolated</span>
      </footer>
    </div>
  );
}
