import { PlacesProvider } from './context'
import { HomePage } from './pages'

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <HomePage />
    </PlacesProvider>
  )
}
