import axios from 'axios'

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/search/geocode/v6/',
  params: {
    limit: 10,
    languaje: 'es',
    country: 'ec',
    access_token:
      'pk.eyJ1Ijoiam9uYXRoYW5uYXZhcyIsImEiOiJja204YjdhbG4xNmZ0Mm9vNDgydTlheW90In0.X38r62KsZ-KTTkJplDwCnw',
  },
})

export default searchApi
