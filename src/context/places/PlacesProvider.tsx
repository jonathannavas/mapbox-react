import { useEffect, useMemo, useReducer } from 'react'
import { searchApi } from '../../apis'
import { getUserLocations } from '../../helpers'
import { Feature, PlacesResponse } from '../../interfaces/places'
import { PlacesContext } from './PlacesContext'
import { placesReducer } from './placesReducer'

export interface PlacesState {
  isLoading: boolean
  userLocation?: [number, number]
  isLoadingPlaces: boolean
  places: Feature[]
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
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

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: 'SET_PLACES', payload: [] })
      return []
    } //Todo: limpiar state
    if (!state.userLocation) throw new Error('No hay ubicacion del usuario')

    dispatch({ type: 'SET_LOADING_PLACES' })

    const response = await searchApi.get<PlacesResponse>(`forward?q=${query}`, {
      params: {
        proximity: state.userLocation.join(','),
      },
    })

    dispatch({ type: 'SET_PLACES', payload: response.data.features })

    return response.data.features
  }

  const values = useMemo(() => {
    return {
      ...state,
      searchPlacesByTerm,
    }
  }, [state])

  return (
    <PlacesContext.Provider value={values}>{children}</PlacesContext.Provider>
  )
}
