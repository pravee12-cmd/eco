import {
  Cloud,
  Droplets,
  CloudSun,
  Trees,
  Zap,
  Leaf,
  Recycle,
} from 'lucide-react'

/**
 * Seven primary environmental categories required for EcoScope
 */
export const layerCatalog = [
  {
    id: 'air-quality',
    label: 'Air Quality',
    icon: Cloud,
    unit: 'AQI',
    indicator: 'Air Quality Index (AQI)',
    subIndicators: ['PM2.5', 'PM10', 'NO2', 'SO2'],
    description: 'Ambient air quality index, PM2.5, and PM10 fine particulate concentration.',
    betterDirection: 'lower',
    scaleMin: 20,
    scaleMax: 200,
    reportingPeriod: 'Sep 2026',
    methodologyNote: 'Calculated using 24-hour weighted sub-indices across continuous monitoring stations (CPCB framework).',
  },
  {
    id: 'water-quality',
    label: 'Water Quality',
    icon: Droplets,
    unit: 'Index',
    indicator: 'Water Quality Index (WQI)',
    subIndicators: ['Dissolved Oxygen', 'BOD', 'Fecal Coliform', 'pH'],
    description: 'Surface and groundwater contamination risk, dissolved oxygen, and aquatic health index.',
    betterDirection: 'higher',
    scaleMin: 40,
    scaleMax: 95,
    reportingPeriod: 'Q3 2026',
    methodologyNote: 'Harmonized water quality rating combining chemical, biological, and physical parameters (0–100 scale).',
  },
  {
    id: 'climate-weather',
    label: 'Climate & Weather',
    icon: CloudSun,
    unit: '°C',
    indicator: 'Surface Temp Anomaly',
    subIndicators: ['Mean Max Temp', 'Rainfall Deviation %', 'Heat Stress Days'],
    description: 'Temperature deviation from historical baseline (1981–2010 normal) and rainfall variability.',
    betterDirection: 'lower',
    scaleMin: -0.5,
    scaleMax: 3.0,
    reportingPeriod: 'Monsoon 2026',
    methodologyNote: 'Gridded reanalysis anomaly relative to IMD climatological normal baseline.',
  },
  {
    id: 'forest-land',
    label: 'Forest & Land Use',
    icon: Trees,
    unit: '%',
    indicator: 'Forest & Tree Cover',
    subIndicators: ['Very Dense Forest', 'Moderately Dense', 'Canopy Cover %'],
    description: 'Proportion of total geographic area under recorded forest cover and tree canopy density.',
    betterDirection: 'higher',
    scaleMin: 5,
    scaleMax: 60,
    reportingPeriod: 'Biennial 2025–26',
    methodologyNote: 'Satellite-derived remote sensing NDVI analysis of canopy cover exceeding 10% density.',
  },
  {
    id: 'energy-carbon',
    label: 'Energy & Carbon',
    icon: Zap,
    unit: '%',
    indicator: 'Renewable Energy Share',
    subIndicators: ['Solar PV', 'Wind Generation', 'Grid Carbon Intensity'],
    description: 'Share of total utility electricity generation supplied by renewable solar, wind, and hydro sources.',
    betterDirection: 'higher',
    scaleMin: 10,
    scaleMax: 65,
    reportingPeriod: 'FY 2025–26',
    methodologyNote: 'CEA utility generation dispatch data aggregated by regional grid control operators.',
  },
  {
    id: 'biodiversity',
    label: 'Biodiversity',
    icon: Leaf,
    unit: 'Index',
    indicator: 'Biodiversity Intactness Index',
    subIndicators: ['Species Richness', 'Protected Area %', 'Ecosystem Stress'],
    description: 'Ecosystem integrity score assessing local native biodiversity richness and habitat condition.',
    betterDirection: 'higher',
    scaleMin: 35,
    scaleMax: 90,
    reportingPeriod: 'Annual 2026',
    methodologyNote: 'Modeled species population abundance relative to pristine reference pre-industrial baselines.',
  },
  {
    id: 'waste-sustainability',
    label: 'Waste & Sustainability',
    icon: Recycle,
    unit: '%',
    indicator: 'Solid Waste Processing Rate',
    subIndicators: ['Segregation at Source', 'Dry Waste Recovery', 'Plastic Circularity'],
    description: 'Percentage of municipal solid waste scientifically processed, composted, or recycled.',
    betterDirection: 'higher',
    scaleMin: 20,
    scaleMax: 95,
    reportingPeriod: 'Swachh 2026',
    methodologyNote: 'Urban local body self-reporting verified via state pollution control board audit benchmarks.',
  },
]

export const layerById = Object.fromEntries(
  layerCatalog.map((layer) => [layer.id, layer]),
)

/**
 * Demonstration regional dataset.
 * Visibly documented as demonstration data.
 */
export const demoRegionalData = {
  // National Baseline
  India: {
    'air-quality': 94,
    'water-quality': 68,
    'climate-weather': 1.2,
    'forest-land': 24.6,
    'energy-carbon': 38.5,
    biodiversity: 58.2,
    'waste-sustainability': 64.0,
  },

  // Indian States & Union Territories
  'Tamil Nadu': {
    'air-quality': 62,
    'water-quality': 74,
    'climate-weather': 0.8,
    'forest-land': 20.3,
    'energy-carbon': 53.2,
    biodiversity: 67.4,
    'waste-sustainability': 78.5,
  },
  Kerala: {
    'air-quality': 48,
    'water-quality': 82,
    'climate-weather': 0.5,
    'forest-land': 54.7,
    'energy-carbon': 41.0,
    biodiversity: 83.1,
    'waste-sustainability': 71.0,
  },
  Karnataka: {
    'air-quality': 65,
    'water-quality': 71,
    'climate-weather': 0.9,
    'forest-land': 20.1,
    'energy-carbon': 51.6,
    biodiversity: 72.3,
    'waste-sustainability': 69.2,
  },
  Maharashtra: {
    'air-quality': 105,
    'water-quality': 63,
    'climate-weather': 1.4,
    'forest-land': 16.5,
    'energy-carbon': 36.8,
    biodiversity: 59.8,
    'waste-sustainability': 75.3,
  },
  Gujarat: {
    'air-quality': 118,
    'water-quality': 61,
    'climate-weather': 1.6,
    'forest-land': 7.6,
    'energy-carbon': 45.4,
    biodiversity: 52.1,
    'waste-sustainability': 72.8,
  },
  'Andhra Pradesh': {
    'air-quality': 72,
    'water-quality': 69,
    'climate-weather': 1.1,
    'forest-land': 17.9,
    'energy-carbon': 44.0,
    biodiversity: 63.5,
    'waste-sustainability': 66.4,
  },
  Telangana: {
    'air-quality': 86,
    'water-quality': 66,
    'climate-weather': 1.3,
    'forest-land': 18.4,
    'energy-carbon': 39.5,
    biodiversity: 57.0,
    'waste-sustainability': 68.7,
  },
  Delhi: {
    'air-quality': 176,
    'water-quality': 42,
    'climate-weather': 2.3,
    'forest-land': 13.2,
    'energy-carbon': 18.2,
    biodiversity: 38.6,
    'waste-sustainability': 84.1,
  },
  'Uttar Pradesh': {
    'air-quality': 162,
    'water-quality': 51,
    'climate-weather': 1.9,
    'forest-land': 6.1,
    'energy-carbon': 22.4,
    biodiversity: 44.2,
    'waste-sustainability': 58.0,
  },
  Rajasthan: {
    'air-quality': 124,
    'water-quality': 57,
    'climate-weather': 2.1,
    'forest-land': 4.9,
    'energy-carbon': 48.7,
    biodiversity: 46.5,
    'waste-sustainability': 52.4,
  },
  'West Bengal': {
    'air-quality': 115,
    'water-quality': 59,
    'climate-weather': 1.2,
    'forest-land': 19.0,
    'energy-carbon': 21.0,
    biodiversity: 65.0,
    'waste-sustainability': 55.6,
  },
  'Madhya Pradesh': {
    'air-quality': 98,
    'water-quality': 65,
    'climate-weather': 1.5,
    'forest-land': 25.1,
    'energy-carbon': 31.8,
    biodiversity: 68.9,
    'waste-sustainability': 88.5,
  },
  Odisha: {
    'air-quality': 89,
    'water-quality': 72,
    'climate-weather': 1.1,
    'forest-land': 33.5,
    'energy-carbon': 26.2,
    biodiversity: 74.2,
    'waste-sustainability': 61.2,
  },
  Punjab: {
    'air-quality': 145,
    'water-quality': 53,
    'climate-weather': 1.7,
    'forest-land': 3.7,
    'energy-carbon': 28.5,
    biodiversity: 42.0,
    'waste-sustainability': 59.8,
  },
  Haryana: {
    'air-quality': 152,
    'water-quality': 55,
    'climate-weather': 1.8,
    'forest-land': 3.6,
    'energy-carbon': 25.3,
    biodiversity: 41.5,
    'waste-sustainability': 63.4,
  },
  Bihar: {
    'air-quality': 158,
    'water-quality': 49,
    'climate-weather': 1.6,
    'forest-land': 7.8,
    'energy-carbon': 19.0,
    biodiversity: 45.1,
    'waste-sustainability': 48.2,
  },
  Assam: {
    'air-quality': 54,
    'water-quality': 78,
    'climate-weather': 0.6,
    'forest-land': 36.1,
    'energy-carbon': 32.5,
    biodiversity: 81.4,
    'waste-sustainability': 50.1,
  },
  'Himachal Pradesh': {
    'air-quality': 42,
    'water-quality': 84,
    'climate-weather': 0.9,
    'forest-land': 27.7,
    'energy-carbon': 58.0,
    biodiversity: 86.2,
    'waste-sustainability': 67.5,
  },
  Uttarakhand: {
    'air-quality': 52,
    'water-quality': 81,
    'climate-weather': 1.0,
    'forest-land': 45.4,
    'energy-carbon': 55.1,
    biodiversity: 84.7,
    'waste-sustainability': 62.0,
  },
  Goa: {
    'air-quality': 45,
    'water-quality': 79,
    'climate-weather': 0.7,
    'forest-land': 60.6,
    'energy-carbon': 34.0,
    biodiversity: 82.5,
    'waste-sustainability': 74.0,
  },

  // Tamil Nadu Districts (Phase 1 & 2 district dataset)
  Chennai: {
    'air-quality': 71,
    'water-quality': 65,
    'climate-weather': 1.1,
    'forest-land': 6.2,
    'energy-carbon': 41.2,
    biodiversity: 48.0,
    'waste-sustainability': 82.4,
  },
  Coimbatore: {
    'air-quality': 52,
    'water-quality': 78,
    'climate-weather': 0.6,
    'forest-land': 26.8,
    'energy-carbon': 62.4,
    biodiversity: 74.2,
    'waste-sustainability': 85.1,
  },
  Madurai: {
    'air-quality': 64,
    'water-quality': 72,
    'climate-weather': 0.9,
    'forest-land': 14.1,
    'energy-carbon': 48.0,
    biodiversity: 58.6,
    'waste-sustainability': 76.2,
  },
  Salem: {
    'air-quality': 66,
    'water-quality': 70,
    'climate-weather': 0.8,
    'forest-land': 22.3,
    'energy-carbon': 51.5,
    biodiversity: 61.0,
    'waste-sustainability': 73.0,
  },
  Tiruchirappalli: {
    'air-quality': 58,
    'water-quality': 75,
    'climate-weather': 0.8,
    'forest-land': 11.5,
    'energy-carbon': 49.3,
    biodiversity: 59.4,
    'waste-sustainability': 79.2,
  },
  Tirunelveli: {
    'air-quality': 49,
    'water-quality': 79,
    'climate-weather': 0.7,
    'forest-land': 31.4,
    'energy-carbon': 68.7,
    biodiversity: 77.8,
    'waste-sustainability': 75.0,
  },
  Vellore: {
    'air-quality': 68,
    'water-quality': 67,
    'climate-weather': 1.0,
    'forest-land': 17.8,
    'energy-carbon': 46.1,
    biodiversity: 54.3,
    'waste-sustainability': 71.5,
  },
  Erode: {
    'air-quality': 55,
    'water-quality': 73,
    'climate-weather': 0.7,
    'forest-land': 35.2,
    'energy-carbon': 59.0,
    biodiversity: 71.5,
    'waste-sustainability': 81.3,
  },
  Kancheepuram: {
    'air-quality': 69,
    'water-quality': 69,
    'climate-weather': 1.0,
    'forest-land': 9.4,
    'energy-carbon': 44.5,
    biodiversity: 52.8,
    'waste-sustainability': 77.0,
  },
  Thanjavur: {
    'air-quality': 56,
    'water-quality': 76,
    'climate-weather': 0.7,
    'forest-land': 8.1,
    'energy-carbon': 47.8,
    biodiversity: 62.1,
    'waste-sustainability': 74.4,
  },
  'The Nilgiris': {
    'air-quality': 32,
    'water-quality': 88,
    'climate-weather': 0.4,
    'forest-land': 56.4,
    'energy-carbon': 64.2,
    biodiversity: 89.5,
    'waste-sustainability': 78.0,
  },
  Dindigul: {
    'air-quality': 54,
    'water-quality': 74,
    'climate-weather': 0.7,
    'forest-land': 28.5,
    'energy-carbon': 52.0,
    biodiversity: 69.0,
    'waste-sustainability': 72.3,
  },
  Cuddalore: {
    'air-quality': 67,
    'water-quality': 68,
    'climate-weather': 0.9,
    'forest-land': 7.9,
    'energy-carbon': 43.1,
    biodiversity: 55.2,
    'waste-sustainability': 70.8,
  },
  Dharmapuri: {
    'air-quality': 59,
    'water-quality': 71,
    'climate-weather': 0.8,
    'forest-land': 34.1,
    'energy-carbon': 48.6,
    biodiversity: 64.7,
    'waste-sustainability': 69.5,
  },
  Kanniyakumari: {
    'air-quality': 44,
    'water-quality': 81,
    'climate-weather': 0.5,
    'forest-land': 32.8,
    'energy-carbon': 66.0,
    biodiversity: 80.2,
    'waste-sustainability': 79.8,
  },
  Tiruppur: {
    'air-quality': 63,
    'water-quality': 66,
    'climate-weather': 0.8,
    'forest-land': 12.0,
    'energy-carbon': 57.3,
    biodiversity: 56.5,
    'waste-sustainability': 80.4,
  },
}

/**
 * Standardize region name variations (e.g. 'Trichy' -> 'Tiruchirappalli')
 */
export function normalizeRegionName(name) {
  if (!name) return 'India'
  const trimmed = name.trim()
  if (trimmed === 'Trichy') return 'Tiruchirappalli'
  if (trimmed === 'Nilgiris') return 'The Nilgiris'
  return trimmed
}

/**
 * Get indicator value for a given region and layer
 * Returns null if region data does not exist
 */
export function getIndicatorValue(regionName, layerId) {
  const normalized = normalizeRegionName(regionName)
  const profile = demoRegionalData[normalized]
  if (!profile) return null
  const value = profile[layerId]
  return value !== undefined ? Number(value) : null
}

/**
 * Check if region has valid demonstration data
 */
export function hasRegionData(regionName, layerId) {
  return getIndicatorValue(regionName, layerId) !== null
}

/**
 * Get historical trend time-series for a region and layer
 */
export function getTrendSeries(regionName, layerId) {
  const currentVal = getIndicatorValue(regionName, layerId) ?? getIndicatorValue('India', layerId) ?? 50
  const isLowerBetter = layerById[layerId]?.betterDirection === 'lower'

  // Seasonal fluctuation pattern based on category
  const deltas = isLowerBetter
    ? [8, 4, -3, -7, 2, 0] // Pollution / Anomaly tends to spike in winter
    : [-5, -2, 1, 4, -1, 0] // Greens / Circularity improves with active policy cycles

  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']

  return months.map((month, idx) => {
    const raw = currentVal + deltas[idx]
    const clamped = Math.max(0, Number(raw.toFixed(1)))
    return {
      month,
      value: clamped,
      baseline: currentVal,
    }
  })
}

/**
 * Get ranked comparison list for current geographic scope
 * @param {string} layerId
 * @param {string|null} selectedState
 * @returns {Array<{ rank: number, name: string, value: number, isSelected: boolean }>}
 */
export function getRankingRows(layerId, selectedState = null, selectedDistrict = null) {
  const layer = layerById[layerId]
  const isLowerBetter = layer?.betterDirection === 'lower'

  let candidateNames = []

  if (selectedState === 'Tamil Nadu' || selectedDistrict) {
    // When exploring Tamil Nadu, rank its districts
    candidateNames = [
      'Chennai',
      'Coimbatore',
      'Madurai',
      'Salem',
      'Tiruchirappalli',
      'Tirunelveli',
      'Vellore',
      'Erode',
      'Kancheepuram',
      'Thanjavur',
      'The Nilgiris',
      'Dindigul',
      'Cuddalore',
      'Kanniyakumari',
      'Tiruppur',
    ]
  } else {
    // When at national level or other states, rank major Indian states
    candidateNames = [
      'Tamil Nadu',
      'Kerala',
      'Karnataka',
      'Maharashtra',
      'Gujarat',
      'Andhra Pradesh',
      'Telangana',
      'Delhi',
      'Uttar Pradesh',
      'Rajasthan',
      'West Bengal',
      'Madhya Pradesh',
      'Odisha',
      'Assam',
      'Himachal Pradesh',
    ]
  }

  const scored = candidateNames
    .map((name) => {
      const val = getIndicatorValue(name, layerId)
      return {
        name,
        value: val,
      }
    })
    .filter((item) => item.value !== null)

  // Sort: if lower is better, ascending (smallest is best #1).
  // If higher is better, descending (largest is best #1).
  scored.sort((a, b) => (isLowerBetter ? a.value - b.value : b.value - a.value))

  return scored.map((item, index) => ({
    rank: index + 1,
    name: item.name,
    value: item.value,
    isSelected: item.name === selectedDistrict || item.name === selectedState,
  }))
}

export function getMetricLabel(layerId) {
  return layerById[layerId]?.indicator ?? 'Indicator'
}
