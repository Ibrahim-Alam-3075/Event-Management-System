import { createSlice } from '@reduxjs/toolkit'

const getStoredData = (key, fallback) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : fallback
}

const storedUsers = getStoredData('ems_users', [
  // Demo user i.e., I mean Mango User
  {
    name: 'Mr. Mango',
    email: 'mango@fruit.com',
    password: 'mango123',
  },
])

const storedCurrentUser = getStoredData('ems_current_user', null)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: storedUsers,
    currentUser: storedCurrentUser,
    isAuthenticated: storedCurrentUser ? true : false,
  },
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload

      const newUser = {
        name: name.trim(),
        email: email.trim(),
        password,
        createdAt: new Date().toISOString(),
      }

      state.users.push(newUser)
      localStorage.setItem('ems_users', JSON.stringify(state.users))

      // Auto login after registration
      state.currentUser = { name: newUser.name, email: newUser.email }
      state.isAuthenticated = true
      localStorage.setItem('ems_current_user', JSON.stringify(state.currentUser))
    },

    loginUser: (state, action) => {
      const { email, password } = action.payload

      const matchedUser = state.users.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      )

      if (matchedUser) {
        state.currentUser = { name: matchedUser.name, email: matchedUser.email }
        state.isAuthenticated = true
        localStorage.setItem('ems_current_user', JSON.stringify(state.currentUser))
      }
    },

    logoutUser: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
      localStorage.removeItem('ems_current_user')
    },
  },
})

export const { registerUser, loginUser, logoutUser } = authSlice.actions

export default authSlice.reducer
