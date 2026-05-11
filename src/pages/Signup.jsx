import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Signup.css'

const COURSES = [
  { code: 'CSCI 1101', name: 'Introduction to Computer Science' },
  { code: 'CSCI 1470', name: 'Computer Science I' },
  { code: 'CSCI 2380', name: 'Computer Science II' },
  { code: 'CSCI 2344', name: 'Programming in Unix/Linux Environment' },
  { code: 'CSCI 2333', name: 'Computer Organization and Assembly Language' },
  { code: 'CSCI 3310', name: 'Mathematical Foundations of Computer Science' },
  { code: 'CSCI 3326', name: 'Object Oriented Programming in Java' },
  { code: 'CSCI 3328', name: 'Object Oriented Programming in C#' },
  { code: 'CSCI 3329', name: 'Object Oriented Programming in Python' },
  { code: 'CSCI 3333', name: 'Algorithms and Data Structures' },
  { code: 'CSCI 3336', name: 'Organization of Programming Languages' },
  { code: 'CSCI 3340', name: 'Software Engineering I' },
  { code: 'CSCI 4325', name: 'Automata, Formal Languages, and Computability' },
  { code: 'CSCI 4333', name: 'Database Design and Implementation' },
  { code: 'CSCI 4334', name: 'Operating Systems' },
  { code: 'CSCI 4335', name: 'Computer Architecture' },
  { code: 'CSCI 4345', name: 'Computer Networks' },
  { code: 'CSCI 4390', name: 'Senior Project' },
  { code: 'MATH 2413', name: 'Calculus I' },
  { code: 'MATH 2414', name: 'Calculus II' },
  { code: 'MATH 2318', name: 'Linear Algebra' },
  { code: 'EECE 2306', name: 'Digital Systems Engineering I' },
  { code: 'EECE 2106', name: 'Digital Systems Engineering I Lab' },
  { code: 'EECE 3340', name: 'Statistics for Engineers' },
  { code: 'ENGL 1301', name: 'Composition I' },
  { code: 'ENGL 1302', name: 'Composition II' },
  { code: 'ENGL 3342', name: 'Technical Communication' },
  { code: 'COMM 1315', name: 'Public Speaking' },
  { code: 'PHIL 2326', name: 'Ethics, Technology and Society' },
  { code: 'POLS 2305', name: 'U.S. Federal Government and Politics' },
  { code: 'POLS 2306', name: 'Texas Government and Politics' },
  { code: 'HIST 1301', name: 'U.S. History I' },
  { code: 'HIST 1302', name: 'U.S. History II' },
  { code: 'STAT 3337', name: 'Probability and Statistics' },
  { code: 'STAT 3301', name: 'Statistical Methods' },
]

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [preferredName, setPreferredName] = useState('')
  const [major, setMajor] = useState('CS')
  const [gradYear, setGradYear] = useState(2026)
  const [classes, setClasses] = useState(['CSCI 3333'])
  const [classInput, setClassInput] = useState('')
  const [dropdown, setDropdown] = useState([])
  const [errors, setErrors] = useState({})
  const [mode, setMode] = useState('dark')
  const [serverStatus, setServerStatus] = useState(null)
  const bulbRef = useRef(null)
  const navigate = useNavigate()

  function toggleMode() {
    setMode(prev => prev === 'dark' ? 'light' : 'dark')
  }

  function filterCourses(val) {
    setClassInput(val)
    if (!val) { setDropdown([]); return }
    const matches = COURSES.filter(c =>
      c.code.toLowerCase().includes(val.toLowerCase()) ||
      c.name.toLowerCase().includes(val.toLowerCase())
    ).slice(0, 6)
    setDropdown(matches)
  }

  function addClass(code) {
    if (!classes.includes(code)) {
      setClasses(prev => [...prev, code])
    }
    setClassInput('')
    setDropdown([])
  }

  function removeClass(code) {
    setClasses(prev => prev.filter(c => c !== code))
  }

  function validate() {
    const e = {}
    if (!email.endsWith('@utrgv.edu')) {
      e.email = 'must use a @utrgv.edu email'
    }
    if (password.length < 8) {
      e.password = 'password must be at least 8 characters'
    }
    if (username.length < 3 || username.length > 20) {
      e.username = 'username must be between 3 and 20 characters'
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      e.username = 'username can only contain letters and numbers'
    }
    return e
  }

  async function handleSignup() {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    setErrors({})

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/accounts/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
          username,
          preferred_name: preferredName,
          major,
          graduation_year: gradYear,
          current_classes: classes.join(', '),
        }),
      })

      const data = await response.json()
      if (response.ok) {
        navigate('/login')
      } else {
        setErrors({ server: data.error })
        setServerStatus(response.status)
      }
    } catch (err) {
      setErrors({ server: 'something went wrong, please try again' })
    }
  }

  return (
    <div className={`signup-page ${mode}`}>

      <div className="signup-branding">
        <div className="signup-logo-row">
          <svg width="56" height="56" viewBox="0 0 80 80" fill="none">
            <rect width="80" height="80" rx="10" fill="#B7C684"/>
            <rect x="12" y="12" width="22" height="22" rx="2" fill="#F8B56D"/>
            <rect x="46" y="12" width="22" height="22" rx="2" fill="#F8B56D"/>
            <path d="M11 63 Q11 46 23 46 Q35 46 35 63 L35 69 L11 69 Z" fill="#F8B56D"/>
            <path d="M45 63 Q45 46 57 46 Q69 46 69 63 L69 69 L45 69 Z" fill="#F8B56D"/>
          </svg>
          <p className="signup-brand-name">UniHub</p>
        </div>

        <div className="signup-divider-h" />

        <div className="signup-about">
          <div className="signup-about-item">
            <span className="signup-about-label">what it is</span>
            <p className="signup-about-text">UniHub is a campus platform built exclusively for UTRGV CECS students. one place for everything that matters on campus.</p>
          </div>
          <div className="signup-about-item">
            <span className="signup-about-label">why we built it</span>
            <p className="signup-about-text">we were tired of missing events, losing study partners, and not knowing what clubs existed. so we built the thing we wished we had.</p>
          </div>
          <div className="signup-about-item">
            <span className="signup-about-label">what to expect</span>
            <p className="signup-about-text">a personalized feed based on your major and classes, campus events, club announcements, and study group connections.</p>
          </div>
        </div>
      </div>

      <div className="signup-form-side">
        <button className="signup-bulb-btn" onClick={toggleMode}>
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

        <h1>create your account</h1>
        <p className="signup-subtitle">UTRGV CECS students only</p>

        <label>utrgv email</label>
        <input
          type="email"
          placeholder="yourname@utrgv.edu"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors.email && <p className="signup-field-error">{errors.email}</p>}

        <label>password</label>
        <input
          type="password"
          placeholder="create a password (min 8 characters)"
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errors.password && <p className="signup-field-error">{errors.password}</p>}

        <label>username</label>
        <input
          type="text"
          placeholder="letters and numbers only, 3-20 characters"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        {errors.username && <p className="signup-field-error">{errors.username}</p>}

        <label>preferred name</label>
        <input
          type="text"
          placeholder="what should we call you?"
          value={preferredName}
          onChange={e => setPreferredName(e.target.value)}
        />

        <label>major</label>
        <select value={major} onChange={e => setMajor(e.target.value)}>
          <option value="CS">Computer Science</option>
          <option value="CE">Computer Engineering</option>
          <option value="EE">Electrical Engineering</option>
          <option value="ME">Mechanical Engineering</option>
          <option value="CI">Computer Information Systems</option>
        </select>

        <label>graduation year</label>
        <select value={gradYear} onChange={e => setGradYear(parseInt(e.target.value))}>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
          <option value="2031">2031</option>
        </select>

        <label>current classes</label>
        <div className="signup-tags-wrap">
          <div
            className="signup-tags"
            onClick={() => document.getElementById('class-input').focus()}
          >
            {classes.map(c => (
              <div key={c} className="signup-tag">
                {c}
                <span className="signup-tag-x" onClick={() => removeClass(c)}>x</span>
              </div>
            ))}
            <input
              id="class-input"
              className="signup-tag-input"
              placeholder="type to search courses..."
              value={classInput}
              onChange={e => filterCourses(e.target.value)}
              onBlur={() => setTimeout(() => setDropdown([]), 200)}
            />
          </div>
          {dropdown.length > 0 && (
            <div className="signup-dropdown">
              {dropdown.map(c => (
                <div
                  key={c.code}
                  className="signup-option"
                  onMouseDown={() => addClass(c.code)}
                >
                  {c.code} <span>{c.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="signup-hint">used to build your for you feed</p>

        {errors.server && (
          <p className="signup-field-error">
            {errors.server}{' '}
            {serverStatus && (
              <a href={`https://http.cat/status/${serverStatus}`} target="_blank" rel="noreferrer">
                learn more
              </a>
            )}
          </p>
        )}

        <button className="signup-btn" onClick={handleSignup}>create account</button>

        <p className="signup-footer">
          already have an account? <a href="/login">log in</a>
        </p>
      </div>
    </div>
  )
}