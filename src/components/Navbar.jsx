import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Calendar, User, LogOut, LogIn, CalendarCheck } from 'lucide-react'
import { logoutUser } from '../redux/authSlice'
import './Navbar.css'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth)
  const registrations = useSelector((state) => state.registrations.items)

  const userRegistrationsCount = currentUser
    ? registrations.filter(
      (r) => r.userEmail.toLowerCase() === currentUser.email.toLowerCase()
    ).length
    : 0

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">
            Event<span className="logo-accent"> Pulse</span>
          </span>
        </Link>

        <nav className="navbar-links">
          <Link to="/" className="nav-link">
            <Calendar size={18} />
            <span>Explore Events</span>
          </Link>

          {isAuthenticated && (
            <Link to="/my-events" className="nav-link">
              <CalendarCheck size={18} />
              <span>My Events</span>
              {userRegistrationsCount > 0 && (
                <span className="nav-badge">{userRegistrationsCount}</span>
              )}
            </Link>
          )}
        </nav>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="user-profile-menu">
              <div className="user-pill">
                <User size={16} />
                <span className="user-name">{currentUser?.name || 'User'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="btn-logout"
                title="Log out"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">
                <LogIn size={16} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="btn-register">
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
