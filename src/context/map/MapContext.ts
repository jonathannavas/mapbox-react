/* eslint import/no-webpack-loader-syntax: off */

// @ts-ignore
import { Map } from '!mapbox-gl'
import { createContext } from 'react'

interface MapContextProps {
  isMapReady: boolean
  map?: Map

  setMap: (map: Map) => void
  getRouteBetweenPlaces: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>

  handleResetRoutes: () => void
}

export const MapContext = createContext({} as MapContextProps)
