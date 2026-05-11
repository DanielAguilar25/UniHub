import { useState, useEffect } from 'react'
import '../../styles/StudyPartners.css'

const MAJOR_LABELS = {
  CS: 'Computer Science',
  CE: 'Computer Engineering',
  EE: 'Electrical Engineering',
  ME: 'Mechanical Engineering',
  CI: 'Computer Information Systems',
}

export default function StudyPartnersList() {
  const [search, setSearch] = useState('')
  const [partners, setPartners] = useState([])
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [sentTo, setSentTo] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accounts/users/`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.users) setPartners(data.users)
      })
  }, [])

  const filtered = partners.filter(p =>
    (p.preferred_name || p.username).toLowerCase().includes(search.toLowerCase()) ||
    (p.current_classes || '').toLowerCase().includes(search.toLowerCase())
  )

  async function handleSend() {
    setStatus('sending...')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/accounts/connect/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: selected.username, message }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('message sent!')
        setSentTo(prev => [...prev, selected.username])
        setTimeout(() => {
          setSelected(null)
          setMessage('')
          setStatus('')
        }, 2000)
      } else {
        setStatus(data.error || 'something went wrong')
      }
    } catch {
      setStatus('server unreachable')
    }
  }

  return (
    <div>
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
          filtered.map((partner, index) => (
            <div key={index} className="sp-card">
              <div className="sp-avatar">
                {(partner.preferred_name || partner.username).charAt(0).toUpperCase()}
              </div>
              <div className="sp-info">
                <h3>{partner.preferred_name || partner.username}</h3>
                <p className="sp-major">
                  {MAJOR_LABELS[partner.major] || partner.major} · {partner.graduation_year}
                </p>
                <div className="sp-courses">
                {(partner.current_classes || '').split(', ').map(course => (
                  <span key={course} className="sp-course-tag">{course}</span>
                ))}
              </div>
              {partner.hashtags && (
                <div className="sp-courses" style={{ marginTop: '6px' }}>
                  {partner.hashtags.split(',').map(tag => (
                    <span key={tag} style={{
                      fontSize: '11px', color: '#F8B56D',
                      background: '#F8B56D20', border: '1px solid #F8B56D50',
                      borderRadius: '12px', padding: '2px 8px',
                      marginRight: '4px'
                    }}>
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              </div>
              <button
              className="sp-connect-btn"
              onClick={() => !sentTo.includes(partner.username) && setSelected(partner)}
              style={{
                background: sentTo.includes(partner.username) ? '#2a2a2a' : '',
                color: sentTo.includes(partner.username) ? '#B7C684' : '',
                cursor: sentTo.includes(partner.username) ? 'default' : 'pointer',
              }}
            >
              {sentTo.includes(partner.username) ? 'sent ✓' : 'Connect'}
            </button>
            </div>
          ))
        )}
      </div>

      {selected && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 999
        }}>
          <div style={{
            background: '#1e1e1e', borderRadius: '12px',
            padding: '32px', width: '400px', display: 'flex',
            flexDirection: 'column', gap: '16px'
          }}>
            <p style={{ color: '#fff', fontSize: '18px', fontWeight: 500, margin: 0 }}>
              connect with {selected.preferred_name || selected.username}
            </p>
            <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
              your message will be sent to their utrgv email
            </p>
            <textarea
              rows={4}
              placeholder="write a message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{
                background: '#111', border: '1px solid #333',
                borderRadius: '8px', padding: '12px',
                color: '#fff', fontSize: '14px', resize: 'none'
              }}
            />
            {status && <p style={{ color: '#B7C684', fontSize: '14px', margin: 0 }}>{status}</p>}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleSend}
                style={{
                  flex: 1, background: '#B7C684', border: 'none',
                  borderRadius: '8px', padding: '12px',
                  fontWeight: 500, cursor: 'pointer'
                }}
              >
                send
              </button>
              <button
                onClick={() => { setSelected(null); setMessage(''); setStatus('') }}
                style={{
                  flex: 1, background: '#2a2a2a', border: 'none',
                  borderRadius: '8px', padding: '12px',
                  color: '#888', cursor: 'pointer'
                }}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}