# DeepProof AI — Scope

## Concept
A real-time deepfake detection platform that analyzes uploaded images and videos, returning confidence scores, heatmap visualizations, and plain-English explanations of detected manipulations.

## Target User
Non-technical users (journalists, researchers, general public) who need to verify media authenticity without understanding ML.

## Core Problem
Deepfakes are increasingly indistinguishable from real media. Existing tools are either too technical, too slow, or provide no explanation.

## Unique Differentiator
Explainable AI — not just "fake" or "real" but *why*, visualized with heatmaps and artifact labels.

## MVP Features
1. Image/video upload (drag & drop)
2. Simulated deepfake detection with confidence score
3. Heatmap overlay of suspicious regions (toggleable)
4. Plain-English explanation of findings
5. Artifact labels (e.g., "GAN fingerprint", "temporal inconsistency")
6. Timeline graph for video frame-by-frame analysis
7. Browser extension for on-page media detection
8. Premium cyberpunk UI with custom cursor, particle background, glassmorphism

## What's Cut
- Real ML model training (using simulation with proper pipeline structure)
- User authentication / saved history
- Batch file processing
- Mobile app
- Real-time webcam analysis

## Tech Stack
- **Backend**: FastAPI + Python (NumPy + Pillow for simulated detection)
- **Frontend**: React 18 + Vite + Tailwind CSS + Framer Motion + Recharts
- **Extension**: Chrome MV3

## Design Direction
Apple + Tesla + Cyberpunk — dark navy background, neon cyan/purple gradients, glassmorphism panels, custom glowing cursor, particle neural network background.

## Technical Experience
Senior-level full-stack with AI/ML background.
