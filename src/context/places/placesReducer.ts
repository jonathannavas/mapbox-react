import { PlacesState } from './PlacesProvider'

type PlacesActions = {
  type: 'SET_USER_LOCATION'
  payload: [number, number]
}

export const placesReducer = (
  state: PlacesState,
  action: PlacesActions
): PlacesState => {
  switch (action.type) {
    case 'SET_USER_LOCATION':
      return { ...state, isLoading: false, userLocation: action.payload }

    default:
      return state
  }
}
