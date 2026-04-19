import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Github } from 'lucide-react';

// --- Local Video Background ---
const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <video
        ref={videoRef}
        src="/glade-lab/glade-hero.mp4"
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-25 mix-blend-screen scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1C] via-[#0A0F1C]/85 to-[#0A0F1C]/60 z-10" />
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#0A0F1C] to-transparent z-10" />
      <div className="absolute inset-0 simulation-grid opacity-10 z-10" />
      <div className="absolute inset-0 scanlines opacity-5 z-10" />
    </div>
  );
};

// --- Floating data nodes ---
const DataTorrent = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const gen = () => [
      `REF 0x${Math.floor(Math.random() * 0xffff).toString(16).toUpperCase()}`,
      `NODE ${Math.floor(Math.random() * 999)}`,
      `[${(Math.random() * 100).toFixed(2)}%]`,
      `SYNC ${Math.floor(Math.random() * 10000)}`,
    ].join('    ');

    setLines(Array.from({ length: 10 }, gen));
    const id = setInterval(() => setLines(p => [gen(), ...p.slice(0, 9)]), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none opacity-[0.12] font-mono text-[9px] select-none overflow-hidden">
      <div className="flex flex-col gap-8 p-16">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1 - i * 0.09, x: 0 }}
            className="text-white whitespace-nowrap tracking-[0.8em]"
          >{l}</motion.div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-[#0A0F1C] text-white font-sans">

      {/* Background layers */}
      <VideoBackground />
      <DataTorrent />

      {/* Scanning line */}
      <motion.div
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="fixed left-0 right-0 h-[1px] bg-glade-cyan/30 z-10 pointer-events-none blur-[1px]"
      />

      {/* Subtle glows */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-sky-500/5 blur-[160px] rounded-full z-0 pointer-events-none translate-x-1/4 -translate-y-1/4" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-glade-accent/5 blur-[130px] rounded-full z-0 pointer-events-none -translate-x-1/4 translate-y-1/4" />

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 h-16 px-6 md:px-12 flex items-center justify-between z-50 border-b border-white/[0.04] backdrop-blur-md bg-[#0A0F1C]/50">
        <div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">GLADE</span>
          <p className="text-[7px] uppercase tracking-[0.4em] text-glade-cyan font-mono opacity-80 leading-none mt-0.5">Research Engine Laboratory</p>
        </div>
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-glade-cyan/10 border border-glade-cyan/20 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-glade-cyan animate-pulse shadow-[0_0_8px_#38BDF8]" />
          <span className="text-[9px] font-black tracking-[0.2em] text-glade-cyan uppercase font-mono">STATUS: COMING SOON</span>
        </div>
      </header>

      {/* ── HERO (split layout) ── */}
      <main className="relative z-20 min-h-screen flex items-center px-6 md:px-12 pt-20 pb-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex flex-col items-start"
          >
            {/* badge */}
            <div className="flex items-center gap-3 px-4 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full mb-6 backdrop-blur-sm">
              <span className="text-[9px] font-black text-glade-cyan tracking-[0.3em] uppercase font-mono">Internal Lab Alpha</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-[9px] text-white/30 tracking-[0.3em] uppercase font-mono">Build 2026.04</span>
            </div>

            {/* headline */}
            <h1 className="text-[72px] md:text-[100px] font-black leading-[0.78] tracking-[-0.04em] text-white italic mb-6">
              GLADE
            </h1>

            <p className="text-[10px] font-bold text-white/30 tracking-[0.5em] uppercase font-mono mb-8">
              Architect — Abdullah El Sabea
            </p>

            <p className="text-[16px] md:text-[18px] text-white/55 leading-relaxed mb-10 max-w-[520px]">
              A physics-informed Gaussian process topology optimizer for functionally graded Gyroid lattice structures. Mesh-free. Data-free. Uncertainty-aware.
            </p>

            {/* Phase tags */}
            <div className="flex flex-wrap items-center gap-4 mb-10 text-[9px] uppercase tracking-[0.4em] font-mono">
              {['Analysis', 'Synthesis', 'Validation'].map((t, i) => (
                <div key={t} className="flex items-center gap-2 opacity-50">
                  <span className="text-glade-cyan">0{i + 1}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://github.com/abdullahsabea"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-7 py-4 bg-glade-cyan/10 border border-glade-cyan/30 rounded-2xl hover:bg-glade-cyan/20 hover:border-glade-cyan/60 transition-all duration-400 backdrop-blur-sm"
            >
              <Github size={20} className="opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="text-[11px] font-black tracking-[0.3em] uppercase text-white group-hover:text-glade-cyan transition-colors">
                Follow the Lab
              </span>
            </a>
          </motion.div>

          {/* RIGHT — image with annotation overlay */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            {/* Glow behind image */}
            <div className="absolute -inset-6 bg-glade-cyan/10 blur-[60px] rounded-3xl pointer-events-none" />

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(56,189,248,0.08)]">
              <img
                src="/glade-lab/glade-lattice.png"
                alt="GLADE lattice topology — Gyroid structure forming from a Gaussian process field"
                className="w-full h-auto object-cover"
              />

              {/* Annotation overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Left label */}
                <div className="absolute top-[28%] left-[8%] flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-glade-cyan shadow-[0_0_6px_#38BDF8]" />
                    <span className="text-[8px] md:text-[9px] font-black text-glade-cyan tracking-[0.25em] uppercase font-mono drop-shadow-lg">GP Posterior Field</span>
                  </div>
                  <span className="text-[7px] text-white/40 font-mono tracking-wider ml-4">Var[ρ(x)]</span>
                </div>

                {/* Right label */}
                <div className="absolute top-[28%] right-[6%] flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] md:text-[9px] font-black text-white/70 tracking-[0.25em] uppercase font-mono drop-shadow-lg">Gyroid TPMS</span>
                    <span className="w-2 h-2 rounded-full bg-white/60" />
                  </div>
                  <span className="text-[7px] text-white/40 font-mono tracking-wider mr-4">ρ★(x)</span>
                </div>

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0F1C]/80 to-transparent pt-8 pb-4 px-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] font-mono text-glade-cyan/60 tracking-[0.4em] uppercase">Design Domain Ω</span>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[7px] font-mono text-white/30 tracking-[0.3em] uppercase">Converged</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats strip below image */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: 'Method', value: 'PIGP' },
                { label: 'Output', value: 'Gyroid TPMS' },
                { label: 'Validation', value: 'Post-hoc FEA' },
              ].map(s => (
                <div key={s.label} className="px-3 py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-center">
                  <p className="text-[7px] text-white/30 uppercase tracking-[0.3em] font-mono mb-1">{s.label}</p>
                  <p className="text-[9px] font-black text-glade-cyan tracking-wide font-mono">{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-20 border-t border-white/[0.04] px-6 md:px-12 py-5 flex items-center justify-center bg-[#0A0F1C]/80 backdrop-blur-xl">
        <span className="text-[8px] font-bold text-white/20 tracking-[0.7em] uppercase font-mono">
          © 2026 GLADE Laboratory — Research Terminal Isolated
        </span>
      </footer>

    </div>
  );
}
