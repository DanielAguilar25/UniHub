import { useState } from 'react'
import '../../styles/Events.css'

// -------------------------------------------------------
// TODO (backend): replace with fetch() to GET /api/events/
// -------------------------------------------------------
const DUMMY_EVENTS = [
  { id: 1, title: 'Spring Hackathon — CECS Edition', date: 'Apr 3', time: '9:00 AM – 9:00 PM', location: 'EENGR 1.200', category: 'hackathon' },
  { id: 2, title: 'ACM General Meeting', date: 'Apr 8', time: '5:00 PM – 6:00 PM', location: 'ENGR 1.100', category: 'club event' },
  { id: 3, title: 'Industry Night — Tech Career Fair', date: 'Apr 14', time: '4:00 PM – 7:00 PM', location: 'Student Union Ballroom', category: 'career' },
  { id: 4, title: 'IEEE Workshop: Intro to Embedded Systems', date: 'Apr 17', time: '3:00 PM – 5:00 PM', location: 'ENGR 2.204', category: 'workshop' },
  { id: 5, title: 'Women in Tech Panel', date: 'Apr 21', time: '12:00 PM – 2:00 PM', location: 'EENGR 1.100', category: 'panel' },
  { id: 6, title: 'CS Club Game Night', date: 'Apr 24', time: '6:00 PM – 9:00 PM', location: 'ENGR 1.200', category: 'club event' },
  { id: 7, title: 'Resume Review Workshop', date: 'Apr 28', time: '2:00 PM – 4:00 PM', location: 'ENGR 1.100', category: 'workshop' },
]

const CATEGORIES = ['all', 'hackathon', 'club event', 'career', 'workshop', 'panel']

const CATEGORY_COLORS = {
  hackathon:  { bg: 'rgba(183,198,132,0.1)',  color: '#B7C684', border: 'rgba(183,198,132,0.2)' },
  'club event': { bg: 'rgba(248,181,109,0.1)', color: '#F8B56D', border: 'rgba(248,181,109,0.2)' },
  career:     { bg: 'rgba(96,165,250,0.1)',   color: '#60a5fa', border: 'rgba(96,165,250,0.2)' },
  workshop:   { bg: 'rgba(248,113,113,0.1)',  color: '#f87171', border: 'rgba(248,113,113,0.2)' },
  panel:      { bg: 'rgba(192,132,252,0.1)',  color: '#c084fc', border: 'rgba(192,132,252,0.2)' },
}

export default function EventsList() {
  const [filter, setFilter] = useState('all')
  const [rsvpd, setRsvpd] = useState([])

  const filtered = filter === 'all'
    ? DUMMY_EVENTS
    : DUMMY_EVENTS.filter(e => e.category === filter)

  function toggleRsvp(id) {
    // TODO (backend): wire to POST /api/events/rsvp/{id}/
    setRsvpd(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <div>
      <div className="main-header">
        <p className="main-title">Explore Events</p>
        <p className="main-sub">Browse and RSVP to upcoming CECS and campus events</p>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="ev-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`ev-filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="ev-results-count">{filtered.length} events found</p>

      {/* EVENT CARDS */}
      <div className="ev-grid">
        {filtered.map(event => {
          const colors = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.workshop
          const isRsvpd = rsvpd.includes(event.id)
          return (
            <div key={event.id} className="ev-card">

              {/* DATE BLOCK */}
              <div className="ev-date">
                <div className="ev-date-mo">{event.date.split(' ')[0]}</div>
                <div className="ev-date-day">{event.date.split(' ')[1]}</div>
              </div>

              {/* INFO */}
              <div className="ev-info">
                <h3>{event.title}</h3>
                <p className="ev-meta">
                  <span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {event.time}
                </span>
                <span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {event.location}
            </span>
        </p>
                
                <span
                  className="ev-tag"
                  style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}
                >
                  {event.category}
                </span>
              </div>

              {/* RSVP BUTTON */}
              {/* TODO (backend): wire to POST /api/events/rsvp/{id}/ */}
              <button
                className={`ev-rsvp-btn ${isRsvpd ? 'rsvpd' : ''}`}
                onClick={() => toggleRsvp(event.id)}
              >
                {isRsvpd ? '✓ Going' : 'RSVP'}
              </button>

            </div>
          )
        })}
      </div>
    </div>
  )
}
