import { getLegendBrackets } from '../../utils/colorScales'

export function MapLegend({ activeLayer }) {
  if (!activeLayer) return null

  const brackets = getLegendBrackets(activeLayer)
  const isLowerBetter = activeLayer.betterDirection === 'lower'

  return (
    <div className="map-legend-card" role="region" aria-label="Map color scale legend">
      <div className="legend-header">
        <span className="legend-indicator-name">{activeLayer.indicator}</span>
        <span className="legend-unit-tag">Unit: {activeLayer.unit}</span>
      </div>

      <div className="legend-gradient-bar">
        {brackets.slice(0, 5).map((b) => (
          <div
            key={b.range}
            className="legend-cell"
            style={{ backgroundColor: b.color }}
            title={`${b.label}: ${b.range} ${activeLayer.unit}`}
          />
        ))}
      </div>

      <div className="legend-range-labels">
        <span>{brackets[0].label} ({brackets[0].range})</span>
        <span className="direction-hint">
          {isLowerBetter ? '↓ Lower is favorable' : '↑ Higher is favorable'}
        </span>
        <span>{brackets[4].label} ({brackets[4].range})</span>
      </div>

      <div className="legend-nodata-row">
        <span className="nodata-swatch" />
        <span className="nodata-label">No demonstration data</span>
      </div>
    </div>
  )
}
