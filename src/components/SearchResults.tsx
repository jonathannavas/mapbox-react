import { useContext, useState } from 'react'
import { MapContext, PlacesContext } from '../context'
import { Feature } from '../interfaces/places'
import { LoadingPlaces } from './'

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext)
  const { map } = useContext(MapContext)
  const [activePlace, setActivePlace] = useState('')
  if (isLoadingPlaces) return <LoadingPlaces />

  const onPlaceClick = (place: Feature) => {
    setActivePlace(place.id)
    map?.flyTo({
      zoom: 14,
      center: [
        place.properties.coordinates.longitude,
        place.properties.coordinates.latitude,
      ],
    })
  }

  return (
    <ul className={`list-group ${places.length > 0 && 'mt-2'}`}>
      {places?.map((place) => {
        return (
          <li
            className={`${
              activePlace === place.id ? 'active' : ''
            }  list-group-item list-group-item-action pointer`}
            key={place.id}
          >
            <h6>{place.properties.name_preferred}</h6>
            <p style={{ fontSize: '12px' }}>
              {place.properties.place_formatted}
            </p>
            <button
              className={`btn btn-sm ${
                activePlace === place.id
                  ? 'btn-outline-light'
                  : 'btn-outline-primary'
              }`}
              onClick={() => onPlaceClick(place)}
            >
              Direcciones
            </button>
          </li>
        )
      })}
    </ul>
  )
}
