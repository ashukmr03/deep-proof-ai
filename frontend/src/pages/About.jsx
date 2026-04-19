import { motion } from 'framer-motion'
import { Brain, Shield, Eye, Zap, Github, ExternalLink } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const sections = [
  {
    icon: Brain,
    title: 'Detection Model',
    color: '#7c3aed',
    content: `DeepProof AI uses a simulated EfficientNet-B4 backbone (production-ready pipeline structure) trained on FaceForensics++ datasets. The model analyzes spatial frequency anomalies, GAN fingerprints embedded in pixel residuals, and temporal inconsistencies across video frames. In production, this connects to a PyTorch inference server.`,
  },
  {
    icon: Eye,
    title: 'Explainability (XAI)',
    color: '#00f5ff',
    content: `Using Grad-CAM (Gradient-weighted Class Activation Mapping), DeepProof highlights exactly which regions of an image triggered the fake classification. The heatmap overlays show suspicious zones with intensity proportional to their contribution to the fake score — so users understand WHY the verdict was reached.`,
  },
  {
    icon: Zap,
    title: 'Temporal Analysis',
    color: '#f97316',
    content: `For video content, DeepProof scores every frame individually and visualizes the confidence timeline. Genuine deepfakes often show frame-to-frame inconsistency spikes — especially around facial boundaries, eye blinking, and mouth movements. The timeline graph makes these patterns immediately visible.`,
  },
  {
    icon: Shield,
    title: 'Why This Matters',
    color: '#22c55e',
    content: `By 2026, an estimated 90% of online video content will have been AI-touched in some way. Disinformation campaigns, identity fraud, and synthetic media abuse are accelerating. DeepProof gives journalists, researchers, and everyday users a fast, accessible first-line defense — no technical expertise required.`,
  },
]

const stack = [
  { label: 'Backend', tech: 'FastAPI · Python · NumPy · Pillow' },
  { label: 'Frontend', tech: 'React 18 · Vite · Tailwind CSS · Framer Motion' },
  { label: 'Charts', tech: 'Recharts' },
  { label: 'Extension', tech: 'Chrome MV3 · Vanilla JS' },
  { label: 'Model Pipeline', tech: 'PyTorch-compatible structure (simulated)' },
]

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 min-h-screen pt-32 pb-20 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-cyan-400 tracking-widest uppercase mb-3">About</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            How <span className="gradient-text">DeepProof</span> Works
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            A full-stack AI platform for explainable deepfake detection — built to be fast, accessible, and visually transparent about its reasoning.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-5"
        >
          {sections.map(({ icon: Icon, title, color, content }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -2 }}
              className="glass p-6 flex gap-5"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{content}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass p-6"
        >
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
            Tech Stack
          </h3>
          <div className="space-y-2">
            {stack.map(({ label, tech }) => (
              <div key={label} className="flex items-baseline gap-3 text-sm">
                <span className="text-white/35 font-mono text-xs w-24 shrink-0">{label}</span>
                <span className="text-white/70">{tech}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 p-4 rounded-xl text-xs text-white/35 text-center leading-relaxed"
          style={{ border: '1px solid rgba(255,255,255,0.05)' }}
        >
          ⚠️ DeepProof AI is a hackathon demonstration. The detection uses a simulated pipeline with deterministic
          scoring based on file content hashes. In production, replace the detector with a trained PyTorch model.
          Results should not be used for legal or forensic decisions.
        </motion.div>
      </div>
    </motion.div>
  )
}
