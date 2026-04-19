import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const R = 54
const CIRCUMFERENCE = 2 * Math.PI * R

function getColor(isFake, confidence) {
  if (!isFake) return { primary: '#22c55e', glow: 'rgba(34,197,94,0.5)' }
  if (confidence > 0.85) return { primary: '#ef4444', glow: 'rgba(239,68,68,0.5)' }
  if (confidence > 0.65) return { primary: '#f97316', glow: 'rgba(249,115,22,0.5)' }
  return { primary: '#eab308', glow: 'rgba(234,179,8,0.5)' }
}

export default function ConfidenceMeter({ confidence, isFake, prediction }) {
  const [displayed, setDisplayed] = useState(0)
  const controls = useAnimation()

  const pct = isFake ? confidence : 1 - confidence
  const { primary, glow } = getColor(isFake, confidence)
  const offset = CIRCUMFERENCE - pct * CIRCUMFERENCE

  useEffect(() => {
    // Animate number counter
    let start = 0
    const end = Math.round(pct * 100)
    const step = end / 50
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setDisplayed(end); clearInterval(timer) }
      else setDisplayed(Math.round(start))
    }, 20)

    controls.start({
      strokeDashoffset: offset,
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
    })

    return () => clearInterval(timer)
  }, [confidence, isFake])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40">
        {/* Background track */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 130 130">
          <circle
            cx="65" cy="65" r={R}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />
          {/* Animated progress */}
          <motion.circle
            cx="65" cy="65" r={R}
            fill="none"
            stroke={primary}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={controls}
            style={{
              filter: `drop-shadow(0 0 8px ${glow})`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={prediction}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-black"
            style={{ color: primary }}
          >
            {displayed}%
          </motion.span>
          <span className="text-xs text-white/50 mt-0.5 font-medium tracking-wide">
            confidence
          </span>
        </div>
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase"
        style={{
          background: `${primary}18`,
          border: `1px solid ${primary}40`,
          color: primary,
          boxShadow: `0 0 16px ${glow}`,
        }}
      >
        {prediction}
      </motion.div>
    </div>
  )
}
