// EarthLens AI - Multi-Year Indian Cities Temporal Dataset (2022-2026)
// Zero external credentials required. Demo-first architecture.

export const INDIAN_TEMPORAL_DATA = {
  mumbai: {
    cityId: "mumbai",
    cityName: "Mumbai",
    state: "Maharashtra",
    lat: 19.0760,
    lon: 72.8777,
    mode: "DEMO ANALYSIS",
    description: "Financial capital with intense coastal development, mangrove fringe dynamics, and transit corridor growth.",
    fiveYearEvolution: {
      startYear: 2022,
      endYear: 2026,
      urbanTotalPct: 18.4,
      vegetationTotalPct: -9.2,
      waterTotalPct: -3.1,
      infrastructureTotalPct: 8.9,
      overallChangeIndex: 72,
      overallSeverity: "HIGH",
      summary: "Over the 2022-2026 observation cycle, Mumbai experienced an estimated cumulative urban expansion of +18.4% and net vegetation canopy shift of -9.2%, concentrated primarily along eastern transit spines and suburban reclamation fringes."
    },
    years: {
      2022: {
        year: 2022,
        label: "Baseline Observation",
        urbanChangePct: 0.0,
        vegetationChangePct: 0.0,
        waterChangePct: 0.0,
        infrastructureChangePct: 0.0,
        totalAreaKm2: 0.0,
        changeIndexScore: 0,
        changeIndexRating: "BASELINE",
        insight: "Baseline multi-spectral Earth observation established for Mumbai metropolitan region. Coastal wetlands and urban core stabilized.",
        image: "/static/mumbai/before_2023-01.png",
        overlayPolygons: []
      },
      2023: {
        year: 2023,
        label: "Year 2023",
        urbanChangePct: 4.8,
        vegetationChangePct: -1.7,
        waterChangePct: -0.5,
        infrastructureChangePct: 2.1,
        totalAreaKm2: 8.9,
        changeIndexScore: 23,
        changeIndexRating: "LOW",
        insight: "Early-phase built-up expansion (+4.8%) detected near Navi Mumbai airport corridor and Eastern Freeway extension.",
        image: "/static/mumbai/before_2023-01.png",
        overlayPolygons: [
          {
            id: "MUM-23-A",
            label: "Navi Mumbai Coastal Works",
            type: "infrastructure",
            severity: "LOW",
            points: "55%,32% 70%,30% 75%,48% 58%,52%"
          }
        ]
      },
      2024: {
        year: 2024,
        label: "Year 2024",
        urbanChangePct: 8.7,
        vegetationChangePct: -4.2,
        waterChangePct: -1.8,
        infrastructureChangePct: 4.3,
        totalAreaKm2: 16.2,
        changeIndexScore: 42,
        changeIndexRating: "MODERATE",
        insight: "Localized urban consolidation and mangrove canopy reduction (-4.2%) observed along creek interfaces and transit corridors.",
        image: "/static/mumbai/after_2026-01.png",
        overlayPolygons: [
          {
            id: "MUM-24-A",
            label: "Thane Creek Peripheral Sprawl",
            type: "urban",
            severity: "MODERATE",
            points: "52%,25% 78%,22% 82%,45% 56%,48%"
          },
          {
            id: "MUM-24-B",
            label: "Mangrove Fringe Reduction",
            type: "vegetation",
            severity: "MODERATE",
            points: "25%,60% 40%,58% 42%,75% 28%,78%"
          }
        ]
      },
      2025: {
        year: 2025,
        label: "Year 2025",
        urbanChangePct: 13.1,
        vegetationChangePct: -6.8,
        waterChangePct: -2.4,
        infrastructureChangePct: 6.5,
        totalAreaKm2: 24.5,
        changeIndexScore: 58,
        changeIndexRating: "MODERATE",
        insight: "Accelerating infrastructure development (+6.5%) with new arterial link road construction and land conversion.",
        image: "/static/mumbai/after_2026-01.png",
        overlayPolygons: [
          {
            id: "MUM-25-A",
            label: "Major Commercial Corridor",
            type: "urban",
            severity: "HIGH",
            points: "48%,20% 85%,18% 88%,52% 50%,55%"
          },
          {
            id: "MUM-25-B",
            label: "Wetland Inundation Shift",
            type: "water",
            severity: "MODERATE",
            points: "22%,55% 42%,52% 45%,80% 24%,82%"
          }
        ]
      },
      2026: {
        year: 2026,
        label: "Year 2026",
        urbanChangePct: 18.4,
        vegetationChangePct: -9.2,
        waterChangePct: -3.1,
        infrastructureChangePct: 8.9,
        totalAreaKm2: 34.0,
        changeIndexScore: 72,
        changeIndexRating: "HIGH",
        insight: "Highest cumulative change observed across the 5-year observation cycle, indicating substantial built-up surface expansion (+18.4%).",
        image: "/static/mumbai/after_2026-01.png",
        overlayPolygons: [
          {
            id: "MUM-26-A",
            label: "Primary Urban Sprawl Cluster",
            type: "urban",
            severity: "HIGH",
            points: "45%,15% 90%,12% 94%,58% 48%,62%"
          },
          {
            id: "MUM-26-B",
            label: "Canopy Depletion Zone",
            type: "vegetation",
            severity: "HIGH",
            points: "20%,50% 45%,48% 48%,85% 22%,88%"
          }
        ]
      }
    }
  },

  delhi: {
    cityId: "delhi",
    cityName: "Delhi (NCR)",
    state: "NCT Delhi",
    lat: 28.6139,
    lon: 77.2090,
    mode: "DEMO ANALYSIS",
    description: "National capital region showing suburban fringe sprawl in Dwarka, Noida, Gurugram and Yamuna floodplain modifications.",
    fiveYearEvolution: {
      startYear: 2022,
      endYear: 2026,
      urbanTotalPct: 21.2,
      vegetationTotalPct: -11.4,
      waterTotalPct: -4.2,
      infrastructureTotalPct: 10.5,
      overallChangeIndex: 78,
      overallSeverity: "HIGH",
      summary: "Across 2022-2026, Delhi NCR registered +21.2% urban sprawl across outer expressway sectors alongside -11.4% agrarian land conversion."
    },
    years: {
      2022: {
        year: 2022,
        label: "Baseline Observation",
        urbanChangePct: 0.0,
        vegetationChangePct: 0.0,
        waterChangePct: 0.0,
        infrastructureChangePct: 0.0,
        totalAreaKm2: 0.0,
        changeIndexScore: 0,
        changeIndexRating: "BASELINE",
        insight: "Baseline multi-spectral observation established for NCT Delhi and Yamuna river corridor.",
        image: "/static/delhi/before_2023-01.png",
        overlayPolygons: []
      },
      2023: {
        year: 2023,
        label: "Year 2023",
        urbanChangePct: 5.4,
        vegetationChangePct: -2.3,
        waterChangePct: -0.8,
        infrastructureChangePct: 2.8,
        totalAreaKm2: 11.2,
        changeIndexScore: 26,
        changeIndexRating: "MODERATE",
        insight: "Initial suburban expressway expansion and logistical park development detected in Dwarka Expressway belt.",
        image: "/static/delhi/before_2023-01.png",
        overlayPolygons: [
          {
            id: "DEL-23-A",
            label: "Dwarka Expressway Corridor",
            type: "infrastructure",
            severity: "LOW",
            points: "50%,30% 75%,28% 80%,45% 55%,48%"
          }
        ]
      },
      2024: {
        year: 2024,
        label: "Year 2024",
        urbanChangePct: 10.1,
        vegetationChangePct: -5.6,
        waterChangePct: -1.9,
        infrastructureChangePct: 5.2,
        totalAreaKm2: 21.0,
        changeIndexScore: 47,
        changeIndexRating: "MODERATE",
        insight: "Dense residential construction and tree cover fragmentation detected along Yamuna eastern floodplains.",
        image: "/static/delhi/after_2026-01.png",
        overlayPolygons: [
          {
            id: "DEL-24-A",
            label: "Yamuna Eastern Sprawl",
            type: "urban",
            severity: "MODERATE",
            points: "45%,22% 82%,20% 86%,50% 48%,52%"
          }
        ]
      },
      2025: {
        year: 2025,
        label: "Year 2025",
        urbanChangePct: 15.6,
        vegetationChangePct: -8.7,
        waterChangePct: -3.1,
        infrastructureChangePct: 7.9,
        totalAreaKm2: 32.4,
        changeIndexScore: 64,
        changeIndexRating: "HIGH",
        insight: "High-density concrete reflectance gain across industrial clusters and transit loop intersections.",
        image: "/static/delhi/after_2026-01.png",
        overlayPolygons: [
          {
            id: "DEL-25-A",
            label: "Industrial Cluster Growth",
            type: "urban",
            severity: "HIGH",
            points: "40%,18% 88%,15% 92%,55% 42%,58%"
          }
        ]
      },
      2026: {
        year: 2026,
        label: "Year 2026",
        urbanChangePct: 21.2,
        vegetationChangePct: -11.4,
        waterChangePct: -4.2,
        infrastructureChangePct: 10.5,
        totalAreaKm2: 44.1,
        changeIndexScore: 78,
        changeIndexRating: "HIGH",
        insight: "Substantial regional land-use conversion with highest cumulative urban expansion score recorded.",
        image: "/static/delhi/after_2026-01.png",
        overlayPolygons: [
          {
            id: "DEL-26-A",
            label: "Major NCR Expansion Zone",
            type: "urban",
            severity: "HIGH",
            points: "38%,12% 92%,10% 95%,60% 40%,62%"
          }
        ]
      }
    }
  },

  bengaluru: {
    cityId: "bengaluru",
    cityName: "Bengaluru",
    state: "Karnataka",
    lat: 12.9716,
    lon: 77.5946,
    mode: "DEMO ANALYSIS",
    description: "Silicon Valley of India with tech corridor sprawl along Outer Ring Road, Sarjapur, and lake catchment changes.",
    fiveYearEvolution: {
      startYear: 2022,
      endYear: 2026,
      urbanTotalPct: 19.8,
      vegetationTotalPct: -12.6,
      waterTotalPct: -5.4,
      infrastructureTotalPct: 9.7,
      overallChangeIndex: 76,
      overallSeverity: "HIGH",
      summary: "Bengaluru demonstrated rapid peripheral tech sprawl (+19.8%) and -12.6% green canopy reduction around lake catchments between 2022 and 2026."
    },
    years: {
      2022: {
        year: 2022,
        label: "Baseline Observation",
        urbanChangePct: 0.0,
        vegetationChangePct: 0.0,
        waterChangePct: 0.0,
        infrastructureChangePct: 0.0,
        totalAreaKm2: 0.0,
        changeIndexScore: 0,
        changeIndexRating: "BASELINE",
        insight: "Baseline multi-spectral satellite imagery established for Bengaluru tech corridors and lake ecosystems.",
        image: "/static/bengaluru/before_2023-01.png",
        overlayPolygons: []
      },
      2023: {
        year: 2023,
        label: "Year 2023",
        urbanChangePct: 5.1,
        vegetationChangePct: -2.8,
        waterChangePct: -1.1,
        infrastructureChangePct: 2.4,
        totalAreaKm2: 10.5,
        changeIndexScore: 25,
        changeIndexRating: "LOW",
        insight: "Outer Ring Road and Sarjapur Road tech hub expansions showing initial built-up gain.",
        image: "/static/bengaluru/before_2023-01.png",
        overlayPolygons: [
          {
            id: "BLR-23-A",
            label: "ORR Tech Park Expansion",
            type: "urban",
            severity: "LOW",
            points: "55%,35% 78%,32% 82%,52% 60%,55%"
          }
        ]
      },
      2024: {
        year: 2024,
        label: "Year 2024",
        urbanChangePct: 9.6,
        vegetationChangePct: -6.1,
        waterChangePct: -2.7,
        infrastructureChangePct: 4.8,
        totalAreaKm2: 19.8,
        changeIndexScore: 46,
        changeIndexRating: "MODERATE",
        insight: "Lake catchment boundary modifications and loss of agricultural fringes in Bellandur-Varthur periphery.",
        image: "/static/bengaluru/after_2026-01.png",
        overlayPolygons: [
          {
            id: "BLR-24-A",
            label: "Lake Basin Encroachment Zone",
            type: "water",
            severity: "MODERATE",
            points: "50%,28% 80%,25% 85%,50% 55%,53%"
          }
        ]
      },
      2025: {
        year: 2025,
        label: "Year 2025",
        urbanChangePct: 14.5,
        vegetationChangePct: -9.4,
        waterChangePct: -4.0,
        infrastructureChangePct: 7.2,
        totalAreaKm2: 30.1,
        changeIndexScore: 61,
        changeIndexRating: "HIGH",
        insight: "High-density commercial IT parks and residential high-rise sprawl extending into North Bengaluru Airport corridor.",
        image: "/static/bengaluru/after_2026-01.png",
        overlayPolygons: [
          {
            id: "BLR-25-A",
            label: "North Bengaluru Airport Spine",
            type: "infrastructure",
            severity: "HIGH",
            points: "42%,20% 86%,16% 90%,54% 46%,58%"
          }
        ]
      },
      2026: {
        year: 2026,
        label: "Year 2026",
        urbanChangePct: 19.8,
        vegetationChangePct: -12.6,
        waterChangePct: -5.4,
        infrastructureChangePct: 9.7,
        totalAreaKm2: 41.0,
        changeIndexScore: 76,
        changeIndexRating: "HIGH",
        insight: "Highest cumulative transformation observed with significant conversion of green cover to concrete built-up area (+19.8%).",
        image: "/static/bengaluru/after_2026-01.png",
        overlayPolygons: [
          {
            id: "BLR-26-A",
            label: "Comprehensive Urban Sprawl Area",
            type: "urban",
            severity: "HIGH",
            points: "40%,15% 90%,12% 94%,60% 44%,64%"
          }
        ]
      }
    }
  },

  hyderabad: {
    cityId: "hyderabad",
    cityName: "Hyderabad",
    state: "Telangana",
    lat: 17.3850,
    lon: 78.4867,
    mode: "DEMO ANALYSIS",
    description: "Technology metropolis featuring rapid HITEC City, Gachibowli, and Financial District expansion over rocky terrain.",
    fiveYearEvolution: {
      startYear: 2022,
      endYear: 2026,
      urbanTotalPct: 22.4,
      vegetationTotalPct: -10.1,
      waterTotalPct: -3.8,
      infrastructureTotalPct: 11.2,
      overallChangeIndex: 80,
      overallSeverity: "HIGH",
      summary: "Hyderabad exhibited intense commercial growth (+22.4%) along the western Neopolis & Financial District corridor between 2022 and 2026."
    },
    years: {
      2022: {
        year: 2022,
        label: "Baseline Observation",
        urbanChangePct: 0.0,
        vegetationChangePct: 0.0,
        waterChangePct: 0.0,
        infrastructureChangePct: 0.0,
        totalAreaKm2: 0.0,
        changeIndexScore: 0,
        changeIndexRating: "BASELINE",
        insight: "Baseline satellite capture of Hyderabad western tech corridor and Hussain Sagar catchment.",
        image: "/static/mumbai/before_2023-01.png",
        overlayPolygons: []
      },
      2023: {
        year: 2023,
        label: "Year 2023",
        urbanChangePct: 5.8,
        vegetationChangePct: -2.1,
        waterChangePct: -0.7,
        infrastructureChangePct: 3.1,
        totalAreaKm2: 12.0,
        changeIndexScore: 28,
        changeIndexRating: "MODERATE",
        insight: "Neopolis and Financial District expansion with extensive rock excavation and land levelling.",
        image: "/static/mumbai/before_2023-01.png",
        overlayPolygons: [
          {
            id: "HYD-23-A",
            label: "Neopolis Levelling Phase",
            type: "infrastructure",
            severity: "LOW",
            points: "52%,32% 76%,30% 80%,50% 56%,52%"
          }
        ]
      },
      2024: {
        year: 2024,
        label: "Year 2024",
        urbanChangePct: 11.0,
        vegetationChangePct: -5.0,
        waterChangePct: -1.7,
        infrastructureChangePct: 5.9,
        totalAreaKm2: 23.1,
        changeIndexScore: 50,
        changeIndexRating: "MODERATE",
        insight: "High-rise commercial towers and Outer Ring Road exit corridors emerging across western zones.",
        image: "/static/mumbai/after_2026-01.png",
        overlayPolygons: [
          {
            id: "HYD-24-A",
            label: "Financial District High-Density Hub",
            type: "urban",
            severity: "MODERATE",
            points: "48%,24% 82%,22% 86%,52% 50%,55%"
          }
        ]
      },
      2025: {
        year: 2025,
        label: "Year 2025",
        urbanChangePct: 16.8,
        vegetationChangePct: -7.5,
        waterChangePct: -2.7,
        infrastructureChangePct: 8.5,
        totalAreaKm2: 35.2,
        changeIndexScore: 66,
        changeIndexRating: "HIGH",
        insight: "Widespread transformation of rocky scrubland into built-up infrastructure corridors.",
        image: "/static/mumbai/after_2026-01.png",
        overlayPolygons: [
          {
            id: "HYD-25-A",
            label: "Regional Tech Sprawl",
            type: "urban",
            severity: "HIGH",
            points: "42%,18% 88%,16% 92%,56% 45%,60%"
          }
        ]
      },
      2026: {
        year: 2026,
        label: "Year 2026",
        urbanChangePct: 22.4,
        vegetationChangePct: -10.1,
        waterChangePct: -3.8,
        infrastructureChangePct: 11.2,
        totalAreaKm2: 46.8,
        changeIndexScore: 80,
        changeIndexRating: "HIGH",
        insight: "Peak urban footprint expansion (+22.4%) with significant commercial densification recorded across Hyderabad.",
        image: "/static/mumbai/after_2026-01.png",
        overlayPolygons: [
          {
            id: "HYD-26-A",
            label: "Western Megacity Expansion Belt",
            type: "urban",
            severity: "HIGH",
            points: "38%,14% 92%,12% 95%,62% 42%,65%"
          }
        ]
      }
    }
  }
};

// Generic generator for remaining Indian cities to ensure 100% coverage
export function getCityTemporalData(cityId, cityObj = null) {
  const key = (cityId || "mumbai").toLowerCase().trim();
  if (INDIAN_TEMPORAL_DATA[key]) {
    return INDIAN_TEMPORAL_DATA[key];
  }

  const name = cityObj?.name || (cityId.charAt(0).toUpperCase() + cityId.slice(1));
  const state = cityObj?.state || "India";
  const lat = cityObj?.lat || 19.0760;
  const lon = cityObj?.lon || 72.8777;

  const seed = Array.from(key).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const factor = 1.0 + ((seed % 5) - 2) * 0.07;

  const urban = [0, +(4.6 * factor).toFixed(1), +(8.4 * factor).toFixed(1), +(12.8 * factor).toFixed(1), +(17.9 * factor).toFixed(1)];
  const veg = [0, +(-1.8 * factor).toFixed(1), +(-4.1 * factor).toFixed(1), +(-6.5 * factor).toFixed(1), +(-8.9 * factor).toFixed(1)];
  const water = [0, +(-0.6 * factor).toFixed(1), +(-1.6 * factor).toFixed(1), +(-2.3 * factor).toFixed(1), +(-3.0 * factor).toFixed(1)];
  const infra = [0, +(2.0 * factor).toFixed(1), +(4.2 * factor).toFixed(1), +(6.4 * factor).toFixed(1), +(8.8 * factor).toFixed(1)];
  const scores = [0, Math.round(22 * factor), Math.round(41 * factor), Math.round(57 * factor), Math.round(71 * factor)];

  return {
    cityId: key,
    cityName: name,
    state: state,
    lat: lat,
    lon: lon,
    mode: "DEMO ANALYSIS",
    description: `Urban and ecological monitoring for ${name}, ${state}.`,
    fiveYearEvolution: {
      startYear: 2022,
      endYear: 2026,
      urbanTotalPct: urban[4],
      vegetationTotalPct: veg[4],
      waterTotalPct: water[4],
      infrastructureTotalPct: infra[4],
      overallChangeIndex: scores[4],
      overallSeverity: scores[4] > 75 ? "HIGH" : "MODERATE",
      summary: `Across 2022-2026, ${name} exhibited an estimated cumulative urban growth of +${urban[4]}% with measurable land surface transitions.`
    },
    years: {
      2022: {
        year: 2022,
        label: "Baseline Observation",
        urbanChangePct: 0.0,
        vegetationChangePct: 0.0,
        waterChangePct: 0.0,
        infrastructureChangePct: 0.0,
        totalAreaKm2: 0.0,
        changeIndexScore: 0,
        changeIndexRating: "BASELINE",
        insight: `Baseline Earth observation established for ${name}, ${state}.`,
        image: `/static/mumbai/before_2023-01.png`,
        overlayPolygons: []
      },
      2023: {
        year: 2023,
        label: "Year 2023",
        urbanChangePct: urban[1],
        vegetationChangePct: veg[1],
        waterChangePct: water[1],
        infrastructureChangePct: infra[1],
        totalAreaKm2: +(urban[1] * 1.8).toFixed(1),
        changeIndexScore: scores[1],
        changeIndexRating: "LOW",
        insight: `Early-phase expansion (+${urban[1]}%) detected in suburban arterial nodes of ${name}.`,
        image: `/static/mumbai/before_2023-01.png`,
        overlayPolygons: [{ id: "Z-23", label: "Suburban Arterial Node", type: "urban", severity: "LOW", points: "50%,30% 75%,28% 80%,48% 55%,50%" }]
      },
      2024: {
        year: 2024,
        label: "Year 2024",
        urbanChangePct: urban[2],
        vegetationChangePct: veg[2],
        waterChangePct: water[2],
        infrastructureChangePct: infra[2],
        totalAreaKm2: +(urban[2] * 1.8).toFixed(1),
        changeIndexScore: scores[2],
        changeIndexRating: "MODERATE",
        insight: `Localized built-up consolidation and green cover reduction observed in fringe developments.`,
        image: `/static/mumbai/after_2026-01.png`,
        overlayPolygons: [{ id: "Z-24", label: "Commercial Corridor Sprawl", type: "urban", severity: "MODERATE", points: "48%,25% 82%,22% 86%,50% 50%,53%" }]
      },
      2025: {
        year: 2025,
        label: "Year 2025",
        urbanChangePct: urban[3],
        vegetationChangePct: veg[3],
        waterChangePct: water[3],
        infrastructureChangePct: infra[3],
        totalAreaKm2: +(urban[3] * 1.8).toFixed(1),
        changeIndexScore: scores[3],
        changeIndexRating: "MODERATE",
        insight: `Accelerating transit corridor construction (+${infra[3]}%) and road network expansion.`,
        image: `/static/mumbai/after_2026-01.png`,
        overlayPolygons: [{ id: "Z-25", label: "Transit Corridor Sprawl", type: "infrastructure", severity: "HIGH", points: "42%,20% 88%,16% 92%,55% 45%,58%" }]
      },
      2026: {
        year: 2026,
        label: "Year 2026",
        urbanChangePct: urban[4],
        vegetationChangePct: veg[4],
        waterChangePct: water[4],
        infrastructureChangePct: infra[4],
        totalAreaKm2: +(urban[4] * 1.8).toFixed(1),
        changeIndexScore: scores[4],
        changeIndexRating: "HIGH",
        insight: `Highest cumulative change recorded across the 5-year observation period for ${name}.`,
        image: `/static/mumbai/after_2026-01.png`,
        overlayPolygons: [{ id: "Z-26", label: "Comprehensive Urban Footprint", type: "urban", severity: "HIGH", points: "40%,15% 90%,12% 94%,60% 44%,64%" }]
      }
    }
  };
}
