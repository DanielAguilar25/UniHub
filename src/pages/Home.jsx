import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import StudyPartnersList from '../components/home/StudyPartnersList'
import EventsList from '../components/home/EventsList'
import ScheduleView from '../components/home/ScheduleView'
import HashtagModal from '../components/home/HashtagModal'


const SECTIONS = {
  foryou: ['feed', 'activity', 'recommended', 'groups', 'schedule'],
  study: ['find partners', 'my groups', 'resources'],
  schedule: ['my schedule', 'availability', 'reminders'],
  profile: ['my profile', 'settings', 'achievements'],
}
export default function HomePage() {
  const [showHashtagModal, setShowHashtagModal] = useState(false)
  const [mode, setMode] = useState('dark')
  const [section, setSection] = useState('foryou')
  const [sub, setSub] = useState('feed')
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accounts/profile/`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setProfile(data))
  }, [])

  function toggleMode() {
    setMode(prev => prev === 'dark' ? 'light' : 'dark')
  }

  function handleSection(s) {
    setSection(s)
    setSub(SECTIONS[s][0])
  }

  return (
    <div className={`home-page ${mode}`}>

      <div className="icon-bar">
        <svg className="icon-logo" viewBox="0 0 80 80" fill="none">
          <rect width="80" height="80" rx="10" fill="#B7C684"/>
          <rect x="12" y="12" width="22" height="22" rx="2" fill="#F8B56D"/>
          <rect x="46" y="12" width="22" height="22" rx="2" fill="#F8B56D"/>
          <path d="M11 63 Q11 46 23 46 Q35 46 35 63 L35 69 L11 69 Z" fill="#F8B56D"/>
          <path d="M45 63 Q45 46 57 46 Q69 46 69 63 L69 69 L45 69 Z" fill="#F8B56D"/>
        </svg>

        {[
        { key: 'foryou', sym: '⊞', label: 'for you' },
        { key: 'study', sym: '✎', label: 'study' },
        { key: 'schedule', sym: '▦', label: 'schedule' },
      ].map(item => (
          <button
            key={item.key}
            className={`icon-btn ${section === item.key ? 'active' : ''}`}
            onClick={() => handleSection(item.key)}
          >
            <span className="icon-sym">{item.sym}</span>
            <span className="icon-label">{item.label}</span>
          </button>
        ))}

        <div className="icon-spacer" />

        <button
          className={`icon-btn ${section === 'profile' ? 'active' : ''}`}
          onClick={() => handleSection('profile')}
        >
          <span className="icon-sym">⊙</span>
          <span className="icon-label">profile</span>
        </button>

        <button className="icon-bulb" onClick={toggleMode}>
          <svg viewBox="0 0 28 28" fill="none" width="24" height="24">
            <circle cx="14" cy="11" r="6" stroke="#B7C684" strokeWidth="1.8"/>
            <path d="M11 17 Q11 21 14 21 Q17 21 17 17" stroke="#B7C684" strokeWidth="1.8" fill="none"/>
            <line x1="14" y1="22" x2="14" y2="25" stroke="#B7C684" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="11" y1="23" x2="17" y2="23" stroke="#B7C684" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="4" y1="11" x2="6" y2="11" stroke="#B7C684" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="22" y1="11" x2="24" y2="11" stroke="#B7C684" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="6.5" y1="4.5" x2="8" y2="6" stroke="#B7C684" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="21.5" y1="4.5" x2="20" y2="6" stroke="#B7C684" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="14" y1="1" x2="14" y2="3" stroke="#B7C684" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="home-sidebar">
        <p className="sidebar-title">{section.toUpperCase().replace('FORYOU', 'FOR YOU')}</p>
        {SECTIONS[section].map(item => (
          <div
            key={item}
            className={`sidebar-item ${sub === item ? 'active' : ''}`}
            onClick={() => setSub(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="home-main">
        {section === 'foryou' && sub === 'feed' ? (
          <>
            <div className="main-header">
              <p className="main-title">
                {profile?.preferred_name ? `hello, ${profile.preferred_name}` : 'for you'}
              </p>
              <p className="main-sub">based on your major and classes</p>
              {profile && (
                <div className="profile-summary">
                  <p>major: {profile.major}</p>
                  <p>graduation year: {profile.graduation_year}</p>
                  <p>classes: {profile.current_classes}</p>
                </div>
              )}
            </div>
            <div className="tags-section">
            <p className="section-label">YOUR TAGS</p>
            <div className="tags-row">
              {profile?.hashtags ? (
                profile.hashtags.split(',').map(tag => (
                  <div key={tag} className="tag">{tag.trim()}</div>
                ))
              ) : (
                <div className="tag" style={{ cursor: 'pointer', opacity: 0.6 }} onClick={() => setShowHashtagModal(true)}>
                  #no tags yet — click to add
                </div>
              )}
              {profile?.hashtags && (
                <div className="tag" style={{ cursor: 'pointer', opacity: 0.6 }} onClick={() => setShowHashtagModal(true)}>
                  + edit
                </div>
              )}
            </div>
          </div>
            <div className="posts-section">
              <p className="section-label">POSTS</p>
              <div className="empty-state">
                <p>no posts yet</p>
                <small>check back soon</small>
              </div>
            </div>
          </>
        ) : section === 'study' && sub === 'find partners' ? (
          <StudyPartnersList />
        ) : section === 'schedule' && sub === 'my schedule' ? (
          <ScheduleView userClasses={profile?.current_classes} />
        ) : (
          <div className="coming-soon">
            <p>{sub}</p>
            <small>coming soon</small>
          </div>

        )}
      </div>

      {showHashtagModal && (
        <HashtagModal
          current={profile?.hashtags || ''}
          onSave={(tags) => {
            setProfile(prev => ({ ...prev, hashtags: tags }))
            setShowHashtagModal(false)
          }}
          onClose={() => setShowHashtagModal(false)}
        />
      )}
    </div>
  )
}