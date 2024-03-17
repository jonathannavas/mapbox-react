import { Map } from 'mapbox-gl'
import { useContext, useLayoutEffect, useRef } from 'react'
import { PlacesContext } from '../context'
import { Loading } from './'

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext)
  const mapDiv = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      })
    }
  }, [isLoading])

  if (isLoading) return <Loading />

  return (
    <div
      ref={mapDiv}
      style={{
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <h1>hola mundo</h1>
    </div>
  )
}
