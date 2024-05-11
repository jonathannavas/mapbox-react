/* eslint import/no-webpack-loader-syntax: off */

import React from 'react'
import ReactDOM from 'react-dom/client'

import { MapsApp } from './MapsApp'
import './styles.css'
// @ts-ignore
import mapboxgl from '!mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  'pk.eyJ1Ijoiam9uYXRoYW5uYXZhcyIsImEiOiJja204YjdhbG4xNmZ0Mm9vNDgydTlheW90In0.X38r62KsZ-KTTkJplDwCnw'

if (!navigator.geolocation) {
  alert(
    'Se necesita de acceso a la geolocalizacion para funcionar correctamente'
  )

  throw new Error(
    'Se necesita de acceso a la geolocalizacion para funcionar correctamente'
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
)
