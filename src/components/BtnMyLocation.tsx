import { useContext } from 'react'
import { MapContext, PlacesContext } from '../context'
export const BtnMyLocation = () => {
  const { isMapReady, map } = useContext(MapContext)
  const { userLocation } = useContext(PlacesContext)

  const handleClick = () => {
    if (!isMapReady) throw new Error('Error al cargar el mapa')
    if (!userLocation) throw new Error('No hay ubicación del usuario')

    map?.flyTo({
      zoom: 14,
      center: userLocation,
    })
  }

  return (
    <button
      className="btn btn-danger"
      style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 999 }}
      onClick={handleClick}
    >
      Mi Ubicación
    </button>
  )
}
