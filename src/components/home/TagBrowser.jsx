import { useState, useEffect } from 'react'

const MAJOR_LABELS = {
    CS: 'Computer Science',
    CE: 'Computer Engineering',
    EE: 'Electrical Engineering',
    ME: 'Mechanical Engineering',
    CI: 'Computer Information Systems',
    CV: 'Civil Engineering',
    MF: 'Manufacturing Engineering',
    CY: 'Cyberspace & Informatics',
  }

export default function TagBrowser({ mode }) {
  const [users, setUsers] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [sentTo, setSentTo] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accounts/users/`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => { if (data.users) setUsers(data.users) })
  }, [])

  function buildTagMap() {
    const map = {}
    users.forEach(user => {
      const source = mode === 'skill'
        ? (user.hashtags || '')
        : (user.current_classes || '')
      
      source.split(',').forEach(raw => {
        const tag = raw.trim()
        if (!tag) return
        if (!map[tag]) map[tag] = []
        map[tag].push(user)
      })
    })
    return map
  }

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

  const tagMap = buildTagMap()
  const sortedTags = Object.entries(tagMap).sort((a, b) => b[1].length - a[1].length)

  const isSkill = mode === 'skill'

  return (
    <div style={{ padding: '0 0 60px 40px' }}>
      <div className="main-header">
        <p className="main-title">{isSkill ? 'by skill' : 'by class'}</p>
        <p className="main-sub">
          {isSkill ? 'find people by their skills and expertise' : 'find people by the classes they are taking'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {sortedTags.map(([tag, tagUsers]) => (
          <div key={tag} style={{
            background: '#1a1a1a', borderRadius: '10px',
            border: '1px solid #222', overflow: 'hidden',
          }}>
            <div
              onClick={() => setExpanded(expanded === tag ? null : tag)}
              style={{
                padding: '12px 16px', display: 'flex',
                justifyContent: 'space-between', alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <span style={{
                color: isSkill ? '#F8B56D' : '#B7C684',
                fontSize: '14px', fontWeight: 500,
              }}>
                {tag}
              </span>
              <span style={{ color: '#555', fontSize: '13px' }}>
                {tagUsers.length} {tagUsers.length === 1 ? 'person' : 'people'} {expanded === tag ? '▲' : '▼'}
              </span>
            </div>

            {expanded === tag && (
              <div style={{ borderTop: '1px solid #222' }}>
                {tagUsers.map((user, i) => (
                  <div key={i} style={{
                    padding: '12px 16px', display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between',
                    borderBottom: i < tagUsers.length - 1 ? '1px solid #1e1e1e' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: '#2a2a2a', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        color: '#B7C684', fontWeight: 500, fontSize: '14px',
                      }}>
                        {(user.preferred_name || user.username).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p style={{ color: '#fff', margin: 0, fontSize: '14px', fontWeight: 500 }}>
                          {user.preferred_name || user.username}
                        </p>
                        <p style={{ color: '#666', margin: 0, fontSize: '12px' }}>
                          {MAJOR_LABELS[user.major] || user.major} · {user.graduation_year}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => !sentTo.includes(user.username) && setSelected(user)}
                      style={{
                        padding: '6px 16px', borderRadius: '6px', border: '1px solid',
                        borderColor: sentTo.includes(user.username) ? '#333' : '#B7C684',
                        background: 'none', cursor: sentTo.includes(user.username) ? 'default' : 'pointer',
                        color: sentTo.includes(user.username) ? '#555' : '#B7C684',
                        fontSize: '13px',
                      }}
                    >
                      {sentTo.includes(user.username) ? 'sent ✓' : 'connect'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
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
                color: '#fff', fontSize: '14px', resize: 'none',
              }}
            />
            {status && <p style={{ color: '#B7C684', fontSize: '14px', margin: 0 }}>{status}</p>}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleSend} style={{
                flex: 1, background: '#B7C684', border: 'none',
                borderRadius: '8px', padding: '12px', fontWeight: 500, cursor: 'pointer',
              }}>send</button>
              <button onClick={() => { setSelected(null); setMessage(''); setStatus('') }} style={{
                flex: 1, background: '#2a2a2a', border: 'none',
                borderRadius: '8px', padding: '12px', color: '#888', cursor: 'pointer',
              }}>cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}