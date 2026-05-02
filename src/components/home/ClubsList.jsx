import { useState } from 'react'
import '../../styles/ClubsList.css'

// -------------------------------------------------------
// TODO (backend): replace with fetch() to GET /api/clubs/
// -------------------------------------------------------
const DUMMY_CLUBS = [
  { id: 1, name: 'ACM Student Chapter',         category: 'Computer Science', members: 120, desc: 'Association for Computing Machinery — coding competitions, workshops, and networking.' },
  { id: 2, name: 'IEEE UTRGV',                   category: 'Engineering',      members: 85,  desc: 'Institute of Electrical and Electronics Engineers student branch.' },
  { id: 3, name: 'Women in Computing',           category: 'Computer Science', members: 60,  desc: 'Empowering women in tech through mentorship, events, and community.' },
  { id: 4, name: 'Cybersecurity Club',           category: 'Computer Science', members: 74,  desc: 'CTF competitions, ethical hacking workshops, and security research.' },
  { id: 5, name: 'Robotics Club',                category: 'Engineering',      members: 48,  desc: 'Design and build robots for competitions like VEX and FIRST.' },
  { id: 6, name: 'Google Developer Student Club', category: 'Computer Science', members: 95,  desc: 'Build projects with Google technologies and connect with developers.' },
  { id: 7, name: 'Data Science Club',            category: 'Computer Science', members: 55,  desc: 'Explore ML, AI, and data analytics through projects and talks.' },
  { id: 8, name: 'Society of Hispanic Engineers', category: 'Engineering',     members: 110, desc: 'SHPE chapter supporting Hispanic students in STEM fields.' },
]

const CATEGORIES = ['all', 'Computer Science', 'Engineering']

export default function ClubsList() {
  const [filter, setFilter] = useState('all')
  const [joined, setJoined] = useState([])
  const [search, setSearch] = useState('')

  const filtered = DUMMY_CLUBS.filter(c => {
    const matchesCategory = filter === 'all' || c.category === filter
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  function toggleJoin(id) {
    // TODO (backend): wire to POST /api/clubs/join/{id}/
    setJoined(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

return (
    <div style={{ padding: '0 28px' }}>
      <div className="main-header">
        <p className="main-title">Clubs</p>
        <p className="main-sub">Discover and join UTRGV CECS student organizations</p>
      </div>

      {/* SEARCH */}
      <div className="cl-search-bar">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search clubs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* CATEGORY FILTERS */}
      <div className="cl-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`cl-filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="cl-results-count">{filtered.length} clubs found</p>

      {/* CLUB CARDS */}
      <div className="cl-grid">
        {filtered.length === 0 ? (
          <div className="cl-card">
            <p style={{ color: '#555', fontSize: '14px' }}>No clubs found.</p>
          </div>
        ) : (
          filtered.map(club => {
            const isJoined = joined.includes(club.id)
            return (
              <div key={club.id} className="cl-card">
                <div className="cl-avatar">
                  {club.name.charAt(0)}
                </div>
                <div className="cl-info">
                  <div className="cl-name-row">
                    <h3>{club.name}</h3>
                    <span className="cl-category-tag">{club.category}</span>
                  </div>
                  <p className="cl-desc">{club.desc}</p>
                  <p className="cl-members">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    {club.members} members
                  </p>
                </div>
                <button
                  className={`cl-join-btn ${isJoined ? 'joined' : ''}`}
                  onClick={() => toggleJoin(club.id)}
                >
                  {isJoined ? '✓ Joined' : 'Join'}
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
)}