import { motion } from 'framer-motion'
import { RefreshCw, Download, Share2 } from 'lucide-react'
import ConfidenceMeter from './ConfidenceMeter'
import HeatmapViewer from './HeatmapViewer'
import ExplanationPanel from './ExplanationPanel'
import TimelineGraph from './TimelineGraph'
import toast from 'react-hot-toast'

const panelVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }),
}

export default function ResultsDashboard({ result, originalFile, onReset }) {
  const { prediction, confidence, is_fake, heatmap, timeline, regions, filename } = result

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `deepproof-report-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Report downloaded')
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `DeepProof AI Analysis:\nFile: ${filename}\nResult: ${prediction}\nConfidence: ${Math.round(confidence * 100)}%\n\n${result.explanation}`
    )
    toast.success('Result copied to clipboard')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 w-full max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Analysis Complete</h2>
          <p className="text-sm text-white/40 mt-0.5 font-mono truncate max-w-sm">{filename}</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Share2 size={13} />
            Share
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Download size={13} />
            Export
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: 'rgba(0,245,255,0.1)',
              border: '1px solid rgba(0,245,255,0.25)',
              color: '#00f5ff',
            }}
          >
            <RefreshCw size={13} />
            Analyze Another
          </motion.button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Confidence meter */}
        <motion.div
          custom={0}
          variants={panelVariants}
          initial="hidden"
          animate="show"
          className="glass p-6 flex flex-col items-center justify-center"
        >
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-6">
            Verdict
          </p>
          <ConfidenceMeter confidence={confidence} isFake={is_fake} prediction={prediction} />
        </motion.div>

        {/* Explanation */}
        <motion.div
          custom={1}
          variants={panelVariants}
          initial="hidden"
          animate="show"
          className="glass p-6 lg:col-span-2"
        >
          <ExplanationPanel result={result} />
        </motion.div>
      </div>

      {/* Heatmap */}
      <motion.div
        custom={2}
        variants={panelVariants}
        initial="hidden"
        animate="show"
        className="glass p-6"
      >
        <HeatmapViewer
          originalFile={originalFile}
          heatmapB64={heatmap}
          regions={regions}
          isFake={is_fake}
        />
      </motion.div>

      {/* Timeline (video only) */}
      {timeline && (
        <motion.div
          custom={3}
          variants={panelVariants}
          initial="hidden"
          animate="show"
          className="glass p-6"
        >
          <TimelineGraph timeline={timeline} />
        </motion.div>
      )}
    </motion.div>
  )
}
