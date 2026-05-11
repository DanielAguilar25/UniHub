import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState('dark')
  const [accentColor, setAccentColor] = useState('#B7C684')
  const [errorStatus, setErrorStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const signupRef = useRef(null)
  const bulbRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const parts = ['lp0', 'lp1', 'lp2', 'lp3', 'lp4']
    parts.forEach((id, i) => {
      setTimeout(() => {
        document.getElementById(id)?.classList.add('show')
      }, i * 300)
    })

    const colors = ['#B7C684', '#F8B56D']
    let ci = 0
    const interval = setInterval(() => {
      ci = (ci + 1) % 2
      const c = colors[ci]
      setAccentColor(c)
      bulbRef.current?.querySelectorAll('circle,path,line').forEach(el => {
        if (el.getAttribute('stroke')) el.setAttribute('stroke', c)
      })
    }, 3000)

    const verbs = ['build', 'connect', 'discover', 'collaborate', 'innovate', 'belong', 'contribute', 'explore', 'create', 'launch']
    let vi = 0
    const verbEl = document.getElementById('brand-verb')
    const verbInterval = setInterval(() => {
      verbEl?.classList.remove('fade-in')
      verbEl?.classList.add('fade-out')
      setTimeout(() => {
        vi = (vi + 1) % verbs.length
        if (verbEl) verbEl.textContent = verbs[vi]
        verbEl?.classList.remove('fade-out')
        verbEl?.classList.add('fade-in')
      }, 400)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearInterval(verbInterval)
    }
  }, [])

  async function handleLogin() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json()
      if (response.ok) {
        navigate('/home')
      } else {
        setError(data.error || 'login failed')
        setErrorStatus(response.status)
      }
    } catch (err) {
      setError('server unreachable')
    }
    setLoading(false)
  }

  function toggleMode() {
    setMode(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={`login-page ${mode}`}>

      <div className="login-branding">
        <div className="login-brand-left">
          <svg className="login-logo" width="80" height="80" viewBox="0 0 80 80" fill="none">
            <rect id="lp0" className="logo-part" width="80" height="80" rx="10" fill="#B7C684"/>
            <rect id="lp1" className="logo-part" x="12" y="12" width="22" height="22" rx="2" fill="#F8B56D"/>
            <rect id="lp2" className="logo-part" x="46" y="12" width="22" height="22" rx="2" fill="#F8B56D"/>
            <path id="lp3" className="logo-part" d="M11 63 Q11 46 23 46 Q35 46 35 63 L35 69 L11 69 Z" fill="#F8B56D"/>
            <path id="lp4" className="logo-part" d="M45 63 Q45 46 57 46 Q69 46 69 63 L69 69 L45 69 Z" fill="#F8B56D"/>
          </svg>
          <h2>UniHub</h2>
        </div>

        <div className="login-brand-divider" />

        <div className="login-brand-right">
          <p className="login-brand-static">ready, set...</p>
          <span className="login-brand-verb fade-in" id="brand-verb">build</span>
        </div>
      </div>

      <div className="login-form-side">
        <button className="bulb-btn" onClick={toggleMode}>
          <svg ref={bulbRef} viewBox="0 0 28 28" fill="none">
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

        <h1>welcome back</h1>
        <p className="login-subtitle">log in to your account</p>

        <label>username</label>
        <input
          type="text"
          placeholder="your username"
          autoComplete="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label>password</label>
        <input
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && (
          <p className="login-error">
            {error}{' '}
            {errorStatus && (
              <a href={`https://http.cat/status/${errorStatus}`} target="_blank" rel="noreferrer">
                learn more
              </a>
            )}
          </p>
        )}

        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? 'logging in...' : 'log in'}
        </button>

        <div className="login-divider">
          <hr /><span>or continue with</span><hr />
        </div>

        <div className="oauth-buttons">
          <div className="oauth-btn">Google <small>future sprint</small></div>
          <div className="oauth-btn">Apple <small>future sprint</small></div>
        </div>

        <p className="login-footer">
          no account?{' '}
          <a href="/signup" ref={signupRef} style={{ color: accentColor }}>sign up</a>
        </p>
      </div>
    </div>
  )
}