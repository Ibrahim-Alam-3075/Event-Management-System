import { Link } from 'react-router-dom'
import { Calendar, MapPin, Tag } from 'lucide-react'
import './EventCard.css'

function EventCard({ event }) {
  const imageUrl =
    event.images?.find((img) => img.ratio === '16_9')?.url ||
    event.images?.[0]?.url ||
    ''

  const date = event.dates?.start?.localDate || 'Date TBA'
  const venue =
    event._embedded?.venues?.[0]?.name ||
    event.place?.name ||
    'Venue TBA'
  const city =
    event._embedded?.venues?.[0]?.city?.name ||
    event.place?.city?.name ||
    ''
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
              {venue}
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
