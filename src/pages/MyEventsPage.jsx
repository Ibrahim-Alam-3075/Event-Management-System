import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Tag } from 'lucide-react'
import { cancelRegistration } from '../redux/registrationsSlice'
import './MyEvents.css'

function MyEventsPage() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser)
  const allRegistrations = useSelector((state) => state.registrations.items)

  const [activeTab, setActiveTab] = useState('all')


  const userRegistrations = allRegistrations.filter(
    (reg) =>
      reg.userEmail?.toLowerCase() === currentUser?.email?.toLowerCase()
  )


  const today = new Date().toISOString().split('T')[0]


  const categorizedEvents = userRegistrations.map((reg) => {
    const isUpcoming = reg.eventDate ? reg.eventDate >= today : true
    return {
      ...reg,
      status: isUpcoming ? 'upcoming' : 'completed',
    }
  })


  const displayedEvents = categorizedEvents.filter((reg) => {
    if (activeTab === 'all') return true
    return reg.status === activeTab
  })

  const handleCancel = (registrationId) => {
    dispatch(cancelRegistration({ registrationId }))
  }

  return (
    <div className="my-events-container">
      <div className="my-events-header">
        <h1>My Registered Events</h1>
        <p>
          Viewing events for <strong>{currentUser?.name || currentUser?.email}</strong>
        </p>
      </div>

      <div className="tab-filter-row">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All ({userRegistrations.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming (
          {categorizedEvents.filter((e) => e.status === 'upcoming').length}
          )
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Past / Completed (
          {categorizedEvents.filter((e) => e.status === 'completed').length}
          )
        </button>
      </div>

      {displayedEvents.length === 0 ? (
        <div className="empty-state">
          <h3>No events found</h3>
          <p>
            {activeTab === 'all'
              ? 'You have not registered for any events yet.'
              : `You have no ${activeTab} registered events.`}
          </p>
          <Link to="/" className="btn-explore">
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="registrations-list">
          {displayedEvents.map((reg) => (
            <div key={reg.id} className="reg-card">
              {reg.imageUrl && (
                <img
                  src={reg.imageUrl}
                  alt={reg.eventName}
                  className="reg-card-img"
                />
              )}

              <div className="reg-card-content">
                <span className={`status-badge ${reg.status}`}>
                  {reg.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                </span>

                <h3 className="reg-card-title">{reg.eventName}</h3>

                <div className="reg-card-meta">
                  <span>
                    <Calendar
                      size={14}
                      style={{ verticalAlign: 'middle', marginRight: '4px' }}
                    />
                    {reg.eventDate} {reg.eventTime && `at ${reg.eventTime}`}
                  </span>
                  <span>
                    <MapPin
                      size={14}
                      style={{ verticalAlign: 'middle', marginRight: '4px' }}
                    />
                    {reg.venueName}
                    {reg.city ? `, ${reg.city}` : ''}
                  </span>
                  <span>
                    <Tag
                      size={14}
                      style={{ verticalAlign: 'middle', marginRight: '4px' }}
                    />
                    {reg.category}
                  </span>
                </div>
              </div>

              <div className="reg-card-actions">
                <Link
                  to={`/events/${reg.eventId}`}
                  className="btn-reg-details"
                >
                  View Details
                </Link>
                <button
                  type="button"
                  onClick={() => handleCancel(reg.id)}
                  className="btn-cancel-reg"
                >
                  Cancel Registration
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyEventsPage
