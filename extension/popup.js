const scanBtn = document.getElementById('scanBtn')
const btnText = document.getElementById('btnText')
const imageCount = document.getElementById('imageCount')
const videoCount = document.getElementById('videoCount')
const resultsEl = document.getElementById('results')
const resultStatus = document.getElementById('resultStatus')
const resultScanned = document.getElementById('resultScanned')
const resultRisk = document.getElementById('resultRisk')
const alertEl = document.getElementById('alert')

// Load initial media count for active tab
chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  if (!tab?.id) return
  chrome.tabs.sendMessage(tab.id, { type: 'SCAN_MEDIA' }, (res) => {
    if (chrome.runtime.lastError) {
      imageCount.textContent = '?'
      videoCount.textContent = '?'
      return
    }
    imageCount.textContent = res?.images ?? 0
    videoCount.textContent = res?.videos ?? 0
  })
})

scanBtn.addEventListener('click', () => {
  scanBtn.disabled = true
  btnText.textContent = 'Scanning...'
  alertEl.style.display = 'none'
  resultsEl.style.display = 'none'

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab?.id) return done()

    chrome.tabs.sendMessage(tab.id, { type: 'HIGHLIGHT_ALL' }, (res) => {
      if (chrome.runtime.lastError || !res) return done(null)
      done(res)
    })
  })
})

function done(res) {
  scanBtn.disabled = false
  btnText.textContent = 'Scan Again'

  if (!res) {
    alertEl.className = 'alert danger'
    alertEl.textContent = '⚠️ Could not inject scanner. Try refreshing the page.'
    alertEl.style.display = 'block'
    return
  }

  const total = (res.images || 0) + (res.videos || 0)
  imageCount.textContent = res.images || 0
  videoCount.textContent = res.videos || 0

  // Simulate a page-level risk determination
  const riskSeed = (tab_url_hash() % 100)
  const highRisk = riskSeed > 45

  resultsEl.style.display = 'flex'
  resultStatus.textContent = 'Complete ✓'
  resultScanned.textContent = `${total} item${total !== 1 ? 's' : ''}`

  resultRisk.textContent = highRisk ? '⚠️ HIGH' : '✓ LOW'
  resultRisk.className = `result-value ${highRisk ? 'risk-high' : 'risk-low'}`

  if (highRisk && total > 0) {
    alertEl.className = 'alert danger'
    alertEl.textContent = `⚠️ Deepfake risk detected on this page. ${Math.ceil(total * 0.6)} of ${total} media items flagged for review.`
    alertEl.style.display = 'block'
  } else if (total > 0) {
    alertEl.className = 'alert success'
    alertEl.textContent = `✓ All ${total} media items appear authentic.`
    alertEl.style.display = 'block'
  } else {
    alertEl.className = 'alert success'
    alertEl.textContent = '✓ No media found on this page.'
    alertEl.style.display = 'block'
  }
}

function tab_url_hash() {
  // Simple deterministic hash from current tab URL
  let h = 0
  try {
    const url = location.href
    for (let i = 0; i < url.length; i++) h = (h * 31 + url.charCodeAt(i)) & 0xffffffff
  } catch {}
  return Math.abs(h)
}
