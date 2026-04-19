import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Tag, Clock, Cpu } from 'lucide-react'

export default function ExplanationPanel({ result }) {
  const { prediction, confidence, explanation, artifacts, processing_time, model_version } = result
  const isFake = prediction === 'FAKE'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Verdict banner */}
      <div
        className="flex items-start gap-3 p-4 rounded-xl"
        style={{
          background: isFake ? 'rgba(239,68,68,0.06)' : 'rgba(34,197,94,0.06)',
          border: `1px solid ${isFake ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)'}`,
        }}
      >
        {isFake
          ? <AlertTriangle size={18} className="text-red-400 mt-0.5 shrink-0" />
          : <CheckCircle size={18} className="text-green-400 mt-0.5 shrink-0" />
        }
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: isFake ? '#f87171' : '#4ade80' }}>
            {isFake ? 'Deepfake Detected' : 'Authentic Media'}
          </p>
          <p className="text-sm text-white/70 leading-relaxed">{explanation}</p>
        </div>
      </div>

      {/* Artifacts */}
      {artifacts?.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <Tag size={13} className="text-white/40" />
            <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">
              Detected Artifacts
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {artifacts.map((a) => (
              <motion.span
                key={a}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: '#f87171',
                }}
              >
                {a}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass p-3 flex items-center gap-2">
          <Clock size={14} className="text-white/40" />
          <div>
            <p className="text-xs text-white/40">Processing Time</p>
            <p className="text-sm font-semibold text-white">{processing_time}s</p>
          </div>
        </div>
        <div className="glass p-3 flex items-center gap-2">
          <Cpu size={14} className="text-white/40" />
          <div>
            <p className="text-xs text-white/40">Model</p>
            <p className="text-xs font-semibold text-white font-mono truncate">{model_version}</p>
          </div>
        </div>
      </div>

      {/* Confidence breakdown */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-white/40">Confidence Distribution</span>
          <span className="text-white/60">{Math.round(confidence * 100)}% {isFake ? 'fake' : 'real'}</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence * 100}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full"
            style={{
              background: isFake
                ? 'linear-gradient(90deg, #f97316, #ef4444)'
                : 'linear-gradient(90deg, #22c55e, #10b981)',
              boxShadow: isFake
                ? '0 0 8px rgba(239,68,68,0.5)'
                : '0 0 8px rgba(34,197,94,0.5)',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
