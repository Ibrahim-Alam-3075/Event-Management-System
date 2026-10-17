import { Link } from 'react-router-dom'
import { Calendar, MapPin, Tag } from 'lucide-react'
import './EventCard.css'

function EventCard({ event }) {
  const venue = event._embedded?.venues?.[0]
  const imageUrl = event.images?.[0]?.url
  const date = event.dates?.start?.localDate
  const venueName = venue?.name
  const city = venue?.city?.name
  const category = event.classifications?.[0]?.segment?.name || 'Event'

  return (
    <div className="event-card">
      {imageUrl && (
        <div className="event-card-img-wrapper">
          <img src={imageUrl} alt={event.name} className="event-card-img" />
          <span className="event-card-badge">{category}</span>
        </div>
      )}

      <div className="event-card-content">
        <h3 className="event-card-title">{event.name}</h3>

        <div className="event-card-meta">
          <p className="meta-item">
            <Calendar size={15} />
            <span>{date}</span>
          </p>
          <p className="meta-item">
            <MapPin size={15} />
            <span>
              {venueName}
              {city ? `, ${city}` : ''}
            </span>
          </p>
          <p className="meta-item">
            <Tag size={15} />
            <span>{category}</span>
          </p>
        </div>

        <Link to={`/events/${event.id}`} className="btn-view-details">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default EventCard
