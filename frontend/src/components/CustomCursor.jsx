import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Outer ring: soft spring (trails behind)
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 28 })
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 28 })

  // Inner dot: stiff spring (near-instant follow)
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 60 })
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 60 })

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    const over = (e) => {
      const el = e.target
      const clickable = el.closest('a, button, [role="button"], input, label, select, [data-cursor="pointer"]')
      setIsPointer(!!clickable)
    }
    const down = () => setIsClicking(true)
    const up = () => setIsClicking(false)
    const leave = () => setIsHidden(true)
    const enter = () => setIsHidden(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [])

  const ringSize = isClicking ? 28 : isPointer ? 50 : 36
  const ringColor = isPointer ? 'rgba(124,58,237,0.9)' : 'rgba(0,245,255,0.8)'
  const glowColor = isPointer ? 'rgba(124,58,237,0.4)' : 'rgba(0,245,255,0.3)'

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: ringSize,
          height: ringSize,
          border: `1.5px solid ${ringColor}`,
          boxShadow: `0 0 12px ${glowColor}, 0 0 24px ${glowColor}`,
          opacity: isHidden ? 0 : 1,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s',
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: isClicking ? 4 : 6,
          height: isClicking ? 4 : 6,
          background: ringColor,
          boxShadow: `0 0 8px ${glowColor}`,
          opacity: isHidden ? 0 : 1,
          transition: 'width 0.1s, height 0.1s, background 0.2s',
        }}
      />
    </>
  )
}
