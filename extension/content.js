// Content script — scans DOM for images/videos and injects alert badges

const BADGE_CLASS = 'deepproof-badge'
const STYLE_ID = 'deepproof-styles'

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    .deepproof-wrapper {
      position: relative;
      display: inline-block;
    }
    .deepproof-badge {
      position: absolute;
      top: 6px;
      right: 6px;
      z-index: 99999;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      font-family: 'Inter', system-ui, sans-serif;
      letter-spacing: 0.04em;
      pointer-events: none;
      animation: dp-fadein 0.4s ease-out;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    .deepproof-badge.scanning {
      background: rgba(59,130,246,0.85);
      border: 1px solid rgba(59,130,246,0.6);
      color: #fff;
    }
    .deepproof-badge.fake {
      background: rgba(239,68,68,0.88);
      border: 1px solid rgba(239,68,68,0.6);
      color: #fff;
      box-shadow: 0 0 12px rgba(239,68,68,0.5);
    }
    .deepproof-badge.real {
      background: rgba(34,197,94,0.85);
      border: 1px solid rgba(34,197,94,0.5);
      color: #fff;
    }
    .deepproof-highlight-fake {
      outline: 2px solid rgba(239,68,68,0.7) !important;
      box-shadow: 0 0 16px rgba(239,68,68,0.4) !important;
    }
    .deepproof-highlight-real {
      outline: 2px solid rgba(34,197,94,0.5) !important;
    }
    @keyframes dp-fadein {
      from { opacity: 0; transform: translateY(-4px) scale(0.9); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
  `
  document.head.appendChild(style)
}

function getMediaElements() {
  const images = [...document.querySelectorAll('img')]
    .filter(img => img.naturalWidth > 100 && img.naturalHeight > 100 && !img.closest('.' + BADGE_CLASS))
  const videos = [...document.querySelectorAll('video')]
    .filter(v => !v.closest('.' + BADGE_CLASS))
  return { images, videos }
}

function simulateDetect(el) {
  // Deterministic simulation based on element src hash
  const src = el.src || el.currentSrc || el.getAttribute('poster') || Math.random().toString()
  let hash = 0
  for (let i = 0; i < src.length; i++) hash = (hash * 31 + src.charCodeAt(i)) & 0xffffffff
  const score = ((hash >>> 0) % 1000) / 1000
  const isFake = score > 0.55
  const confidence = isFake
    ? Math.round(60 + (score - 0.55) * 80)
    : Math.round(60 + (0.55 - score) * 80)
  return { isFake, confidence: Math.min(confidence, 98) }
}

function wrapElement(el) {
  if (el.dataset.deepproofProcessed) return
  el.dataset.deepproofProcessed = '1'

  const parent = el.parentElement
  if (!parent || parent.classList.contains('deepproof-wrapper')) return

  const wrapper = document.createElement('div')
  wrapper.className = 'deepproof-wrapper'
  wrapper.style.display = window.getComputedStyle(el).display === 'block' ? 'block' : 'inline-block'

  parent.insertBefore(wrapper, el)
  wrapper.appendChild(el)

  // Scanning badge
  const badge = document.createElement('div')
  badge.className = `${BADGE_CLASS} scanning`
  badge.textContent = '🔍 Scanning...'
  wrapper.appendChild(badge)

  // Simulate async analysis
  setTimeout(() => {
    const { isFake, confidence } = simulateDetect(el)
    badge.className = `${BADGE_CLASS} ${isFake ? 'fake' : 'real'}`
    badge.textContent = isFake
      ? `⚠️ FAKE ${confidence}%`
      : `✓ REAL ${confidence}%`
    el.classList.add(isFake ? 'deepproof-highlight-fake' : 'deepproof-highlight-real')
  }, 800 + Math.random() * 1200)
}

function scanPage() {
  injectStyles()
  const { images, videos } = getMediaElements()
  images.forEach(wrapElement)
  videos.forEach(wrapElement)
  return { images: images.length, videos: videos.length }
}

// Listen for messages from popup / background
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'SCAN_MEDIA') {
    const { images, videos } = getMediaElements()
    sendResponse({ images: images.length, videos: videos.length })
  }
  if (msg.type === 'HIGHLIGHT_ALL') {
    const result = scanPage()
    sendResponse(result)
  }
})
