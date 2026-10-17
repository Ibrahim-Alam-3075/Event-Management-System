import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEvents } from '../services/ticketmasterApi'
import { setEvents, setLoading, setFilter, resetFilters } from '../redux/eventsSlice'
import EventCard from '../components/EventCard'
import './Events.css'

const CATEGORIES = ['All', 'Music', 'Sports', 'Arts & Theatre', 'Film', 'Miscellaneous']

function EventsPage() {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.events.items)
  const loading = useSelector((state) => state.events.loading)
  const filters = useSelector((state) => state.events.filters)

  const [keywordInput, setKeywordInput] = useState(filters.keyword)
  const [cityInput, setCityInput] = useState(filters.city)

  const loadEvents = useCallback(
    async (currentFilters) => {
      dispatch(setLoading(true))
      const data = await fetchEvents(currentFilters)
      dispatch(setEvents(data))
    },
    [dispatch]
  )

  // Initial load
  useEffect(() => {
    loadEvents(filters)
  }, [filters.category, loadEvents, filters])

  const handleSearch = (e) => {
    e.preventDefault()
    const updatedFilters = {
      ...filters,
      keyword: keywordInput,
      city: cityInput,
    }
    dispatch(setFilter(updatedFilters))
    loadEvents(updatedFilters)
  }

  const handleCategoryChange = (category) => {
    const updatedFilters = {
      ...filters,
      category,
    }
    dispatch(setFilter(updatedFilters))
    loadEvents(updatedFilters)
  }

  const handleClear = () => {
    setKeywordInput('')
    setCityInput('')
    dispatch(resetFilters())
    loadEvents({ keyword: '', category: 'All', city: '', sort: 'relevance,desc' })
  }

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Explore Events</h1>
        <p>Browse upcoming concerts, sports, theater, and festivals from Ticketmaster.</p>
      </div>

      <div className="search-filter-section">
        <form onSubmit={handleSearch} className="search-bar-row">
          <input
            type="text"
            placeholder="Search by event name or artist..."
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="City (e.g. New York, London)..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className="city-input"
          />
          <button type="submit" className="btn-search">
            Search
          </button>
          <button type="button" onClick={handleClear} className="btn-clear">
            Clear
          </button>
        </form>

        <div className="category-filter-row">
          <span className="category-label">Category:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-btn ${filters.category === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="events-status">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="events-status">
          No events found. Try adjusting your search or category filter.
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

export default EventsPage
