import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp } from 'lucide-react'

export function TrendChart({ data, activeLayer, regionName }) {
  if (!data || data.length === 0) {
    return <div className="chart-empty-msg">No historical trend data available</div>
  }

  return (
    <div className="analytics-card">
      <div className="card-heading-row">
        <div className="card-heading-left">
          <TrendingUp size={15} />
          <h3>Historical Trend</h3>
        </div>
        <span className="card-badge">6-Month Snapshot</span>
      </div>
      <p className="chart-subtext">
        Trajectory for <strong>{regionName}</strong> ({activeLayer.unit})
      </p>

      <div className="chart-container" style={{ width: '100%', height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0f766e" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fontSize: 11, fill: '#64748b' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="recharts-custom-tooltip">
                      <div className="tooltip-label">{payload[0].payload.month} 2026</div>
                      <div className="tooltip-val">
                        {payload[0].value} {activeLayer.unit}
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0f766e"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#trendGradient)"
              activeDot={{ r: 5, fill: '#0f766e', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
