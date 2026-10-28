import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'

const INDIA_CENTER = [22.8, 79.5]
const INDIA_DEFAULT_ZOOM = 4.8

export function MapBoundsController({ features, level }) {
  const map = useMap()

  useEffect(() => {
    map.invalidateSize()
  }, [map])

  useEffect(() => {
    map.invalidateSize()
    if (!features || (Array.isArray(features) && features.length === 0)) {
      map.setView(INDIA_CENTER, INDIA_DEFAULT_ZOOM, { animate: true })
      return
    }

    try {
      const geoLayer = L.geoJSON(features)
      const bounds = geoLayer.getBounds()

      if (bounds.isValid()) {
        const padding = level === 'district' ? [40, 40] : [30, 30]
        const maxZoom = level === 'district' ? 10 : level === 'state' ? 8 : 5

        map.fitBounds(bounds, {
          padding,
          maxZoom,
          animate: true,
          duration: 0.8,
        })
      } else {
        map.setView(INDIA_CENTER, INDIA_DEFAULT_ZOOM, { animate: true })
      }
    } catch (err) {
      console.warn('Map bounds fitting fallback:', err)
      map.setView(INDIA_CENTER, INDIA_DEFAULT_ZOOM)
    }
  }, [features, level, map])

  return null
}
