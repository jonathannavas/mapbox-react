import axios from 'axios'

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token:
      'pk.eyJ1Ijoiam9uYXRoYW5uYXZhcyIsImEiOiJja204YjdhbG4xNmZ0Mm9vNDgydTlheW90In0.X38r62KsZ-KTTkJplDwCnw',
  },
})

export default directionsApi
