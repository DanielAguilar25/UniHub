import { useState, useEffect } from 'react'

const DAYS = [
  { key: 'MON', label: 'Monday' },
  { key: 'TUE', label: 'Tuesday' },
  { key: 'WED', label: 'Wednesday' },
  { key: 'THU', label: 'Thursday' },
  { key: 'FRI', label: 'Friday' },
]

const TIME_SLOTS = [
  { key: '08:00', label: '8:00 AM - 9:15 AM' },
  { key: '09:30', label: '9:30 AM - 10:45 AM' },
  { key: '11:00', label: '11:00 AM - 12:15 PM' },
  { key: '12:30', label: '12:30 PM - 1:45 PM' },
  { key: '14:00', label: '2:00 PM - 3:15 PM' },
  { key: '15:30', label: '3:30 PM - 4:45 PM' },
  { key: '17:00', label: '5:00 PM - 6:15 PM' },
  { key: '18:30', label: '6:30 PM - 7:45 PM' },
  { key: '20:00', label: '8:00 PM - 9:15 PM' },
  { key: '21:30', label: '9:30 PM - 10:45 PM' },
]

const ALL_COURSES = [
  'CSCI 1101', 'CSCI 1470', 'CSCI 2380', 'CSCI 2344', 'CSCI 2333',
  'CSCI 3310', 'CSCI 3326', 'CSCI 3328', 'CSCI 3329', 'CSCI 3333',
  'CSCI 3336', 'CSCI 3340', 'CSCI 4325', 'CSCI 4333', 'CSCI 4334',
  'CSCI 4335', 'CSCI 4345', 'CSCI 4390', 'MATH 2413', 'MATH 2414',
  'MATH 2318', 'EECE 2306', 'EECE 2106', 'EECE 3340', 'ENGL 1301',
  'ENGL 1302', 'ENGL 3342', 'COMM 1315', 'PHIL 2326', 'POLS 2305',
  'POLS 2306', 'HIST 1301', 'HIST 1302', 'STAT 3337', 'STAT 3301',
]

export default function ScheduleView({ userClasses }) {
  const [schedule, setSchedule] = useState({})
  const [editing, setEditing] = useState(null)
  const [status, setStatus] = useState('')
  const [myClasses, setMyClasses] = useState([])
  const [showAddMore, setShowAddMore] = useState(false)
  const [courseSearch, setCourseSearch] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accounts/schedule/`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.schedule) setSchedule(data.schedule)
      })
  }, [])

  useEffect(() => {
    if (userClasses) {
      setMyClasses(userClasses.split(', ').filter(c => c.trim()))
    }
  }, [userClasses])

  function handleCellClick(day, slot) {
    setEditing({ day, slot })
    setShowAddMore(false)
    setCourseSearch('')
  }

  function handleSelect(className) {
    const key = `${editing.day}_${editing.slot}`
    if (className === '') {
      const updated = { ...schedule }
      delete updated[key]
      setSchedule(updated)
    } else {
      setSchedule(prev => ({ ...prev, [key]: className }))
    }
    setEditing(null)
  }

  function handleAddCourse(course) {
    if (!myClasses.includes(course)) {
      setMyClasses(prev => [...prev, course])
    }
    setShowAddMore(false)
    setCourseSearch('')
  }

  async function handleSave() {
    setStatus('saving...')
    const entries = Object.entries(schedule).map(([key, class_name]) => {
      const [day, time_slot] = key.split('_')
      return { day, time_slot, class_name }
    })

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/accounts/schedule/save/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ entries }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('saved!')
        setTimeout(() => setStatus(''), 2000)
      } else {
        setStatus(data.error || 'something went wrong')
      }
    } catch {
      setStatus('server unreachable')
    }
  }

  const filteredCourses = ALL_COURSES.filter(c =>
    c.toLowerCase().includes(courseSearch.toLowerCase()) &&
    !myClasses.includes(c)
  )

  return (
    <div style={{ padding: '0 0 40px' }}>
      <div className="main-header">
        <p className="main-title">my schedule</p>
        <p className="main-sub">click a slot to assign a class</p>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', color: '#888', fontSize: '13px', textAlign: 'left', width: '130px' }}>
                time
              </th>
              {DAYS.map(d => (
                <th key={d.key} style={{ padding: '10px', color: '#B7C684', fontSize: '13px', textAlign: 'center' }}>
                  {d.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map(slot => (
              <tr key={slot.key}>
                <td style={{ padding: '8px 10px', color: '#666', fontSize: '12px', whiteSpace: 'nowrap' }}>
                  {slot.label}
                </td>
                {DAYS.map(day => {
                  const key = `${day.key}_${slot.key}`
                  const className = schedule[key]
                  return (
                    <td
                      key={day.key}
                      onClick={() => handleCellClick(day.key, slot.key)}
                      style={{
                        padding: '6px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        border: '1px solid #222',
                      }}
                    >
                      {className ? (
                        <div style={{
                          background: '#B7C68430',
                          border: '1px solid #B7C684',
                          borderRadius: '6px',
                          padding: '4px 6px',
                          fontSize: '11px',
                          color: '#B7C684',
                        }}>
                          {className}
                        </div>
                      ) : (
                        <div style={{
                          height: '28px',
                          borderRadius: '6px',
                          background: '#1a1a1a',
                        }} />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={handleSave}
          style={{
            background: '#B7C684', border: 'none', borderRadius: '8px',
            padding: '10px 24px', fontWeight: 500, cursor: 'pointer',
          }}
        >
          save schedule
        </button>
        {status && <p style={{ color: '#B7C684', margin: 0, fontSize: '14px' }}>{status}</p>}
      </div>

      {editing && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 999
        }}>
          <div style={{
            background: '#1e1e1e', borderRadius: '12px',
            padding: '24px', width: '320px', display: 'flex',
            flexDirection: 'column', gap: '12px'
          }}>

            {!showAddMore ? (
              <>
                <p style={{ color: '#fff', fontSize: '16px', fontWeight: 500, margin: 0 }}>
                  select a class
                </p>
                <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
                  {DAYS.find(d => d.key === editing.day)?.label} · {TIME_SLOTS.find(s => s.key === editing.slot)?.label}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                  <button
                    onClick={() => handleSelect('')}
                    style={{
                      background: '#2a2a2a', border: '1px solid #333',
                      borderRadius: '8px', padding: '10px',
                      color: '#888', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    clear slot
                  </button>
                  <button
                    onClick={() => setShowAddMore(true)}
                    style={{
                      background: '#1a1a2e', border: '1px solid #B7C684',
                      borderRadius: '8px', padding: '10px',
                      color: '#B7C684', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    + add more classes
                  </button>
                  {myClasses.map(c => (
                    <button
                      key={c}
                      onClick={() => handleSelect(c.trim())}
                      style={{
                        background: '#2a2a2a', border: '1px solid #333',
                        borderRadius: '8px', padding: '10px',
                        color: '#fff', cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      {c.trim()}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setEditing(null)}
                  style={{
                    background: 'none', border: 'none',
                    color: '#666', cursor: 'pointer', fontSize: '13px',
                  }}
                >
                  cancel
                </button>
              </>
            ) : (
              <>
                <p style={{ color: '#fff', fontSize: '16px', fontWeight: 500, margin: 0 }}>
                  add a class
                </p>
                <input
                  type="text"
                  placeholder="search courses..."
                  value={courseSearch}
                  onChange={e => setCourseSearch(e.target.value)}
                  style={{
                    background: '#111', border: '1px solid #333',
                    borderRadius: '8px', padding: '10px',
                    color: '#fff', fontSize: '14px',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
                  {filteredCourses.map(c => (
                    <button
                      key={c}
                      onClick={() => handleAddCourse(c)}
                      style={{
                        background: '#2a2a2a', border: '1px solid #333',
                        borderRadius: '8px', padding: '10px',
                        color: '#fff', cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowAddMore(false)}
                  style={{
                    background: 'none', border: 'none',
                    color: '#666', cursor: 'pointer', fontSize: '13px',
                  }}
                >
                  back
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}