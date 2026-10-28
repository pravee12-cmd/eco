/**
 * Formatters for environmental metrics and UI display
 */

/**
 * Format metric value with appropriate unit and decimals
 * @param {number|null|undefined} value
 * @param {object} layer - Layer configuration object
 * @returns {string} Formatted string representation
 */
export function formatMetricValue(value, layer) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) {
    return 'Data unavailable'
  }

  const num = Number(value)
  const unit = layer?.unit ?? ''

  if (unit === '°C') {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}°C`
  }

  if (unit === '%') {
    return `${num.toFixed(1)}%`
  }

  if (unit === 'AQI') {
    return `${Math.round(num)} AQI`
  }

  if (unit === 'µg/m³') {
    return `${num.toFixed(1)} µg/m³`
  }

  if (unit === 'Index') {
    return `${num.toFixed(1)} / 100`
  }

  return `${num.toFixed(1)} ${unit}`.trim()
}

/**
 * Format large numbers with commas
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
  if (!Number.isFinite(num)) return '—'
  return new Intl.NumberFormat('en-IN').format(num)
}
