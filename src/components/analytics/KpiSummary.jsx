import { formatMetricValue } from '../../utils/formatters'
import { Activity, Calendar, Award } from 'lucide-react'

export function KpiSummary({ regionValue, activeLayer }) {
  const isLowerBetter = activeLayer.betterDirection === 'lower'

  let performanceTier = 'Moderate'
  if (regionValue !== null && regionValue !== undefined) {
    const min = activeLayer.scaleMin ?? 0
    const max = activeLayer.scaleMax ?? 100
    const ratio = (regionValue - min) / (max - min || 1)
    if (isLowerBetter) {
      if (ratio <= 0.3) performanceTier = 'Optimal'
      else if (ratio <= 0.6) performanceTier = 'Moderate'
      else performanceTier = 'Needs Attention'
    } else {
      if (ratio >= 0.7) performanceTier = 'Optimal'
      else if (ratio >= 0.4) performanceTier = 'Moderate'
      else performanceTier = 'Needs Attention'
    }
  } else {
    performanceTier = 'Unavailable'
  }

  const kpis = [
    {
      id: 'metric',
      icon: Activity,
      label: activeLayer.label,
      value: formatMetricValue(regionValue, activeLayer),
      detail: activeLayer.indicator,
      statusClass: performanceTier.toLowerCase().replace(/\s+/g, '-'),
    },
    {
      id: 'performance',
      icon: Award,
      label: 'Performance Tier',
      value: performanceTier,
      detail: isLowerBetter ? 'Lower values prioritized' : 'Higher values prioritized',
      statusClass: performanceTier.toLowerCase().replace(/\s+/g, '-'),
    },
    {
      id: 'period',
      icon: Calendar,
      label: 'Reporting Period',
      value: activeLayer.reportingPeriod,
      detail: 'Illustrative demonstration cycle',
      statusClass: 'neutral',
    },
  ]

  return (
    <div className="kpi-grid" aria-label="Key environmental performance indicators">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <div key={kpi.id} className={`kpi-card ${kpi.statusClass}`}>
            <div className="kpi-header">
              <span className="kpi-label">{kpi.label}</span>
              <Icon size={14} className="kpi-icon" />
            </div>
            <div className="kpi-value">{kpi.value}</div>
            <div className="kpi-detail">{kpi.detail}</div>
          </div>
        )
      })}
    </div>
  )
}
