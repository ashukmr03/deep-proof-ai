import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileImage, FileVideo, X, Loader2 } from 'lucide-react'

const ACCEPTED = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'video/mp4': ['.mp4'],
  'video/webm': ['.webm'],
  'video/quicktime': ['.mov'],
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function UploadZone({ onUpload, loading }) {
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((accepted) => {
    const f = accepted[0]
    if (!f) return
    setFile(f)

    // Generate preview URL
    const url = URL.createObjectURL(f)
    setPreview({ url, type: f.type.startsWith('video/') ? 'video' : 'image' })

    // Animate fake upload progress then call parent
    setProgress(0)
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 18 + 4
      if (p >= 100) {
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => onUpload(f), 200)
      } else {
        setProgress(p)
      }
    }, 80)
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED,
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024,
    disabled: loading,
  })

  const clear = (e) => {
    e.stopPropagation()
    setFile(null)
    setPreview(null)
    setProgress(0)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        {...getRootProps()}
        whileHover={{ scale: 1.01 }}
        className="relative rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: isDragActive
            ? 'rgba(0,245,255,0.08)'
            : 'rgba(255,255,255,0.03)',
          border: `2px dashed ${isDragActive ? 'rgba(0,245,255,0.7)' : 'rgba(255,255,255,0.12)'}`,
          boxShadow: isDragActive
            ? '0 0 30px rgba(0,245,255,0.2), inset 0 0 30px rgba(0,245,255,0.05)'
            : 'none',
          minHeight: 280,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {preview ? (
            /* Preview state */
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative p-4"
            >
              {!loading && (
                <button
                  onClick={clear}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white/70 hover:text-white hover:bg-red-500/70 transition-all duration-200"
                >
                  <X size={14} />
                </button>
              )}

              <div className="rounded-xl overflow-hidden mb-4" style={{ maxHeight: 220 }}>
                {preview.type === 'video' ? (
                  <video
                    src={preview.url}
                    className="w-full h-full object-cover rounded-xl"
                    style={{ maxHeight: 220 }}
                    muted
                  />
                ) : (
                  <img
                    src={preview.url}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-xl"
                    style={{ maxHeight: 220 }}
                  />
                )}
              </div>

              <div className="flex items-center gap-3 px-2">
                {preview.type === 'video'
                  ? <FileVideo size={18} className="text-purple-400 shrink-0" />
                  : <FileImage size={18} className="text-cyan-400 shrink-0" />
                }
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{file?.name}</p>
                  <p className="text-xs text-white/40">{formatSize(file?.size || 0)}</p>
                </div>
              </div>

              {/* Progress bar */}
              {progress < 100 && (
                <div className="mt-4 px-2">
                  <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #00f5ff, #7c3aed)',
                        width: `${progress}%`,
                        boxShadow: '0 0 10px rgba(0,245,255,0.6)',
                      }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-xs text-white/40 mt-1 text-right">
                    {Math.round(progress)}%
                  </p>
                </div>
              )}

              {/* Analyzing overlay */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center"
                  style={{ background: 'rgba(5,5,16,0.75)', backdropFilter: 'blur(8px)' }}
                >
                  <div className="scan-line" />
                  <Loader2 size={36} className="text-cyan-400 animate-spin mb-3" />
                  <p className="text-sm font-semibold text-cyan-400 tracking-widest uppercase">
                    Analyzing...
                  </p>
                  <p className="text-xs text-white/40 mt-1">Running deepfake detection model</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Empty state */
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-12 gap-5"
            >
              <motion.div
                animate={isDragActive ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: isDragActive
                    ? 'rgba(0,245,255,0.15)'
                    : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isDragActive ? 'rgba(0,245,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                <Upload
                  size={32}
                  className={`transition-colors duration-300 ${isDragActive ? 'text-cyan-400' : 'text-white/30'}`}
                />
              </motion.div>

              <div className="text-center">
                <p className="text-base font-semibold text-white mb-1">
                  {isDragActive ? 'Drop it here' : 'Drag & drop your media'}
                </p>
                <p className="text-sm text-white/40">
                  or <span className="text-cyan-400 font-medium">click to browse</span>
                </p>
                <p className="text-xs text-white/25 mt-3">
                  Supports JPG, PNG, WebP, MP4, WebM, MOV · Max 100 MB
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
