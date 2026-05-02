import { useState } from 'react'
import '../../styles/StudentProfile.css'

// -------------------------------------------------------
// TODO (backend): replace with fetch() to GET /api/profile/
// -------------------------------------------------------
const DUMMY_PROFILE = {
  name: 'Daniel Aguilar',
  username: '@danielaguilar',
  major: 'Computer Science',
  year: 'Junior',
  gpa: '3.6',
  bio: 'CECS student passionate about software engineering and open source. Looking for study partners for upper-division CS courses.',
  courses: ['CSCI 3320', 'CSCI 4350', 'MATH 2413', 'CSCI 4380'],
  clubs: ['ACM Student Chapter', 'Google Developer Student Club'],
  connections: 12,
}

export default function StudentProfile() {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState(DUMMY_PROFILE)
  const [draft, setDraft] = useState(DUMMY_PROFILE)

  function handleSave() {
    // TODO (backend): wire to PUT /api/profile/
    setProfile(draft)
    setEditing(false)
  }

  function handleCancel() {
    setDraft(profile)
    setEditing(false)
  }

  return (
    <div style={{ padding: '0 28px' }}>
      <div className="main-header">
        <p className="main-title">My Profile</p>
        <p className="main-sub">Your public student profile</p>
      </div>

      <div className="pr-card">

        {/* TOP ROW */}
        <div className="pr-top">
          <div className="pr-avatar">
            {profile.name.charAt(0)}
          </div>
          <div className="pr-identity">
            {editing ? (
              <input
                className="pr-input"
                value={draft.name}
                onChange={e => setDraft({ ...draft, name: e.target.value })}
              />
            ) : (
              <h2>{profile.name}</h2>
            )}
            <p className="pr-username">{profile.username}</p>
            <div className="pr-badges">
              <span className="pr-badge-green">{profile.major}</span>
              <span className="pr-badge-orange">{profile.year}</span>
            </div>
          </div>
          <div className="pr-actions">
            {editing ? (
              <>
                <button className="pr-btn-save" onClick={handleSave}>Save</button>
                <button className="pr-btn-cancel" onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <button className="pr-btn-edit" onClick={() => setEditing(true)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* STATS ROW */}
        <div className="pr-stats">
          <div className="pr-stat">
            <span className="pr-stat-num">{profile.courses.length}</span>
            <span className="pr-stat-lbl">Courses</span>
          </div>
          <div className="pr-stat">
            <span className="pr-stat-num">{profile.clubs.length}</span>
            <span className="pr-stat-lbl">Clubs</span>
          </div>
          <div className="pr-stat">
            <span className="pr-stat-num">{profile.connections}</span>
            <span className="pr-stat-lbl">Connections</span>
          </div>
          <div className="pr-stat">
            <span className="pr-stat-num">{profile.gpa}</span>
            <span className="pr-stat-lbl">GPA</span>
          </div>
        </div>

        {/* BIO */}
        <div className="pr-section">
          <p className="pr-section-label">BIO</p>
          {editing ? (
            <textarea
              className="pr-textarea"
              value={draft.bio}
              onChange={e => setDraft({ ...draft, bio: e.target.value })}
            />
          ) : (
            <p className="pr-bio">{profile.bio}</p>
          )}
        </div>

        {/* COURSES */}
        <div className="pr-section">
          <p className="pr-section-label">CURRENT COURSES</p>
          <div className="pr-tags">
            {profile.courses.map(course => (
              <span key={course} className="pr-course-tag">{course}</span>
            ))}
          </div>
        </div>

        {/* CLUBS */}
        <div className="pr-section">
          <p className="pr-section-label">CLUBS</p>
          <div className="pr-tags">
            {profile.clubs.map(club => (
              <span key={club} className="pr-club-tag">{club}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
