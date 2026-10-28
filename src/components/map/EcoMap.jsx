import { useMemo } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { MapBoundsController } from './MapBoundsController'
import { MapLegend } from './MapLegend'
import { getChoroplethColor, MISSING_DATA_COLOR } from '../../utils/colorScales'
import { formatMetricValue } from '../../utils/formatters'
import { getIndicatorValue, layerById } from '../../data/environmentLayers'
import { AlertCircle, RefreshCw } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

const INDIA_VIEW = [22.8, 79.5]

export function EcoMap({
  stateGeoJson,
  districtGeoJson,
  selectedLayer,
  selectedState,
  selectedDistrict,
  onSelectState,
  onSelectDistrict,
  loading,
  error,
  onReload,
}) {
  const activeLayer = layerById[selectedLayer]

  // Filter features based on geographic level
  const displayedFeatures = useMemo(() => {
    if (!stateGeoJson) return []

    if (selectedState && districtGeoJson) {
      const stateDistricts = districtGeoJson.features.filter(
        (f) => f.properties.NAME_1?.toLowerCase() === selectedState.toLowerCase(),
      )

      if (stateDistricts.length > 0) {
        return stateDistricts
      }

      // If this state does not have district boundaries in the file yet, fall back to the state shape
      const stateFeature = stateGeoJson.features.find(
        (f) => f.properties.NAME_1?.toLowerCase() === selectedState.toLowerCase(),
      )
      return stateFeature ? [stateFeature] : []
    }

    // Default: Show all Indian States
    return stateGeoJson.features
  }, [stateGeoJson, districtGeoJson, selectedState])

  const mapLevel = selectedDistrict ? 'district' : selectedState ? 'state' : 'india'

  function getFeatureStyle(feature) {
    const p = feature.properties
    const isDistrict = Boolean(p.NAME_2)
    const regionName = p.NAME_2 || p.NAME_1 || 'India'

    const isSelected = isDistrict
      ? selectedDistrict === p.NAME_2
      : selectedState === p.NAME_1 && !selectedDistrict

    const value = getIndicatorValue(regionName, selectedLayer)
    const fillColor = getChoroplethColor(value, activeLayer)

    return {
      fillColor: fillColor || MISSING_DATA_COLOR,
      weight: isSelected ? 3 : 1.2,
      opacity: 1,
      color: isSelected ? '#0f172a' : '#475569',
      fillOpacity: isSelected ? 0.92 : 0.72,
    }
  }

  function handleFeatureClick(feature) {
    const p = feature.properties
    if (p.NAME_2) {
      // Clicked on a district
      onSelectDistrict(p.NAME_2)
    } else if (p.NAME_1) {
      // Clicked on a state
      onSelectState(p.NAME_1)
    }
  }

  return (
    <section className="map-card" aria-label="Interactive Environmental Map of India">
      <div className="map-toolbar">
        <div className="map-status-pill">
          <span className="live-dot" />
          <span>
            {mapLevel === 'india'
              ? 'All India • States Overview'
              : mapLevel === 'state'
                ? `${selectedState} • Districts Overview`
                : `${selectedDistrict}, ${selectedState}`}
          </span>
        </div>
        <MapLegend activeLayer={activeLayer} />
      </div>

      {loading && (
        <div className="map-fallback-view" role="status">
          <div className="loading-spinner" />
          <p className="loading-text">Loading India administrative boundaries…</p>
        </div>
      )}

      {error && !loading && (
        <div className="map-fallback-view error" role="alert">
          <AlertCircle size={32} className="error-icon" />
          <h3>Failed to load boundary data</h3>
          <p>{error}</p>
          {onReload && (
            <button type="button" className="retry-btn" onClick={onReload}>
              <RefreshCw size={14} />
              Retry Download
            </button>
          )}
        </div>
      )}

      {!loading && !error && (
        <div className="map-container-wrapper">
          <MapContainer
            center={INDIA_VIEW}
            zoom={5}
            scrollWheelZoom
            className="leaflet-root-map"
            zoomControl
            minZoom={4}
            maxZoom={12}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapBoundsController features={displayedFeatures} level={mapLevel} />

            {displayedFeatures.length > 0 && (
              <GeoJSON
                key={`geo-${mapLevel}-${selectedState ?? 'all'}-${selectedDistrict ?? 'none'}-${selectedLayer}`}
                data={displayedFeatures}
                style={getFeatureStyle}
                onEachFeature={(feature, layer) => {
                  const p = feature.properties
                  const regionName = p.NAME_2 || p.NAME_1 || 'India'
                  const parentState = p.NAME_2 ? p.NAME_1 : null
                  const val = getIndicatorValue(regionName, selectedLayer)
                  const formattedVal = formatMetricValue(val, activeLayer)

                  const subtitle = parentState ? `${parentState} District` : 'State / UT'

                  const tooltipContent = `
                    <div class="eco-tooltip">
                      <div class="tooltip-title">${regionName}</div>
                      <div class="tooltip-subtitle">${subtitle}</div>
                      <div class="tooltip-metric">
                        <span class="metric-name">${activeLayer.label}:</span>
                        <span class="metric-val ${val === null ? 'unavailable' : ''}">${formattedVal}</span>
                      </div>
                      <div class="tooltip-footer">Click to inspect • Demo data</div>
                    </div>
                  `

                  layer.bindTooltip(tooltipContent, {
                    sticky: true,
                    className: 'eco-map-tooltip-container',
                  })

                  layer.on({
                    mouseover: (e) => {
                      const target = e.target
                      target.setStyle({
                        weight: 2.5,
                        color: '#042f2e',
                        fillOpacity: 0.88,
                      })
                      target.bringToFront()
                    },
                    mouseout: (e) => {
                      const target = e.target
                      target.setStyle(getFeatureStyle(feature))
                    },
                    click: () => handleFeatureClick(feature),
                  })
                }}
              />
            )}
          </MapContainer>
        </div>
      )}
    </section>
  )
}
