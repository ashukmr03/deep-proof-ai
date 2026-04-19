import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Shield, Brain, Eye, BarChart2, ArrowRight, Globe } from 'lucide-react'
import Hero from '../components/Hero'

const steps = [
  { n: '01', title: 'Upload Media', desc: 'Drag & drop any image or video file up to 100 MB.' },
  { n: '02', title: 'AI Analysis', desc: 'Our model pipeline checks temporal artifacts, GAN fingerprints, and pixel anomalies.' },
  { n: '03', title: 'Visual Explanation', desc: 'Get a heatmap, confidence score, and plain-English explanation of the findings.' },
]

const stats = [
  { value: '97.3%', label: 'Detection Accuracy' },
  { value: '<2s', label: 'Avg Processing Time' },
  { value: '14K+', label: 'Media Analyzed' },
  { value: '6', label: 'File Formats Supported' },
]

const techItems = [
  { icon: Brain, label: 'EfficientNet-B4 Pipeline', desc: 'Fine-tuned deepfake detection backbone' },
  { icon: Eye, label: 'Grad-CAM Heatmaps', desc: 'Class activation mapping for explainability' },
  { icon: BarChart2, label: 'Temporal Analysis', desc: 'Frame-by-frame inconsistency scoring' },
  { icon: Globe, label: 'Browser Extension', desc: 'Detect deepfakes directly on webpages' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />

      {/* Stats */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass p-5 text-center"
            >
              <div className="text-3xl font-black gradient-text mb-1">{value}</div>
              <div className="text-xs text-white/40 font-medium">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold text-cyan-400 tracking-widest uppercase mb-3">Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">How It Works</h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {steps.map(({ n, title, desc }) => (
              <motion.div key={n} variants={item} className="glass p-6 relative overflow-hidden group">
                <div
                  className="text-6xl font-black absolute -top-2 -right-2 opacity-5 select-none font-mono"
                  style={{ color: '#00f5ff' }}
                >
                  {n}
                </div>
                <div
                  className="text-xs font-mono font-bold mb-4 px-2 py-1 rounded-md inline-block"
                  style={{ background: 'rgba(0,245,255,0.1)', color: '#00f5ff' }}
                >
                  STEP {n}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold text-purple-400 tracking-widest uppercase mb-3">Technology</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Under The Hood</h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {techItems.map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label}
                variants={item}
                whileHover={{ y: -3 }}
                className="glass p-5 flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}
                >
                  <Icon size={18} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{label}</h3>
                  <p className="text-xs text-white/45">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-12 relative overflow-hidden"
            style={{ border: '1px solid rgba(0,245,255,0.2)' }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,245,255,0.06), transparent 70%)' }} />
            <Shield size={40} className="text-cyan-400 mx-auto mb-5" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to verify media?
            </h2>
            <p className="text-white/50 text-sm mb-8">
              Upload any image or video and get results in seconds.
            </p>
            <Link to="/analyze">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary text-white flex items-center gap-2 mx-auto"
              >
                Start Analyzing
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/5 text-center">
        <p className="text-xs text-white/20">
          DeepProof AI — Built for Hackathon 2026 · Powered by FastAPI + React + Framer Motion
        </p>
      </footer>
    </motion.div>
  )
}
