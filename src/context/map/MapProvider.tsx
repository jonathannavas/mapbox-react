/* eslint import/no-webpack-loader-syntax: off */

// @ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl'
import { useContext, useEffect, useMemo, useReducer } from 'react'
import { directionsApi } from '../../apis'
import { DirectionsResponse } from '../../interfaces/directions'
import { PlacesContext } from '../places/PlacesContext'
import { MapContext } from './MapContext'
import { mapReducer } from './mapReducer'

export interface MapState {
  isMapReady: boolean
  map?: Map
  markers: Marker[]
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
}

interface Props {
  children: React.ReactNode | JSX.Element | JSX.Element[]
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)
  const { places } = useContext(PlacesContext)

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove())
    const newMarkers: Marker[] = []

    for (const place of places) {
      const lat = place.properties.coordinates.latitude
      const lng = place.properties.coordinates.longitude

      const popup = new Popup().setHTML(`
        <h6>${place.properties.name_preferred}</h6>
        <p>${place.properties.full_address}</p>
      `)

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!)

      newMarkers.push(newMarker)

      dispatch({ type: 'SET_MARKERS', payload: newMarkers })
    }
  }, [places])

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(
      `<h4> Aquí estoy</h4>
      <p>En algún lugar del mundo</p>
      `
    )
    new Marker({
      color: 'crimson',
    })
      .setLngLat(map.getCenter())
      .addTo(map)
      .setPopup(myLocationPopup)
    dispatch({ type: 'SET_MAP', payload: map })
  }

  useEffect(() => {
    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString')
      state.map.removeSource('RouteString')
    }
  }, [state])

  const handleResetRoutes = () => {
    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString')
      state.map.removeSource('RouteString')
    }
  }

  const getRouteBetweenPlaces = async (
    start: [number, number],
    end: [number, number]
  ): Promise<void> => {
    const response = await directionsApi.get<DirectionsResponse>(
      `/${start.join(',')};${end.join(',')}`
    )

    const { distance, duration, geometry } = response.data.routes[0]
    const { coordinates: coords } = geometry

    let kms = distance / 1000
    kms = Math.round(kms * 100)
    kms /= 100

    const minutes = Math.floor(duration / 60)
    console.log({ minutes, kms })
    const bounds = new LngLatBounds(start, start)

    for (const coord of coords) {
      const newCoords: [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoords)
    }

    state.map?.fitBounds(bounds, { padding: 200 })

    //pollyline

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    }

    handleResetRoutes()

    state.map?.addSource('RouteString', sourceData)

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'crimson',
        'line-width': 3,
      },
    })
  }

  const values = useMemo(() => {
    return { ...state, setMap, getRouteBetweenPlaces, handleResetRoutes }
  }, [state, setMap])

  return <MapContext.Provider value={values}>{children}</MapContext.Provider>
}
