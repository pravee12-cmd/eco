import { useEffect, useState, useCallback } from 'react'

const LOCAL_STATE_URL = '/geo/india_states.geojson'
const LOCAL_TN_DISTRICTS_URL = '/geo/tamil_nadu_districts.geojson'
const LOCAL_ALL_DISTRICTS_URL = '/geo/india_districts.geojson'

const FALLBACK_STATE_URL =
  'https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson'
const FALLBACK_DISTRICT_URL =
  'https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson'

/**
 * Fetch GeoJSON from primary local source, fallback to secondary or remote if unavailable
 */
async function fetchGeoJson(primaryUrl, fallbackUrl) {
  try {
    const res = await fetch(primaryUrl)
    if (res.ok) {
      const data = await res.json()
      if (data && data.features) return data
    }
  } catch (err) {
    console.warn(`Local fetch failed for ${primaryUrl}:`, err.message)
  }

  // Fallback to remote if provided
  if (fallbackUrl) {
    try {
      const fallbackRes = await fetch(fallbackUrl)
      if (fallbackRes.ok) {
        const data = await fallbackRes.json()
        if (data && data.features) return data
      }
    } catch (err) {
      console.warn(`Fallback fetch failed for ${fallbackUrl}:`, err.message)
    }
  }

  return null
}

export function useGeoBoundaries() {
  const [stateGeoJson, setStateGeoJson] = useState(null)
  const [districtGeoJson, setDistrictGeoJson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fetchTrigger, setFetchTrigger] = useState(0)

  useEffect(() => {
    let ignore = false

    async function execute() {
      try {
        // Step 1: Load states first so India overview renders immediately
        const stateData = await fetchGeoJson(LOCAL_STATE_URL, FALLBACK_STATE_URL)

        if (ignore) return

        if (stateData) {
          setStateGeoJson(stateData)
          setLoading(false)
        } else {
          setError('Unable to load India geographic boundary data. Please check your connection.')
          setLoading(false)
          return
        }

        // Step 2: Load districts (try full districts, or fallback to Tamil Nadu specific set)
        let districtData = await fetchGeoJson(LOCAL_ALL_DISTRICTS_URL, null)
        if (!districtData) {
          districtData = await fetchGeoJson(LOCAL_TN_DISTRICTS_URL, FALLBACK_DISTRICT_URL)
        }

        if (!ignore && districtData) {
          setDistrictGeoJson(districtData)
        }
      } catch (err) {
        if (!ignore) {
          console.error('Failed to load geographic boundaries:', err)
          setError('Unable to load India geographic boundary data.')
          setLoading(false)
        }
      }
    }

    execute()

    return () => {
      ignore = true
    }
  }, [fetchTrigger])

  const reload = useCallback(() => {
    setLoading(true)
    setError(null)
    setFetchTrigger((c) => c + 1)
  }, [])

  return {
    stateGeoJson,
    districtGeoJson,
    loading,
    error,
    reload,
  }
}
