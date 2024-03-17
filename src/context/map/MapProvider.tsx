import { Map } from 'mapbox-gl'
import { useMemo, useReducer } from 'react'
import { MapContext } from './MapContext'
import { mapReducer } from './mapReducer'

export interface MapState {
  isMapReady: boolean
  map?: Map
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
}

interface Props {
  children: React.ReactNode | JSX.Element | JSX.Element[]
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE)

  const setMap = (map: Map) => {
    dispatch({ type: 'SET_MAP', payload: map })
  }

  const values = useMemo(() => {
    return { ...state, setMap }
  }, [state, setMap])

  return <MapContext.Provider value={values}>{children}</MapContext.Provider>
}
