import { useState } from 'react'

const HASHTAGS = [
  '#vibecoder', '#procrastinator', '#nightowl', '#earlybird', '#studygrind',
  '#quietworker', '#groupstudier', '#sololearner', '#caffeinedependent', '#deadlinedriven',
  '#overthinker', '#quicklearner', '#notekeeper', '#highlighter', '#flashcardking',
  '#libraryrat', '#homebody', '#socialbutterfly', '#introvert', '#extrovert',
  '#anxious', '#chill', '#competitive', '#supportive', '#funny',
  '#serious', '#creative', '#logical', '#spontaneous', '#plannerahead',
  '#debugger', '#googleeverything', '#stackoverflowsurviver', '#gitpusher', '#terminallife',
  '#frontendfan', '#backendbrain', '#fullstackdreamer', '#aiobsessed', '#opensourcehero',
]

export default function HashtagModal({ current, onSave, onClose }) {
  const [selected, setSelected] = useState(
    current ? current.split(',').map(t => t.trim()).filter(Boolean) : []
  )

  function toggle(tag) {
    if (selected.includes(tag)) {
      setSelected(prev => prev.filter(t => t !== tag))
    } else if (selected.length < 10) {
      setSelected(prev => [...prev, tag])
    }
  }

  async function handleSave() {
    const tagString = selected.join(', ')
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/accounts/hashtags/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ hashtags: tagString }),
      })
      onSave(tagString)
    } catch {
      onSave(tagString)
    }
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 999
    }}>
      <div style={{
        background: '#1e1e1e', borderRadius: '12px',
        padding: '28px', width: '500px', maxHeight: '80vh',
        display: 'flex', flexDirection: 'column', gap: '16px'
      }}>
        <p style={{ color: '#fff', fontSize: '18px', fontWeight: 500, margin: 0 }}>
          pick your hashtags
        </p>
        <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
          choose up to 10 that describe you · {selected.length}/10 selected
        </p>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '8px',
          overflowY: 'auto', maxHeight: '350px'
        }}>
          {HASHTAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggle(tag)}
              style={{
                padding: '8px 14px',
                borderRadius: '20px',
                border: selected.includes(tag) ? '1px solid #B7C684' : '1px solid #333',
                background: selected.includes(tag) ? '#B7C68430' : '#2a2a2a',
                color: selected.includes(tag) ? '#B7C684' : '#888',
                cursor: selected.length >= 10 && !selected.includes(tag) ? 'not-allowed' : 'pointer',
                fontSize: '13px',
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSave}
            style={{
              flex: 1, background: '#B7C684', border: 'none',
              borderRadius: '8px', padding: '12px',
              fontWeight: 500, cursor: 'pointer',
            }}
          >
            save
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1, background: '#2a2a2a', border: 'none',
              borderRadius: '8px', padding: '12px',
              color: '#888', cursor: 'pointer',
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  )
}