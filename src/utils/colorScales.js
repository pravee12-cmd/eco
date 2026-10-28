/**
 * Color scales for choropleth map visualization
 * Supports indicator-specific directions:
 * - 'lower': Lower values are favorable (e.g., AQI, Air pollution, Heat anomaly)
 * - 'higher': Higher values are favorable (e.g., Forest cover, Renewables, Water index, Recycling)
 */

export const MISSING_DATA_COLOR = '#cbd5e1'
export const SELECTED_BORDER_COLOR = '#0f172a'
export const HOVER_BORDER_COLOR = '#042f2e'
export const DEFAULT_BORDER_COLOR = '#475569'

// 5-class color palette: Lower is better (favorable -> unfavorable)
// Index 0: Excellent (emerald), 4: Severe (deep crimson)
const PALETTE_LOWER_IS_BETTER = [
  '#10b981', // 0-20% percentile (Best)
  '#34d399', // 20-40%
  '#fbbf24', // 40-60% (Moderate)
  '#f97316', // 60-80% (Poor)
  '#ef4444', // 80-100% (Severe)
]

// 5-class color palette: Higher is better (unfavorable -> favorable)
// Index 0: Low/Poor (amber/rose), 4: High/Excellent (deep emerald/teal)
const PALETTE_HIGHER_IS_BETTER = [
  '#f87171', // 0-20% (Lowest)
  '#fbbf24', // 20-40%
  '#6ee7b7', // 40-60%
  '#10b981', // 60-80%
  '#047857', // 80-100% (Highest/Best)
]

/**
 * Get choropleth fill color for a given numeric value and layer metadata
 * @param {number|null|undefined} value
 * @param {object} layer - Layer configuration
 * @returns {string} Hex color code
 */
export function getChoroplethColor(value, layer) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) {
    return MISSING_DATA_COLOR
  }

  const num = Number(value)
  const min = layer?.scaleMin ?? 0
  const max = layer?.scaleMax ?? 100
  const betterDirection = layer?.betterDirection ?? 'higher'

  // Normalize between 0 and 1
  const clamped = Math.max(min, Math.min(max, num))
  const range = max - min || 1
  const normalized = (clamped - min) / range

  const palette = betterDirection === 'lower' ? PALETTE_LOWER_IS_BETTER : PALETTE_HIGHER_IS_BETTER

  // Determine quintile bucket (0 to 4)
  const bucket = Math.min(4, Math.floor(normalized * 5))
  return palette[bucket]
}

/**
 * Get legend brackets for the active layer
 * @param {object} layer
 * @returns {Array<{ label: string, color: string, range: string }>}
 */
export function getLegendBrackets(layer) {
  const min = layer?.scaleMin ?? 0
  const max = layer?.scaleMax ?? 100
  const step = (max - min) / 5
  const isLowerBetter = layer?.betterDirection === 'lower'
  const palette = isLowerBetter ? PALETTE_LOWER_IS_BETTER : PALETTE_HIGHER_IS_BETTER

  return [
    {
      label: isLowerBetter ? 'Good' : 'Low',
      color: palette[0],
      range: `${min}–${Math.round(min + step)}`,
    },
    {
      label: 'Fair',
      color: palette[1],
      range: `${Math.round(min + step)}–${Math.round(min + step * 2)}`,
    },
    {
      label: 'Moderate',
      color: palette[2],
      range: `${Math.round(min + step * 2)}–${Math.round(min + step * 3)}`,
    },
    {
      label: 'Sub-par',
      color: palette[3],
      range: `${Math.round(min + step * 3)}–${Math.round(min + step * 4)}`,
    },
    {
      label: isLowerBetter ? 'Severe' : 'Optimal',
      color: palette[4],
      range: `${Math.round(min + step * 4)}–${max}`,
    },
    {
      label: 'No Data',
      color: MISSING_DATA_COLOR,
      range: 'Unavailable',
    },
  ]
}
