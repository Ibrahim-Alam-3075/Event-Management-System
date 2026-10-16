import { createSlice } from '@reduxjs/toolkit'

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    selectedEvent: null,
    loading: false,
    filters: {
      keyword: '',
      category: 'All',
      city: '',
      sort: 'relevance,desc',
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setEvents: (state, action) => {
      state.items = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.events || []
      state.loading = false
    },

    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload
      state.loading = false
    },

    setFilter: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      }
    },

    resetFilters: (state) => {
      state.filters = {
        keyword: '',
        category: 'All',
        city: '',
        sort: 'date,asc',
      }
    },
  },
})

export const {
  setLoading,
  setEvents,
  setSelectedEvent,
  setFilter,
  resetFilters,
} = eventsSlice.actions

export default eventsSlice.reducer
