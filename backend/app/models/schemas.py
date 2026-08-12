from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class CityInfo(BaseModel):
    id: str
    name: str
    state: str
    lat: float
    lon: float
    satellite_coverage: str
    available_years: List[str]
    analysis_types: List[str]
    description: str

class CitySearchResult(BaseModel):
    found: bool
    city: Optional[CityInfo] = None
    message: Optional[str] = None

class AnalysisRequest(BaseModel):
    city_id: str
    date_a: str = Field(..., example="2023-01")
    date_b: str = Field(..., example="2026-01")
    analysis_type: str = Field(default="auto", example="urban")

class ZoneMetric(BaseModel):
    zone_id: str
    name: str
    change_type: str
    area_km2: float
    confidence_pct: int
    severity: str  # LOW, MODERATE, HIGH, CRITICAL
    coordinates: List[List[float]]  # [lat, lon] array for map overlay
    bounding_box: List[float]  # [min_lat, min_lon, max_lat, max_lon]

class ChangeStats(BaseModel):
    urban_change_pct: float
    vegetation_change_pct: float
    water_change_pct: float
    infrastructure_change_pct: float
    total_affected_area_km2: float

class EarthLensChangeIndex(BaseModel):
    score: int  # 0 to 100
    rating: str  # LOW, MODERATE, HIGH, CRITICAL
    disclaimer: str = "EarthLens Change Index is an internal analytical indicator and is not an official scientific standard."

class AIInsight(BaseModel):
    summary: str
    primary_finding: str
    concentrated_region: str
    recommended_action: str
    scientific_breakdown: List[str]

class AnalysisResponse(BaseModel):
    analysis_id: str
    city_name: str
    state: str
    lat: float
    lon: float
    date_a: str
    date_b: str
    analysis_type: str
    before_image_url: str
    after_image_url: str
    change_mask_url: str
    stats: ChangeStats
    change_index: EarthLensChangeIndex
    ai_insight: AIInsight
    zones: List[ZoneMetric]
    sensor_info: Dict[str, Any]
    demo_label: str = "DEMO ANALYSIS"

class ChatRequest(BaseModel):
    analysis_id: Optional[str] = None
    city_id: Optional[str] = None
    question: str

class ChatResponse(BaseModel):
    answer: str
    suggested_questions: List[str]

class TemporalYearData(BaseModel):
    year: int
    label: str
    urban_change_pct: float
    vegetation_change_pct: float
    water_change_pct: float
    infrastructure_change_pct: float
    total_area_km2: float
    change_index_score: int
    change_index_rating: str
    insight: str
    image_url: str
    overlay_polygons: List[Dict[str, Any]] = []

class FiveYearEvolutionSummary(BaseModel):
    start_year: int = 2022
    end_year: int = 2026
    urban_total_pct: float
    vegetation_total_pct: float
    water_total_pct: float
    infrastructure_total_pct: float
    overall_change_index: int
    overall_severity: str
    summary: str

class TemporalCityDataset(BaseModel):
    city_id: str
    city_name: str
    state: str
    lat: float
    lon: float
    mode: str = "DEMO ANALYSIS"
    years: Dict[str, TemporalYearData]
    five_year_evolution: FiveYearEvolutionSummary
    disclaimer: str = "AI-generated analysis is an analytical aid and should be independently verified before operational decision-making."

