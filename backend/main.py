from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Manual fallback parser for .env if dotenv package is absent
if os.path.exists(".env"):
    with open(".env", "r") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())

from app.api.endpoints import router as api_router

app = FastAPI(
    title="EarthLens AI Backend",
    description="Minimalist Space Satellite Change Detection Engine for Indian Cities",
    version="1.0.0"
)

# Enable CORS for local Vite development frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Absolute path to demo-data folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "demo-data"))
if not os.path.exists(DATA_DIR):
    DATA_DIR = os.path.abspath(os.path.join(BASE_DIR, "demo-data"))

os.makedirs(os.path.join(DATA_DIR, "output"), exist_ok=True)
app.mount("/static", StaticFiles(directory=DATA_DIR), name="static")

# Register API routes
app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "system": "EARTHLENS AI MISSION CONTROL",
        "tagline": "SEE EARTH. DETECT CHANGE. UNDERSTAND IMPACT.",
        "region": "Republic of India",
        "status": "ONLINE"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
