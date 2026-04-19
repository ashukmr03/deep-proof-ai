# DeepProof AI — Setup Guide

## Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn
- Chrome browser (for extension)

---

## 1. Backend (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn main:app --reload --port 8000
```

API will be live at: http://localhost:8000
Swagger docs: http://localhost:8000/docs

---

## 2. Frontend (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Copy env file
copy .env.example .env

# Start dev server
npm run dev
```

App will be live at: http://localhost:3000

---

## 3. Chrome Extension

1. Open Chrome → `chrome://extensions/`
2. Enable **Developer Mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `extension/` folder from this project
5. Pin the DeepProof AI extension in your toolbar
6. Visit any webpage with images/videos and click the extension icon

---

## Project Structure

```
Hackathon/
├── backend/
│   ├── main.py                  # FastAPI app entry point
│   ├── requirements.txt
│   ├── models/
│   │   └── detector.py          # Deepfake detection pipeline
│   └── routers/
│       └── detection.py         # /api/v1/analyze endpoint
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Analyze.jsx      # Upload + results
│   │   │   └── About.jsx        # How it works
│   │   └── components/
│   │       ├── CustomCursor.jsx
│   │       ├── ParticleBackground.jsx
│   │       ├── Navbar.jsx
│   │       ├── Hero.jsx
│   │       ├── UploadZone.jsx
│   │       ├── ResultsDashboard.jsx
│   │       ├── ConfidenceMeter.jsx
│   │       ├── HeatmapViewer.jsx
│   │       ├── ExplanationPanel.jsx
│   │       └── TimelineGraph.jsx
│   └── package.json
├── extension/
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   ├── popup.html / .css / .js
│   └── icons/
└── docs/
    └── scope.md
```

---

## API Reference

### POST /api/v1/analyze
Upload an image or video for deepfake analysis.

**Request:** `multipart/form-data` with `file` field

**Response:**
```json
{
  "success": true,
  "prediction": "FAKE",
  "confidence": 0.8734,
  "is_fake": true,
  "explanation": "GAN fingerprint identified in high-frequency pixel residuals...",
  "artifacts": ["GAN fingerprint", "facial blending seam"],
  "heatmap": "<base64 JPEG>",
  "timeline": [{"frame": 0, "score": 0.87, "timestamp": 0.0}, ...],
  "regions": [{"x": 0.2, "y": 0.3, "w": 0.2, "h": 0.2, "intensity": 0.9, "label": "face region"}],
  "processing_time": 1.54,
  "model_version": "DeepProof-v2.1-sim"
}
```

### GET /api/v1/stats
Platform statistics.

---

## Notes
- The detector uses deterministic simulation based on file content hashes.
  To connect a real model, replace `DeepfakeDetector.analyze()` in `backend/models/detector.py`.
- The heatmap is a composited JPEG (original + red overlay on suspicious regions).
- For video files, the backend generates a simulated frame timeline (30 fps assumed).
