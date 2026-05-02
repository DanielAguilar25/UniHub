import { useState } from 'react'
import '../../styles/AnnouncementsList.css'

// -------------------------------------------------------
// TODO (backend): replace with fetch() to GET /api/announcements/
// -------------------------------------------------------
const DUMMY_ANNOUNCEMENTS = [
  { id: 1, title: 'Spring 2025 Hackathon Registration Open', body: 'Registration for the CECS Spring Hackathon is now open. Sign up as a team of 2-4 students. Prizes for top 3 teams!', author: 'CECS Admin', date: 'Apr 1', category: 'school-wide', pinned: true },
  { id: 2, title: 'ACM Meeting This Thursday', body: 'ACM will be hosting a guest speaker from Google this Thursday at 5PM in ENGR 1.100. All are welcome to attend.', author: 'ACM Club', date: 'Apr 3', category: 'club', pinned: false },
  { id: 3, title: 'Finals Week Study Rooms Available', body: 'The library has extended hours during finals week. Study rooms can be booked online through the UTRGV library portal.', author: 'CECS Admin', date: 'Apr 5', category: 'school-wide', pinned: false },
  { id: 4, title: 'IEEE Workshop Sign-ups', body: 'IEEE is hosting an Intro to Embedded Systems workshop on Apr 17. Limited spots available — sign up on the IEEE board.', author: 'IEEE UTRGV', date: 'Apr 6', category: 'club', pinned: false },
  { id: 5, title: 'Career Fair Prep Session', body: 'Join us for a resume and interview prep session before Industry Night. Bring your resume and dress professionally.', author: 'CECS Admin', date: 'Apr 8', category: 'school-wide', pinned: false },
  { id: 6, title: 'Cybersecurity CTF This Weekend', body: 'The Cybersecurity Club is hosting a CTF competition this weekend. Open to all skill levels. DM on Discord to join a team.', author: 'Cybersecurity Club', date: 'Apr 10', category: 'club', pinned: false },
]

const CATEGORIES = ['all', 'school-wide', 'club']

const CATEGORY_COLORS = {
  'school-wide': { bg: 'rgba(183,198,132,0.1)', color: '#B7C684', border: 'rgba(183,198,132,0.2)' },
  'club':        { bg: 'rgba(248,181,109,0.1)', color: '#F8B56D', border: 'rgba(248,181,109,0.2)' },
}

export default function AnnouncementsList() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? DUMMY_ANNOUNCEMENTS
    : DUMMY_ANNOUNCEMENTS.filter(a => a.category === filter)

  const pinned = filtered.filter(a => a.pinned)
  const rest = filtered.filter(a => !a.pinned)
  const sorted = [...pinned, ...rest]

  return (
    <div style={{ padding: '0 28px' }}>
      <div className="main-header">
        <p className="main-title">Announcements</p>
        <p className="main-sub">Stay updated with school-wide and club announcements</p>
      </div>

      {/* FILTERS */}
      <div className="an-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`an-filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="an-results-count">{sorted.length} announcements</p>

      {/* ANNOUNCEMENT CARDS */}
      <div className="an-grid">
        {sorted.map(a => {
          const colors = CATEGORY_COLORS[a.category]
          return (
            <div key={a.id} className={`an-card ${a.pinned ? 'pinned' : ''}`}>

              {/* PINNED BADGE */}
              {a.pinned && (
                <div className="an-pinned-badge">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  pinned
                </div>
              )}

              {/* HEADER */}
              <div className="an-header">
                <div className="an-meta">
                  <span
                    className="an-tag"
                    style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}
                  >
                    {a.category}
                  </span>
                  <span className="an-author">{a.author}</span>
                  <span className="an-dot">·</span>
                  <span className="an-date">{a.date}</span>
                </div>
                <h3>{a.title}</h3>
              </div>

              {/* BODY */}
              <p className="an-body">{a.body}</p>

            </div>
          )
        })}
      </div>
    </div>
  )
}
