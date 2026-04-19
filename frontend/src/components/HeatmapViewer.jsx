import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Layers } from 'lucide-react'

export default function HeatmapViewer({ originalFile, heatmapB64, regions, isFake }) {
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [originalUrl] = useState(() =>
    originalFile ? URL.createObjectURL(originalFile) : null
  )
  const isVideo = originalFile?.type?.startsWith('video/')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-cyan-400" />
          <span className="text-sm font-semibold text-white">Heatmap Analysis</span>
        </div>
        {isFake && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHeatmap(!showHeatmap)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{
              background: showHeatmap ? 'rgba(0,245,255,0.12)' : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: showHeatmap ? '#00f5ff' : 'rgba(255,255,255,0.5)',
            }}
          >
            {showHeatmap ? <Eye size={12} /> : <EyeOff size={12} />}
            {showHeatmap ? 'Heatmap ON' : 'Heatmap OFF'}
          </motion.button>
        )}
      </div>

      <div className="relative rounded-xl overflow-hidden bg-black/30" style={{ minHeight: 200 }}>
        {/* Original */}
        {originalUrl && !isVideo && (
          <img
            src={originalUrl}
            alt="Original"
            className="w-full object-contain"
            style={{ maxHeight: 340 }}
          />
        )}
        {originalUrl && isVideo && (
          <video
            src={originalUrl}
            className="w-full object-contain"
            style={{ maxHeight: 340 }}
            muted
            controls
          />
        )}
        {!originalUrl && (
          <div className="w-full h-48 flex items-center justify-center text-white/30 text-sm">
            No preview available
          </div>
        )}

        {/* Heatmap overlay */}
        <AnimatePresence>
          {isFake && heatmapB64 && showHeatmap && !isVideo && (
            <motion.img
              key="heatmap"
              src={`data:image/jpeg;base64,${heatmapB64}`}
              alt="Heatmap overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full object-contain"
            />
          )}
        </AnimatePresence>

        {/* Region labels */}
        {isFake && showHeatmap && regions?.length > 0 && !isVideo && (
          <div className="absolute inset-0 pointer-events-none">
            {regions.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.6 }}
                className="absolute"
                style={{
                  left: `${r.x * 100}%`,
                  top: `${r.y * 100}%`,
                  width: `${r.w * 100}%`,
                  height: `${r.h * 100}%`,
                  border: `1px solid rgba(239,68,68,${r.intensity * 0.7})`,
                  borderRadius: 4,
                  boxShadow: `0 0 8px rgba(239,68,68,${r.intensity * 0.4})`,
                }}
              >
                <span
                  className="absolute -top-5 left-0 text-[10px] font-mono px-1.5 py-0.5 rounded whitespace-nowrap"
                  style={{ background: 'rgba(239,68,68,0.85)', color: '#fff' }}
                >
                  {r.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Scan line animation if fake */}
        {isFake && showHeatmap && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
            <div className="scan-line" />
          </div>
        )}
      </div>

      {!isFake && (
        <div className="flex items-center gap-2 p-3 rounded-xl"
          style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
          <span className="text-green-400 text-xs font-medium">✓ No suspicious regions detected</span>
        </div>
      )}
    </div>
  )
}
