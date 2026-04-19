import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Eye } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const features = [
  { icon: Shield, label: 'Authenticity Score', desc: 'Confidence-calibrated result' },
  { icon: Eye, label: 'Visual Heatmap', desc: "See exactly what's suspicious" },
  { icon: Zap, label: 'Real-Time Speed', desc: 'Results in under 3 seconds' },
]

export default function Hero() {
  const glowRef = useRef(null)

  useEffect(() => {
    const handleMouse = (e) => {
      if (!glowRef.current) return
      const rect = glowRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      glowRef.current.style.background = `radial-gradient(600px at ${x}% ${y}%, rgba(0,245,255,0.06), transparent 70%)`
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <section
      ref={glowRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Radial glow behind hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(0,245,255,0.08) 0%, transparent 70%)',
        }}
      />

      <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: 'rgba(0,245,255,0.08)',
              border: '1px solid rgba(0,245,255,0.25)',
              color: '#00f5ff',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI-Powered Deepfake Detection
          </div>
        </motion.div>

        {/* Main title with glitch */}
        <motion.h1
          variants={item}
          className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight"
        >
          <span
            className="glitch-text gradient-text block"
            data-text="DeepProof"
          >
            DeepProof
          </span>
          <span className="text-white block mt-1 text-4xl md:text-6xl font-light tracking-widest">
            AI
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Real-time deepfake detection with{' '}
          <span className="text-cyan-400 font-medium">explainable AI</span>,{' '}
          heatmap visualization, and frame-by-frame analysis. Know exactly{' '}
          <em>why</em> something is fake.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link to="/analyze">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-white flex items-center gap-2"
            >
              <Shield size={16} />
              Analyze Media
              <ArrowRight size={16} />
            </motion.button>
          </Link>
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-xl text-sm font-semibold text-white/70 hover:text-white transition-all duration-300"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              How It Works
            </motion.button>
          </Link>
        </motion.div>

        {/* Feature cards */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {features.map(({ icon: Icon, label, desc }) => (
            <motion.div
              key={label}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass p-5 text-left transition-all duration-300"
              style={{
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: 'rgba(0,245,255,0.12)', border: '1px solid rgba(0,245,255,0.2)' }}
              >
                <Icon size={18} className="text-cyan-400" />
              </div>
              <div className="text-sm font-semibold text-white mb-1">{label}</div>
              <div className="text-xs text-white/50">{desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-cyan-400/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
