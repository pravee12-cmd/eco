import { useState, useMemo } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { Topbar } from './components/layout/Topbar'
import { EcoMap } from './components/map/EcoMap'
import { AnalyticsPanel } from './components/analytics/AnalyticsPanel'
import { useGeoBoundaries } from './hooks/useGeoBoundaries'
import {
  layerById,
  getIndicatorValue,
  getTrendSeries,
  getRankingRows,
} from './data/environmentLayers'
import './App.css'

export default function App() {
  const {
    stateGeoJson,
    districtGeoJson,
    loading,
    error,
    reload,
  } = useGeoBoundaries()

  const [selectedLayer, setSelectedLayer] = useState('air-quality')
  const [selectedState, setSelectedState] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)

  const activeLayer = layerById[selectedLayer]
  const currentRegionName = selectedDistrict || selectedState || 'India'
  const regionValue = getIndicatorValue(currentRegionName, selectedLayer)

  const trendingData = useMemo(
    () => getTrendSeries(currentRegionName, selectedLayer),
    [currentRegionName, selectedLayer],
  )

  const rankingRows = useMemo(
    () => getRankingRows(selectedLayer, selectedState, selectedDistrict),
    [selectedLayer, selectedState, selectedDistrict],
  )

  function handleSelectIndia() {
    setSelectedState(null)
    setSelectedDistrict(null)
  }

  function handleSelectState(stateName) {
    setSelectedState(stateName)
    setSelectedDistrict(null)
  }

  function handleSelectDistrict(districtName) {
    setSelectedDistrict(districtName)
  }

  function handleResetMap() {
    setSelectedState(null)
    setSelectedDistrict(null)
  }

  function handleSelectRegion(regionName) {
    // If exploring a state or if the name matches a known district in current state
    if (selectedState) {
      // Check if regionName belongs to this state
      const isDistrict = districtGeoJson?.features?.some(
        (f) =>
          f.properties.NAME_1?.toLowerCase() === selectedState.toLowerCase() &&
          f.properties.NAME_2?.toLowerCase() === regionName.toLowerCase(),
      )
      if (isDistrict) {
        setSelectedDistrict(regionName)
        return
      }
    }

    // Check if it matches a known state in stateGeoJson
    const isState = stateGeoJson?.features?.some(
      (f) => f.properties.NAME_1?.toLowerCase() === regionName.toLowerCase(),
    )

    if (isState) {
      setSelectedState(regionName)
      setSelectedDistrict(null)
      return
    }

    // If it's a district without parent selected, search all districts to find its state
    const foundDistrictFeature = districtGeoJson?.features?.find(
      (f) => f.properties.NAME_2?.toLowerCase() === regionName.toLowerCase(),
    )
    if (foundDistrictFeature) {
      setSelectedState(foundDistrictFeature.properties.NAME_1)
      setSelectedDistrict(foundDistrictFeature.properties.NAME_2)
      return
    }

    // Default: reset to India if 'India' or unknown
    if (regionName.toLowerCase() === 'india') {
      handleResetMap()
    }
  }

  return (
    <div className="eco-app-shell">
      <Sidebar
        selectedLayer={selectedLayer}
        onSelectLayer={setSelectedLayer}
      />

      <main className="main-content-panel">
        <Topbar
          selectedState={selectedState}
          selectedDistrict={selectedDistrict}
          onSelectIndia={handleSelectIndia}
          onSelectState={handleSelectState}
          onResetMap={handleResetMap}
        />

        <div className="dashboard-grid">
          <EcoMap
            stateGeoJson={stateGeoJson}
            districtGeoJson={districtGeoJson}
            selectedLayer={selectedLayer}
            selectedState={selectedState}
            selectedDistrict={selectedDistrict}
            onSelectState={handleSelectState}
            onSelectDistrict={handleSelectDistrict}
            loading={loading}
            error={error}
            onReload={reload}
          />

          <AnalyticsPanel
            selectedState={selectedState}
            selectedDistrict={selectedDistrict}
            activeLayer={activeLayer}
            regionValue={regionValue}
            trendingData={trendingData}
            rankingRows={rankingRows}
            onSelectRegion={handleSelectRegion}
          />
        </div>
      </main>
    </div>
  )
}
