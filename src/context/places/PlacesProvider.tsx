import { useEffect, useMemo, useReducer } from 'react'
import { getUserLocations } from '../../helpers'
import { PlacesContext } from './PlacesContext'
import { placesReducer } from './placesReducer'

export interface PlacesState {
  isLoading: boolean
  userLocation?: [number, number]
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
}

interface Props {
  children: React.ReactNode | JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)

  useEffect(() => {
    getUserLocations().then((lngLat) =>
      dispatch({ type: 'SET_USER_LOCATION', payload: lngLat })
    )
  }, [])

  const values = useMemo(() => state, [state])

  return (
    <PlacesContext.Provider value={values}>{children}</PlacesContext.Provider>
  )
}
