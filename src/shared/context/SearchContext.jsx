import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  })

  // Inicializar desde URL al cargar
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const newParams = {
      destination: params.get('destination') || '',
      checkIn: params.get('checkIn') || '',
      checkOut: params.get('checkOut') || '',
      guests: params.get('guests') || '2'
    }
    setSearchParams(newParams)
  }, [location.search])

  const updateSearch = (newParams) => {
    // Construir los parámetros de la URL
    const params = new URLSearchParams()
    if (newParams.destination) params.set('destination', newParams.destination)
    if (newParams.checkIn) params.set('checkIn', newParams.checkIn)
    if (newParams.checkOut) params.set('checkOut', newParams.checkOut)
    if (newParams.guests) params.set('guests', newParams.guests)

    const searchString = params.toString()

    // Actualizar el estado
    setSearchParams(newParams)

    // Si estamos en una página de detalles de hotel, actualizar la URL sin navegar
    if (location.pathname.includes('/hotels/')) {
      const newPath = `${location.pathname}${searchString ? `?${searchString}` : ''}`
      window.history.pushState(null, '', newPath)
      return
    }

    // Para otras páginas, redirigir a la página de hoteles
    const newPath = `/hotels${searchString ? `?${searchString}` : ''}`
    navigate(newPath)
  }

  return (
    <SearchContext.Provider value={{ searchParams, updateSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch debe ser usado dentro de un SearchProvider')
  }
  return context
} 