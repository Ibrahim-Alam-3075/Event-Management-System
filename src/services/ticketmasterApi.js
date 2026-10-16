const BASE_URL = 'https://app.ticketmaster.com/discovery/v2'
const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY

export const fetchEvents = async ({
  keyword = '',
  category = 'All',
  city = '',
  sort = 'relevance,desc',
} = {}) => {
  const url = new URL(`${BASE_URL}/events.json`)
  url.searchParams.set('apikey', API_KEY)
  url.searchParams.set('size', '24')
  url.searchParams.set('sort', sort)

  // Ticketmaster requires startDateTime 
  const now = new Date().toISOString().split('.')[0] + 'Z'
  url.searchParams.set('startDateTime', now)

  if (keyword.trim()) {
    url.searchParams.set('keyword', keyword.trim())
  }

  if (category && category !== 'All') {
    url.searchParams.set('classificationName', category)
  }

  if (city.trim()) {
    url.searchParams.set('city', city.trim())
  }

  const response = await fetch(url.toString())
  const data = await response.json()
  return data._embedded?.events || []
}

export const fetchEventById = async (id) => {
  const url = `${BASE_URL}/events/${id}.json?apikey=${API_KEY}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}
