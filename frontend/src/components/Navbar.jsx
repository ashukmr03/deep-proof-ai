import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/analyze', label: 'Analyze' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location.pathname])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div
        className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(5, 5, 16, 0.85)'
            : 'rgba(5, 5, 16, 0.6)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(0, 245, 255, 0.12)',
          boxShadow: scrolled
            ? '0 4px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,245,255,0.08)'
            : 'none',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <Shield
              size={24}
              className="text-neon-cyan transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.9)]"
            />
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm group-hover:blur-md transition-all" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            <span className="gradient-text">DeepProof</span>
            <span className="text-white/50 font-light ml-1">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = location.pathname === href
            return (
              <Link
                key={href}
                to={href}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group"
                style={{
                  color: active ? '#00f5ff' : 'rgba(255,255,255,0.65)',
                }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors">
                  {label}
                </span>
                {/* Hover bg */}
                <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-all duration-300" />
                {/* Active indicator */}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: '#00f5ff', boxShadow: '0 0 8px rgba(0,245,255,0.8)' }}
                  />
                )}
                {/* Hover underline */}
                {!active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full bg-white/30 group-hover:w-4 transition-all duration-300" />
                )}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/analyze">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-white text-xs px-5 py-2.5"
            >
              Analyze Media
            </motion.button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-0 p-4 rounded-2xl"
            style={{
              background: 'rgba(5,5,16,0.95)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,245,255,0.12)',
            }}
          >
            {links.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                {label}
              </Link>
            ))}
            <Link to="/analyze" className="block mt-2">
              <button className="btn-primary w-full text-white text-xs py-3">
                Analyze Media
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
