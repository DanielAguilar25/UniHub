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
    const colors = ['#B7C684', '#F8B56D']
    let ci = 0

    const interval = setInterval(() => {
      ci = (ci + 1) % colors.length
      setAccentColor(colors[ci])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accentColor)
  }, [accentColor])

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
        setError(data.error || 'Login failed')
        setErrorStatus(response.status)
      }
    } catch (err) {
      setError('Server unreachable')
    }

    setLoading(false)
  }

  function toggleMode() {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className={`login-page ${mode}`}>
      <div className="login-card">

        <button className="bulb-btn" ref={bulbRef} onClick={toggleMode}>
          💡
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
          <div className="oauth-btn">Google</div>
          <div className="oauth-btn">Apple</div>
        </div>

        <p className="login-footer">
          no account?{' '}
          <a href="/signup" ref={signupRef} style={{ color: accentColor }}>
            sign up
          </a>
        </p>

      </div>
    </div>
  )
}