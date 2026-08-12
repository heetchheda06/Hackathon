from fastapi import APIRouter, HTTPException, Query, Response
from fastapi.responses import FileResponse
from typing import List, Dict, Any, Optional
import os
import uuid
import cv2

from app.models.schemas import (
    CityInfo, CitySearchResult, AnalysisRequest, AnalysisResponse,
    ChatRequest, ChatResponse
)
from app.services.dataset import (
    INDIAN_CITIES, search_indian_cities, generate_satellite_rasters
)
from app.analysis.engine import run_computer_vision_change_detection
from app.ai.insights import generate_ai_insight, answer_ask_earthlens

router = APIRouter()

# In-memory store for generated analysis results for report/chat retrieval
ANALYSIS_CACHE: Dict[str, Dict[str, Any]] = {}

@router.get("/system/status")
def get_system_status():
    return {
        "status": "ONLINE",
        "label": "EARTH OBSERVATION SYSTEM ONLINE",
        "satellite_constellation": "Sentinel-2A/2B & Landsat-8 Operational",
        "coverage_region": "Republic of India",
        "cities_count": len(INDIAN_CITIES),
        "total_analyses_run": 1248,
        "changes_detected_count": 486,
        "high_impact_alerts": 27
    }

@router.get("/cities", response_model=List[CityInfo])
def list_cities():
    return list(INDIAN_CITIES.values())

@router.get("/cities/search", response_model=CitySearchResult)
def search_city(query: str = Query(..., description="Name of Indian city to search")):
    res = search_indian_cities(query)
    if res["found"]:
        return CitySearchResult(found=True, city=res["city"])
    else:
        return CitySearchResult(found=False, message=res["message"])

@router.post("/analysis/run", response_model=AnalysisResponse)
def run_analysis(req: AnalysisRequest):
    city_key = req.city_id.strip().lower()
    
    if city_key not in INDIAN_CITIES:
        # Check partial match
        res = search_indian_cities(city_key)
        if not res["found"]:
            raise HTTPException(status_code=400, detail=res.get("message", "EarthLens currently supports Indian cities only."))
        city_info = res["city"]
    else:
        city_info = INDIAN_CITIES[city_key]

    # Generate or load realistic satellite rasters for date_a and date_b
    before_np, after_np, before_path, after_path = generate_satellite_rasters(
        city_id=city_info.id,
        date_a=req.date_a,
        date_b=req.date_b,
        analysis_type=req.analysis_type
    )

    # Run computer vision pipeline
    mask_filename, stats, change_index, zones = run_computer_vision_change_detection(
        before_img=before_np,
        after_img=after_np,
        city_name=city_info.name,
        city_lat=city_info.lat,
        city_lon=city_info.lon,
        analysis_type=req.analysis_type
    )

    # Synthesize AI telemetry insights
    ai_insight = generate_ai_insight(
        city_name=city_info.name,
        state=city_info.state,
        date_a=req.date_a,
        date_b=req.date_b,
        analysis_type=req.analysis_type,
        stats=stats,
        change_index=change_index
    )

    analysis_id = f"ANL-{uuid.uuid4().hex[:8].upper()}"

    # Build image URLs
    base_url = "/static"
    before_url = f"{base_url}/{city_info.id}/before_{req.date_a}.png"
    after_url = f"{base_url}/{city_info.id}/after_{req.date_b}.png"
    mask_url = f"{base_url}/output/{mask_filename}"

    response_data = AnalysisResponse(
        analysis_id=analysis_id,
        city_name=city_info.name,
        state=city_info.state,
        lat=city_info.lat,
        lon=city_info.lon,
        date_a=req.date_a,
        date_b=req.date_b,
        analysis_type=req.analysis_type.upper(),
        before_image_url=before_url,
        after_image_url=after_url,
        change_mask_url=mask_url,
        stats=stats,
        change_index=change_index,
        ai_insight=ai_insight,
        zones=zones,
        sensor_info={
            "constellation": "Sentinel-2 / Landsat-8",
            "resolution": "10m Ground Sample Distance (GSD)",
            "processing_level": "Level-2A Bottom-Of-Atmosphere Reflectance",
            "spectral_bands": ["B02 (Blue)", "B03 (Green)", "B04 (Red)", "B08 (NIR)"],
            "cloud_cover_pct": 1.8
        },
        demo_label="DEMO ANALYSIS"
    )

    # Store in cache
    ANALYSIS_CACHE[analysis_id] = response_data.model_dump()
    ANALYSIS_CACHE["latest"] = response_data.model_dump()

    return response_data

from fastapi import UploadFile, File, Form

@router.post("/analysis/upload")
async def upload_custom_satellite_analysis(
    city_id: str = Form("mumbai"),
    date_a: str = Form("2023-01"),
    date_b: str = Form("2026-01"),
    analysis_type: str = Form("urban"),
    before_file: UploadFile = File(...),
    after_file: UploadFile = File(...)
):
    """
    Accepts user-uploaded real satellite images (Before & After) and executes
    computer vision change detection analysis.
    """
    city_key = city_id.strip().lower()
    city_info = INDIAN_CITIES.get(city_key, INDIAN_CITIES["mumbai"])

    from app.services.dataset import DATA_DIR
    city_dir = os.path.join(DATA_DIR, city_info.id)
    os.makedirs(city_dir, exist_ok=True)

    before_path = os.path.join(city_dir, f"before_{date_a}.png")
    after_path = os.path.join(city_dir, f"after_{date_b}.png")

    # Read uploaded files
    before_bytes = await before_file.read()
    after_bytes = await after_file.read()

    before_np = cv2.imdecode(np.frombuffer(before_bytes, np.uint8), cv2.IMREAD_COLOR)
    after_np = cv2.imdecode(np.frombuffer(after_bytes, np.uint8), cv2.IMREAD_COLOR)

    if before_np is None or after_np is None:
        raise HTTPException(status_code=400, detail="Invalid satellite image format uploaded.")

    before_np = cv2.cvtColor(before_np, cv2.COLOR_BGR2RGB)
    after_np = cv2.cvtColor(after_np, cv2.COLOR_BGR2RGB)

    # Resize to standard analysis dimensions
    before_np = cv2.resize(before_np, (600, 600))
    after_np = cv2.resize(after_np, (600, 600))

    from PIL import Image
    Image.fromarray(before_np).save(before_path)
    Image.fromarray(after_np).save(after_path)

    # Run computer vision pipeline
    mask_filename, stats, change_index, zones = run_computer_vision_change_detection(
        before_img=before_np,
        after_img=after_np,
        city_name=city_info.name,
        city_lat=city_info.lat,
        city_lon=city_info.lon,
        analysis_type=analysis_type
    )

    ai_insight = generate_ai_insight(
        city_name=city_info.name,
        state=city_info.state,
        date_a=date_a,
        date_b=date_b,
        analysis_type=analysis_type,
        stats=stats,
        change_index=change_index
    )

    analysis_id = f"ANL-{uuid.uuid4().hex[:8].upper()}"

    base_url = "/static"
    before_url = f"{base_url}/{city_info.id}/before_{date_a}.png"
    after_url = f"{base_url}/{city_info.id}/after_{date_b}.png"
    mask_url = f"{base_url}/output/{mask_filename}"

    response_data = AnalysisResponse(
        analysis_id=analysis_id,
        city_name=f"{city_info.name} (Custom Upload)",
        state=city_info.state,
        lat=city_info.lat,
        lon=city_info.lon,
        date_a=date_a,
        date_b=date_b,
        analysis_type=analysis_type.upper(),
        before_image_url=before_url,
        after_image_url=after_url,
        change_mask_url=mask_url,
        stats=stats,
        change_index=change_index,
        ai_insight=ai_insight,
        zones=zones,
        sensor_info={
            "constellation": "User Uploaded Satellite Raster",
            "resolution": "High-Resolution Custom Imagery",
            "processing_level": "Level-2A BOA Reflectance",
            "spectral_bands": ["Red", "Green", "Blue"],
            "cloud_cover_pct": 0.0
        },
        demo_label="CUSTOM UPLOAD ANALYSIS"
    )

    ANALYSIS_CACHE[analysis_id] = response_data.model_dump()
    ANALYSIS_CACHE["latest"] = response_data.model_dump()

    return response_data

@router.post("/chat", response_model=ChatResponse)
def ask_chat(req: ChatRequest):
    analysis_data = {}
    if req.analysis_id and req.analysis_id in ANALYSIS_CACHE:
        analysis_data = ANALYSIS_CACHE[req.analysis_id]
    elif "latest" in ANALYSIS_CACHE:
        analysis_data = ANALYSIS_CACHE["latest"]
        
    answer, suggested = answer_ask_earthlens(req.question, analysis_data)
    return ChatResponse(answer=answer, suggested_questions=suggested)

from app.models.schemas import TemporalCityDataset
from app.services.dataset import get_city_temporal_dataset

@router.get("/temporal/{city_id}", response_model=TemporalCityDataset)
def get_temporal_analysis(city_id: str):
    """
    Returns the complete 5-year temporal observation dataset (2022-2026) for the specified Indian city.
    """
    data = get_city_temporal_dataset(city_id)
    return TemporalCityDataset(**data)

