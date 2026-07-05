import { useEffect, useMemo, useState } from 'react'
import { fetchHotels } from './api'
import SearchBar from './components/SearchBar'
import HotelCard from './components/HotelCard'
import HotelModal from './components/HotelModal'
import Pagination from './components/Pagination'

const PAGE_SIZE = 20

export default function App() {
  const [hotels, setHotels] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('relevance')
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchHotels()
      .then((data) => {
        setHotels(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  const visibleHotels = useMemo(() => {
    let list = hotels

    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(
        (h) =>
          h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q)
      )
    }

    const sorted = [...list]
    if (sortBy === 'price-asc') sorted.sort((a, b) => Number(a.price) - Number(b.price))
    if (sortBy === 'price-desc') sorted.sort((a, b) => Number(b.price) - Number(a.price))
    if (sortBy === 'rating-desc') sorted.sort((a, b) => b.rating - a.rating)

    return sorted
  }, [hotels, query, sortBy])

  
  useEffect(() => {
    setPage(1)
  }, [query, sortBy])

  const totalPages = Math.max(1, Math.ceil(visibleHotels.length / PAGE_SIZE))

  const paginatedHotels = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return visibleHotels.slice(start, start + PAGE_SIZE)
  }, [visibleHotels, page])

  function handlePageChange(nextPage) {
    if (nextPage < 1 || nextPage > totalPages) return
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">Stay Finder</h1>
          <p className="tagline">Find your next stay, ticket in hand.</p>
        </div>
      </header>

      <main className="main">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {status === 'loading' && <p className="status-msg">Loading hotels…</p>}

        {status === 'error' && (
          <p className="status-msg error">
            Couldn't load hotels. Check the API endpoint in src/api.js and try again.
          </p>
        )}

        {status === 'ready' && visibleHotels.length === 0 && (
          <p className="status-msg">No hotels match "{query}".</p>
        )}

        {status === 'ready' && visibleHotels.length > 0 && (
          <>
            <div className="hotel-grid">
              {paginatedHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} onSelect={setSelectedHotel} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      {selectedHotel && (
        <HotelModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
      )}
    </div>
  )
}