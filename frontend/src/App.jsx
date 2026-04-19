import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import ParticleBackground from './components/ParticleBackground'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import About from './pages/About'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900 text-white overflow-x-hidden">
        <ParticleBackground />
        <CustomCursor />
        <Navbar />
        <AnimatedRoutes />
        <Toaster
          position="top-right"
          gutter={12}
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(10, 10, 31, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 245, 255, 0.25)',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              iconTheme: { primary: '#00f5ff', secondary: '#050510' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#050510' },
            },
          }}
        />
      </div>
    </Router>
  )
}
