// Background service worker — handles messages from popup and content scripts

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GET_MEDIA_COUNT') {
    chrome.tabs.sendMessage(sender.tab?.id || msg.tabId, { type: 'SCAN_MEDIA' }, (res) => {
      sendResponse(res || { images: 0, videos: 0 })
    })
    return true // keep channel open for async response
  }

  if (msg.type === 'SCAN_TAB') {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (!tab) return sendResponse({ error: 'No active tab' })
      chrome.tabs.sendMessage(tab.id, { type: 'SCAN_MEDIA' }, (res) => {
        sendResponse(res || { images: 0, videos: 0 })
      })
    })
    return true
  }

  if (msg.type === 'HIGHLIGHT_MEDIA') {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (!tab) return
      chrome.tabs.sendMessage(tab.id, { type: 'HIGHLIGHT_ALL' })
    })
    sendResponse({ ok: true })
  }
})

// Badge: show media count when tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.startsWith('http')) {
    chrome.tabs.sendMessage(tabId, { type: 'SCAN_MEDIA' }, (res) => {
      if (chrome.runtime.lastError) return
      const count = (res?.images || 0) + (res?.videos || 0)
      chrome.action.setBadgeText({ text: count > 0 ? String(count) : '', tabId })
      chrome.action.setBadgeBackgroundColor({ color: '#00f5ff', tabId })
    })
  }
})
