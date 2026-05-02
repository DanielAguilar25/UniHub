import { useState } from 'react'
import '../../styles/MeetPeople.css'

// -------------------------------------------------------
// TODO (backend): replace with fetch() to GET /api/students/
// -------------------------------------------------------
const DUMMY_STUDENTS = [
  { id: 1,  name: 'Maria Lopez',     major: 'Computer Science',       year: 'Junior',    interests: ['Web Dev', 'AI', 'Open Source'] },
  { id: 2,  name: 'James Torres',    major: 'Computer Science',       year: 'Sophomore', interests: ['Cybersecurity', 'Networking'] },
  { id: 3,  name: 'Priya Nair',      major: 'Computer Engineering',   year: 'Junior',    interests: ['Embedded Systems', 'Robotics'] },
  { id: 4,  name: 'Carlos Reyes',    major: 'Information Technology', year: 'Senior',    interests: ['Cloud', 'DevOps', 'Databases'] },
  { id: 5,  name: 'Sofia Garza',     major: 'Computer Science',       year: 'Freshman',  interests: ['Game Dev', 'Python'] },
  { id: 6,  name: 'Ethan Kim',       major: 'Computer Engineering',   year: 'Sophomore', interests: ['Hardware', 'IoT'] },
  { id: 7,  name: 'Ava Hernandez',   major: 'Computer Science',       year: 'Senior',    interests: ['Machine Learning', 'Data Science'] },
  { id: 8,  name: 'Luis Mendoza',    major: 'Information Technology', year: 'Junior',    interests: ['IT Support', 'Networking', 'Cloud'] },
  { id: 9,  name: 'Zoe Castillo',    major: 'Computer Engineering',   year: 'Freshman',  interests: ['Robotics', 'Circuits'] },
  { id: 10, name: 'Noah Ramirez',    major: 'Computer Science',       year: 'Junior',    interests: ['Algorithms', 'Competitive Programming'] },
]

const MAJORS = ['all', 'Computer Science', 'Computer Engineering', 'Information Technology']
const YEARS  = ['all', 'Freshman', 'Sophomore', 'Junior', 'Senior']

export default function MeetPeople() {
  const [majorFilter, setMajorFilter] = useState('all')
  const [yearFilter, setYearFilter]   = useState('all')
  const [search, setSearch]           = useState('')
  const [connected, setConnected]     = useState([])

  const filtered = DUMMY_STUDENTS.filter(s => {
    const matchesMajor  = majorFilter === 'all' || s.major === majorFilter
    const matchesYear   = yearFilter  === 'all' || s.year  === yearFilter
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.interests.some(i => i.toLowerCase().includes(search.toLowerCase()))
    return matchesMajor && matchesYear && matchesSearch
  })

  function toggleConnect(id) {
    // TODO (backend): wire to POST /api/students/connect/{id}/
    setConnected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const MAJOR_COLORS = {
    'Computer Science':       { bg: 'rgba(183,198,132,0.1)', color: '#B7C684', border: 'rgba(183,198,132,0.2)' },
    'Computer Engineering':   { bg: 'rgba(248,181,109,0.1)', color: '#F8B56D', border: 'rgba(248,181,109,0.2)' },
    'Information Technology': { bg: 'rgba(96,165,250,0.1)',  color: '#60a5fa', border: 'rgba(96,165,250,0.2)'  },
  }

  return (
    <div style={{ padding: '0 28px' }}>
      <div className="main-header">
        <p className="main-title">Meet People</p>
        <p className="main-sub">Connect with students who share your major or interests</p>
      </div>

      {/* SEARCH */}
      <div className="mp-search-bar">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search by name or interest..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* MAJOR FILTERS */}
      <p className="mp-filter-label">MAJOR</p>
      <div className="mp-filters">
        {MAJORS.map(m => (
          <button
            key={m}
            className={`mp-filter-btn ${majorFilter === m ? 'active' : ''}`}
            onClick={() => setMajorFilter(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {/* YEAR FILTERS */}
      <p className="mp-filter-label">YEAR</p>
      <div className="mp-filters" style={{ marginBottom: '1.25rem' }}>
        {YEARS.map(y => (
          <button
            key={y}
            className={`mp-filter-btn ${yearFilter === y ? 'active' : ''}`}
            onClick={() => setYearFilter(y)}
          >
            {y}
          </button>
        ))}
      </div>

      <p className="mp-results-count">{filtered.length} students found</p>

      {/* CARDS */}
      <div className="mp-grid">
        {filtered.length === 0 ? (
          <div className="mp-card">
            <p style={{ color: '#555', fontSize: '14px' }}>No students found.</p>
          </div>
        ) : (
          filtered.map(student => {
            const isConnected = connected.includes(student.id)
            const colors = MAJOR_COLORS[student.major]
            return (
              <div key={student.id} className="mp-card">

                {/* AVATAR */}
                <div className="mp-avatar" style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}>
                  {student.name.charAt(0)}
                </div>

                {/* INFO */}
                <div className="mp-info">
                  <div className="mp-name-row">
                    <h3>{student.name}</h3>
                    <span className="mp-year-tag">{student.year}</span>
                  </div>
                  <span
                    className="mp-major-tag"
                    style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}
                  >
                    {student.major}
                  </span>
                  <div className="mp-interests">
                    {student.interests.map(interest => (
                      <span key={interest} className="mp-interest-tag">{interest}</span>
                    ))}
                  </div>
                </div>

                {/* CONNECT BUTTON */}
                {/* TODO (backend): wire to POST /api/students/connect/{id}/ */}
                <button
                  className={`mp-connect-btn ${isConnected ? 'connected' : ''}`}
                  onClick={() => toggleConnect(student.id)}
                >
                  {isConnected ? '✓ Connected' : 'Connect'}
                </button>

              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
