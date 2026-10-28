import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { BarChart3 } from 'lucide-react'

export function ComparisonChart({
  rankingData,
  activeLayer,
  selectedRegion,
  onSelectRegion,
}) {
  if (!rankingData || rankingData.length === 0) {
    return <div className="chart-empty-msg">No comparison benchmark available</div>
  }

  // Display top 6 comparison items
  const chartItems = rankingData.slice(0, 6)

  return (
    <div className="analytics-card">
      <div className="card-heading-row">
        <div className="card-heading-left">
          <BarChart3 size={15} />
          <h3>Peer Comparison</h3>
        </div>
        <span className="card-badge">Benchmark</span>
      </div>
      <p className="chart-subtext">
        Comparative {activeLayer.label} ({activeLayer.unit})
      </p>

      <div className="chart-container" style={{ width: '100%', height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartItems} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fontSize: 10, fill: '#475569' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: '#475569' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="recharts-custom-tooltip">
                      <div className="tooltip-label">{payload[0].payload.name}</div>
                      <div className="tooltip-val">
                        {payload[0].value} {activeLayer.unit}
                      </div>
                      <div className="tooltip-hint">Click bar to inspect</div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              onClick={(entry) => onSelectRegion?.(entry.name)}
              cursor="pointer"
            >
              {chartItems.map((entry) => {
                const isSelected = entry.name === selectedRegion
                return (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={isSelected ? '#0f172a' : '#14b8a6'}
                  />
                )
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
