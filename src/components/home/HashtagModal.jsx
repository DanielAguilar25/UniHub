import { useState } from 'react'

const PERSONALITY_TAGS = [
  '#vibecoder', '#procrastinator', '#nightowl', '#earlybird', '#studygrind',
  '#quietworker', '#groupstudier', '#sololearner', '#caffeinedependent', '#deadlinedriven',
  '#overthinker', '#quicklearner', '#notekeeper', '#highlighter', '#flashcardking',
  '#libraryrat', '#homebody', '#socialbutterfly', '#introvert', '#extrovert',
  '#anxious', '#chill', '#competitive', '#supportive', '#funny',
  '#serious', '#creative', '#logical', '#spontaneous', '#plannerahead',
  '#debugger', '#googleeverything', '#stackoverflowsurviver', '#gitpusher', '#terminallife',
  '#frontendfan', '#backendbrain', '#fullstackdreamer', '#aiobsessed', '#opensourcehero',
]

const SKILL_TAGS = [
  '#pythontutor', '#javatutor', '#cpptutor', '#javascripttutor', '#rustdev',
  '#reactdev', '#djangodev', '#sqlexpert', '#assemblyexpert', '#linuxuser',
  '#gitexpert', '#dockeruser', '#cloudlearner', '#machinelearning', '#datastructures',
  '#algorithmspro', '#cybersecurity', '#networkingbasics', '#webdev', '#mobiledev',
  '#uiuxdesigner', '#figmauser', '#canvauser', '#technicalwriter', '#projectmanager',
  '#agileuser', '#debuggingpro', '#codereviewer', '#opentotutor', '#lookingfortutor',
]

export default function HashtagModal({ current, onSave, onClose }) {
  const [activeTab, setActiveTab] = useState('personality')
  const [selected, setSelected] = useState(
    current ? current.split(',').map(t => t.trim()).filter(Boolean) : []
  )

  function toggle(tag) {
    if (selected.includes(tag)) {
      setSelected(prev => prev.filter(t => t !== tag))
    } else if (selected.length < 15) {
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

  const currentTags = activeTab === 'personality' ? PERSONALITY_TAGS : SKILL_TAGS

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 999
    }}>
      <div style={{
        background: '#1e1e1e', borderRadius: '12px',
        padding: '28px', width: '520px', maxHeight: '85vh',
        display: 'flex', flexDirection: 'column', gap: '16px'
      }}>
        <p style={{ color: '#fff', fontSize: '18px', fontWeight: 500, margin: 0 }}>
          pick your tags
        </p>
        <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
          choose up to 15 total · {selected.length}/15 selected
        </p>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('personality')}
            style={{
              flex: 1, padding: '8px', borderRadius: '8px', border: 'none',
              background: activeTab === 'personality' ? '#B7C684' : '#2a2a2a',
              color: activeTab === 'personality' ? '#1a1a1a' : '#888',
              cursor: 'pointer', fontWeight: 500, fontSize: '13px',
            }}
          >
            personality
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            style={{
              flex: 1, padding: '8px', borderRadius: '8px', border: 'none',
              background: activeTab === 'skills' ? '#F8B56D' : '#2a2a2a',
              color: activeTab === 'skills' ? '#1a1a1a' : '#888',
              cursor: 'pointer', fontWeight: 500, fontSize: '13px',
            }}
          >
            skills
          </button>
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '8px',
          overflowY: 'auto', maxHeight: '350px'
        }}>
          {currentTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggle(tag)}
              style={{
                padding: '8px 14px',
                borderRadius: '20px',
                border: selected.includes(tag)
                  ? `1px solid ${activeTab === 'personality' ? '#B7C684' : '#F8B56D'}`
                  : '1px solid #333',
                background: selected.includes(tag)
                  ? activeTab === 'personality' ? '#B7C68430' : '#F8B56D30'
                  : '#2a2a2a',
                color: selected.includes(tag)
                  ? activeTab === 'personality' ? '#B7C684' : '#F8B56D'
                  : '#888',
                cursor: selected.length >= 15 && !selected.includes(tag) ? 'not-allowed' : 'pointer',
                fontSize: '13px',
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {selected.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {selected.map(tag => (
              <span
                key={tag}
                onClick={() => toggle(tag)}
                style={{
                  padding: '4px 10px', borderRadius: '12px', fontSize: '12px',
                  background: SKILL_TAGS.includes(tag) ? '#F8B56D30' : '#B7C68430',
                  color: SKILL_TAGS.includes(tag) ? '#F8B56D' : '#B7C684',
                  cursor: 'pointer', border: '1px solid transparent',
                }}
              >
                {tag} ×
              </span>
            ))}
          </div>
        )}

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