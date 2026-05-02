import { useState } from 'react'
import '../../styles/StudyPartners.css'

const DUMMY_PARTNERS = [
  { id: 1, name: 'Maria Lopez',   major: 'Computer Science',       year: 'Junior',    courses: ['CSCI 3320', 'CSCI 4350'] },
  { id: 2, name: 'James Torres',  major: 'Computer Science',       year: 'Sophomore', courses: ['CSCI 3320', 'MATH 2413'] },
  { id: 3, name: 'Priya Nair',    major: 'Computer Engineering',   year: 'Junior',    courses: ['CSCI 4350', 'EECE 3301'] },
  { id: 4, name: 'Carlos Reyes',  major: 'Information Technology', year: 'Senior',    courses: ['CSCI 4380', 'CSCI 3320'] },
  { id: 5, name: 'Sofia Garza',   major: 'Computer Science',       year: 'Freshman',  courses: ['CSCI 1301', 'MATH 2413'] },
  { id: 6, name: 'Ethan Kim',     major: 'Computer Engineering',   year: 'Sophomore', courses: ['EECE 3301', 'MATH 2413'] },
]

export default function StudyPartnersList() {
  const [search, setSearch] = useState('')

  const filtered = DUMMY_PARTNERS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.courses.some(c => c.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div style={{ padding: '0 28px' }}>
      <div className="main-header">
        <p className="main-title">Find Partners</p>
        <p className="main-sub">connect with classmates by course or subject</p>
      </div>

      <div className="sp-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search by course or name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <p className="sp-results-count">{filtered.length} students available</p>

      <div className="sp-grid">
        {filtered.length === 0 ? (
          <div className="sp-card">
            <p style={{ color: '#555', fontSize: '14px' }}>No students found.</p>
          </div>
        ) : (
          filtered.map(partner => (
            <div key={partner.id} className="sp-card">
              <div className="sp-avatar">{partner.name.charAt(0)}</div>
              <div className="sp-info">
                <h3>{partner.name}</h3>
                <p className="sp-major">{partner.major} · {partner.year}</p>
                <div className="sp-courses">
                  {partner.courses.map(course => (
                    <span key={course} className="sp-course-tag">{course}</span>
                  ))}
                </div>
              </div>
              <button className="sp-connect-btn">Connect</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}