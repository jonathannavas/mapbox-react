import { Map, Marker, Popup } from 'mapbox-gl'
import { useContext, useEffect, useMemo, useReducer } from 'react'
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

  const values = useMemo(() => {
    return { ...state, setMap }
  }, [state, setMap])

  return <MapContext.Provider value={values}>{children}</MapContext.Provider>
}
