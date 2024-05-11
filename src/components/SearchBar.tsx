import { ChangeEvent, useContext, useRef } from 'react'
import { PlacesContext } from '../context'
import { SearchResults } from './SearchResults'
export const SearchBar = () => {
  const debounceRef = useRef<NodeJS.Timeout>()
  const { searchPlacesByTerm } = useContext(PlacesContext)

  const handleQueryChanged = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(e.target.value)
    }, 1000)
  }
  return (
    <div className="search--container">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar lugar...."
        onChange={handleQueryChanged}
      />

      <SearchResults />
    </div>
  )
}
