import { createSlice } from '@reduxjs/toolkit'

const getStoredRegistrations = () => {
  const data = localStorage.getItem('ems_registrations')
  return data ? JSON.parse(data) : []
}

export const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: {
    items: getStoredRegistrations(),
  },
  reducers: {
    registerForEvent: (state, action) => {
      const { event, userEmail, userName } = action.payload

      // Prevent duplicate registration 
      const isAlreadyRegistered = state.items.some(
        (reg) =>
          reg.eventId === event.id &&
          reg.userEmail.toLowerCase() === userEmail.toLowerCase()
      )

      if (isAlreadyRegistered) {
        return
      }

      const venue = event._embedded?.venues?.[0]

      const newRegistration = {
        id: `reg_${Date.now()}`,
        eventId: event.id,
        eventName: event.name,
        eventDate: event.dates?.start?.localDate,
        eventTime: event.dates?.start?.localTime,
        venueName: venue?.name || 'TBA',
        city: venue?.city?.name || '',
        imageUrl: event.images?.[0]?.url,
        category: event.classifications?.[0]?.segment?.name || 'General',
        userEmail: userEmail.toLowerCase(),
        userName: userName || userEmail,
        registeredAt: new Date().toISOString(),
      }

      state.items.push(newRegistration)
      localStorage.setItem('ems_registrations', JSON.stringify(state.items))
    },

    cancelRegistration: (state, action) => {
      const { registrationId } = action.payload
      state.items = state.items.filter((item) => item.id !== registrationId)
      localStorage.setItem('ems_registrations', JSON.stringify(state.items))
    },
  },
})

export const { registerForEvent, cancelRegistration } = registrationsSlice.actions

export default registrationsSlice.reducer
