# 🌍 EARTHLENS AI

> **SEE EARTH. DETECT CHANGE. UNDERSTAND IMPACT.**

AI-powered satellite intelligence and multi-spectral change detection platform built specifically for India's rapidly evolving cities.

---

## 🚀 Key Features

- 🇮🇳 **Exclusively Focused on Indian Cities**: Supports 20+ major metropolitan centers including Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Surat, Jaipur, Lucknow, Kochi, and more. Non-Indian city queries trigger an immediate geographic scope notification.
- 🛸 **Minimalist Aerospace Mission-Control Aesthetics**: Deep space dark mode (`#020611`), JetBrains Mono telemetry typography, and live satellite constellation status (`● EARTH OBSERVATION SYSTEM ONLINE`).
- 🔬 **Real Computer Vision Engine**: OpenCV / NumPy spectral differencing pipeline calculating NDVI vegetation deltas, NDWI hydrological reflectivity shifts, urban built-up expansion indices, and affected land surface areas in km².
- 📊 **Interactive Split-View Satellite Slider**: Smooth drag comparison slider between baseline (Date A) and target (Date B) observation windows with Change Mask overlay.
- ⚡ **EarthLens Change Index (0-100)**: Internal analytical impact indicator with standard scientific disclaimers.
- 🤖 **Ask EarthLens AI Assistant**: Grounded natural language Q&A assistant answering questions strictly based on current satellite telemetry.
- 📄 **Mission Report Generator**: Comprehensive printable and PDF-exportable mission reports with confidence metrics and legal disclaimers.
- 🛡️ **Zero External Service Requirement**: Operates 100% locally out-of-the-box without requiring API keys, paid accounts, or external services.

---

## 🏗️ Quick Start

### 1. Backend (Python + FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
pip install -r requirements.txt
python main.py
```
Backend runs on `http://localhost:8000`.

### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

---

## 🛡️ Responsible AI & Disclaimer

«AI-generated analysis is an analytical aid and should be independently verified before operational decision-making.»
«EarthLens Change Index is an internal analytical indicator and is not an official scientific standard.»
