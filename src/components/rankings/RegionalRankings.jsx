import { formatMetricValue } from '../../utils/formatters'
import { Trophy, ArrowUpRight } from 'lucide-react'

export function RegionalRankings({
  rankingRows,
  activeLayer,
  selectedRegion,
  onSelectRegion,
}) {
  if (!rankingRows || rankingRows.length === 0) {
    return null
  }

  const isLowerBetter = activeLayer.betterDirection === 'lower'

  return (
    <div className="analytics-card rankings-card">
      <div className="card-heading-row">
        <div className="card-heading-left">
          <Trophy size={15} />
          <h3>Regional Leaderboard</h3>
        </div>
        <span className="card-badge">
          {isLowerBetter ? 'Lowest = Best' : 'Highest = Best'}
        </span>
      </div>

      <p className="chart-subtext">
        Ranked by <strong>{activeLayer.indicator}</strong>. Click any region to locate on map.
      </p>

      <div className="rankings-list" role="list">
        {rankingRows.slice(0, 5).map((row) => {
          const isSelected = row.name === selectedRegion

          return (
            <button
              key={row.name}
              type="button"
              className={`ranking-row-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectRegion?.(row.name)}
              role="listitem"
            >
              <div className="rank-left">
                <span className={`rank-badge rank-${row.rank}`}>#{row.rank}</span>
                <span className="rank-name">{row.name}</span>
              </div>
              <div className="rank-right">
                <span className="rank-val">{formatMetricValue(row.value, activeLayer)}</span>
                <ArrowUpRight size={13} className="rank-arrow" />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
