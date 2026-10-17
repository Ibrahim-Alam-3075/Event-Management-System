import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Calendar, MapPin, Tag, Clock, ArrowLeft, CheckCircle } from 'lucide-react'
import { fetchEventById } from '../services/ticketmasterApi'
import { registerForEvent } from '../redux/registrationsSlice'
import './EventDetails.css'

function EventDetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [registeredFeedback, setRegisteredFeedback] = useState(false)

  const { isAuthenticated, currentUser } = useSelector((state) => state.auth)
  const registrations = useSelector((state) => state.registrations.items)

  const isAlreadyRegistered =
    isAuthenticated && currentUser
      ? registrations.some(
          (r) =>
            r.eventId === id &&
            r.userEmail.toLowerCase() === currentUser.email.toLowerCase()
        )
      : false

  useEffect(() => {
    async function loadDetails() {
      setLoading(true)
      const data = await fetchEventById(id)
      setEvent(data)
      setLoading(false)
    }
    loadDetails()
  }, [id])

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    dispatch(
      registerForEvent({
        event,
        userEmail: currentUser.email,
        userName: currentUser.name,
      })
    )
    setRegisteredFeedback(true)
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'gray' }}>
        Loading event details...
      </div>
    )
  }

  if (!event || !event.name) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Event not found</h2>
        <Link to="/" className="btn-back">
          &larr; Back to Events
        </Link>
      </div>
    )
  }

  const venue = event._embedded?.venues?.[0]
  const imageUrl = event.images?.[0]?.url
  const date = event.dates?.start?.localDate
  const time = event.dates?.start?.localTime
  const venueName = venue?.name
  const city = venue?.city?.name
  const state = venue?.state?.name
  const country = venue?.country?.name
  const category = event.classifications?.[0]?.segment?.name || 'General'
  const genre = event.classifications?.[0]?.genre?.name

  return (
    <div className="event-details-container">
      <Link to="/" className="btn-back">
        <ArrowLeft size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
        Back to all events
      </Link>

      <div className="event-details-card">
        {imageUrl && (
          <img src={imageUrl} alt={event.name} className="event-details-hero-img" />
        )}

        <div className="event-details-body">
          <div className="event-details-header">
            <div>
              <span className="event-badge">{category}</span>
              <h1 className="event-details-title">{event.name}</h1>
              {genre && <p style={{ color: 'gray' }}>{genre}</p>}
            </div>
          </div>

          <div className="event-info-grid">
            <div className="info-box">
              <Calendar className="info-icon" size={20} />
              <div>
                <h4>Date</h4>
                <p>{date}</p>
              </div>
            </div>

            <div className="info-box">
              <Clock className="info-icon" size={20} />
              <div>
                <h4>Time</h4>
                <p>{time || 'TBA'}</p>
              </div>
            </div>

            <div className="info-box">
              <MapPin className="info-icon" size={20} />
              <div>
                <h4>Venue & Location</h4>
                <p>{venueName || 'Venue TBA'}</p>
                <small style={{ color: 'gray' }}>
                  {[city, state, country].filter(Boolean).join(', ')}
                </small>
              </div>
            </div>

            <div className="info-box">
              <Tag className="info-icon" size={20} />
              <div>
                <h4>Category</h4>
                <p>{category}</p>
              </div>
            </div>
          </div>

          {registeredFeedback && (
            <div className="registration-success-banner">
              You have registered for this event. View it under "My Events".
            </div>
          )}

          <div className="event-actions">
            {isAlreadyRegistered ? (
              <button type="button" className="btn-registered" disabled>
                <CheckCircle size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                Already Registered
              </button>
            ) : (
              <button
                type="button"
                className="btn-register-event"
                onClick={handleRegister}
              >
                {isAuthenticated ? 'Register for Event' : 'Login to Register'}
              </button>
            )}

            {event.url && (
              <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="btn-ticketmaster-link"
              >
                View on Ticketmaster &rarr;
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsPage
