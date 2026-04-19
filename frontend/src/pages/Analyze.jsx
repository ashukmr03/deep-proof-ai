import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Shield } from 'lucide-react'
import UploadZone from '../components/UploadZone'
import ResultsDashboard from '../components/ResultsDashboard'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function Analyze() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [originalFile, setOriginalFile] = useState(null)

  const handleUpload = async (file) => {
    setLoading(true)
    setOriginalFile(file)
    setResult(null)

    const form = new FormData()
    form.append('file', file)

    try {
      const { data } = await axios.post(`${API}/api/v1/analyze`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setResult(data)
      toast.success(
        data.is_fake
          ? '⚠️ Deepfake detected with high confidence'
          : '✓ Media appears authentic',
        { duration: 5000 }
      )
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Analysis failed. Is the backend running?'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setOriginalFile(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 min-h-screen pt-32 pb-20 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)', color: '#00f5ff' }}>
            <Shield size={12} />
            Real-Time Detection
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Analyze <span className="gradient-text">Media</span>
          </h1>
          <p className="text-white/50 max-w-lg mx-auto text-sm">
            Upload an image or video to check for deepfake artifacts. Results include confidence score, visual heatmap, and plain-English explanation.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <UploadZone onUpload={handleUpload} loading={loading} />

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 max-w-2xl mx-auto"
              >
                <p className="text-xs text-white/25 text-center font-mono">
                  SUPPORTED: JPG · PNG · WebP · MP4 · WebM · MOV &nbsp;·&nbsp; MAX 100 MB
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsDashboard
                result={result}
                originalFile={originalFile}
                onReset={reset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
