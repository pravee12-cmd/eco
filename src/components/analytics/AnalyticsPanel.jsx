import { useState } from 'react'
import { KpiSummary } from './KpiSummary'
import { TrendChart } from './TrendChart'
import { ComparisonChart } from './ComparisonChart'
import { RegionalRankings } from '../rankings/RegionalRankings'
import { formatMetricValue } from '../../utils/formatters'
import { MapPin, ChevronDown, ChevronUp, Layers, CheckCircle2, AlertTriangle } from 'lucide-react'

export function AnalyticsPanel({
  selectedState,
  selectedDistrict,
  activeLayer,
  regionValue,
  trendingData,
  rankingRows,
  onSelectRegion,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const currentRegionName = selectedDistrict || selectedState || 'India'
  const isDistrictLevel = Boolean(selectedDistrict)
  const isStateLevel = Boolean(selectedState && !selectedDistrict)

  const levelTag = isDistrictLevel
    ? `District (${selectedState})`
    : isStateLevel
      ? 'State / UT'
      : 'National Baseline'

  const hasData = regionValue !== null && regionValue !== undefined

  return (
    <aside className={`analytics-panel ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="analytics-top-bar">
        <div className="panel-title-wrap">
          <Layers size={16} />
          <h2>Environmental Analytics</h2>
        </div>
        <button
          type="button"
          className="collapse-toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? 'Expand analytics panel' : 'Collapse analytics panel'}
        >
          {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="analytics-content-scroll">
          {/* Geography Hero Card */}
          <div className="geo-hero-card">
            <div className="geo-hero-header">
              <div className="geo-tag">
                <MapPin size={12} />
                <span>{levelTag}</span>
              </div>
              <span className={`data-status-badge ${hasData ? 'available' : 'unavailable'}`}>
                {hasData ? (
                  <>
                    <CheckCircle2 size={11} />
                    <span>Demo Data</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={11} />
                    <span>Data Pending</span>
                  </>
                )}
              </span>
            </div>

            <h2 className="geo-name">{currentRegionName}</h2>
            <div className="geo-indicator-focus">
              <span className="focus-label">{activeLayer.label} Status</span>
              <div className="focus-value-row">
                <span className={`focus-value ${!hasData ? 'unavailable' : ''}`}>
                  {formatMetricValue(regionValue, activeLayer)}
                </span>
                <span className="focus-unit">{activeLayer.unit}</span>
              </div>
            </div>

            <p className="geo-desc">{activeLayer.description}</p>
          </div>

          {/* Key Performance Indicators */}
          <KpiSummary
            regionName={currentRegionName}
            regionValue={regionValue}
            activeLayer={activeLayer}
          />

          {/* Historical Trend Area Chart */}
          <TrendChart
            data={trendingData}
            activeLayer={activeLayer}
            regionName={currentRegionName}
          />

          {/* Peer Comparison Bar Chart */}
          <ComparisonChart
            rankingData={rankingRows}
            activeLayer={activeLayer}
            selectedRegion={currentRegionName}
            onSelectRegion={onSelectRegion}
          />

          {/* Regional Rankings Leaderboard */}
          <RegionalRankings
            rankingRows={rankingRows}
            activeLayer={activeLayer}
            selectedRegion={currentRegionName}
            onSelectRegion={onSelectRegion}
          />
        </div>
      )}
    </aside>
  )
}
