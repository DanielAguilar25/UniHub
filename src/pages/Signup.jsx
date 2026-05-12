import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Signup.css'

const COURSES = [
  // CSCI - Computer Science
  { code: 'CSCI 1101', name: 'Introduction to Computer Science' },
  { code: 'CSCI 1380', name: 'Introduction to Programming in Python' },
  { code: 'CSCI 1381', name: 'Introduction to Programming C++' },
  { code: 'CSCI 1390', name: 'Introduction to Programming II' },
  { code: 'CSCI 1470', name: 'Computer Science I' },
  { code: 'CSCI 2310', name: 'Applied AI: Data-Driven Models and Validation' },
  { code: 'CSCI 2311', name: 'Applied AI: Workflows and Process Automation' },
  { code: 'CSCI 2333', name: 'Computer Organization and Assembly Language' },
  { code: 'CSCI 2344', name: 'Programming in Unix/Linux Environment' },
  { code: 'CSCI 2380', name: 'Computer Science II' },
  { code: 'CSCI 3310', name: 'Mathematical Foundations of Computer Science' },
  { code: 'CSCI 3320', name: 'AI Programming with Python' },
  { code: 'CSCI 3326', name: 'Object Oriented Programming in Java' },
  { code: 'CSCI 3328', name: 'Object-Oriented Programming in C#' },
  { code: 'CSCI 3329', name: 'Object Oriented Programming in Python' },
  { code: 'CSCI 3330', name: 'App Development' },
  { code: 'CSCI 3333', name: 'Algorithms and Data Structures' },
  { code: 'CSCI 3334', name: 'Systems Programming' },
  { code: 'CSCI 3336', name: 'Organization of Programming Languages' },
  { code: 'CSCI 3340', name: 'Software Engineering I' },
  { code: 'CSCI 3341', name: 'Software Engineering II' },
  { code: 'CSCI 3342', name: 'Web Development' },
  { code: 'CSCI 3343', name: 'Introduction to Data Science' },
  { code: 'CSCI 3347', name: 'AI Agent Engineering' },
  { code: 'CSCI 3351', name: 'Topics in Computer Science' },
  { code: 'CSCI 3362', name: 'Foundations of Intelligent Security Systems' },
  { code: 'CSCI 3370', name: 'Introduction to Game Development' },
  { code: 'CSCI 3371', name: 'Autonomous Mobile Robots and Programming' },
  { code: 'CSCI 3372', name: 'UX/UI Design' },
  { code: 'CSCI 4301', name: 'Digital Image Processing' },
  { code: 'CSCI 4321', name: 'Games & Computation' },
  { code: 'CSCI 4325', name: 'Automata, Formal Languages, and Computability' },
  { code: 'CSCI 4333', name: 'Database Design and Implementation' },
  { code: 'CSCI 4334', name: 'Operating Systems' },
  { code: 'CSCI 4335', name: 'Computer Architecture' },
  { code: 'CSCI 4343', name: 'Data Mining' },
  { code: 'CSCI 4345', name: 'Computer Networks' },
  { code: 'CSCI 4353', name: 'Introduction to Deep Learning' },
  { code: 'CSCI 4364', name: 'Deep Learning Algorithms for Medical Imaging' },
  { code: 'CSCI 4390', name: 'Senior Project' },
  // EECE - Electrical and Computer Engineering
  { code: 'EECE 1101', name: 'Introduction to Electrical and Computer Engineering' },
  { code: 'EECE 2105', name: 'Electric Circuits Lab I' },
  { code: 'EECE 2106', name: 'Digital Systems Engineering Lab I' },
  { code: 'EECE 2146', name: 'Practicum of Mathematics for ECE' },
  { code: 'EECE 2305', name: 'Electric Circuits I' },
  { code: 'EECE 2306', name: 'Digital Systems Engineering I' },
  { code: 'EECE 2317', name: 'Electrical and Electronics Systems' },
  { code: 'EECE 2319', name: 'Numerical Computation and Data Visualization' },
  { code: 'EECE 3301', name: 'Electronics I' },
  { code: 'EECE 3302', name: 'Electronics II' },
  { code: 'EECE 3315', name: 'Electromagnetics Engineering' },
  { code: 'EECE 3321', name: 'Signals and Systems' },
  { code: 'EECE 3331', name: 'Microcontroller and Embedded Systems Lab' },
  { code: 'EECE 3340', name: 'Probability and Statistics for ECE' },
  { code: 'EECE 3370', name: 'Power Electronics' },
  { code: 'EECE 3371', name: 'Electrical Power Systems' },
  { code: 'EECE 3435', name: 'Microprocessor Systems' },
  { code: 'EECE 4303', name: 'Digital Systems Engineering II' },
  { code: 'EECE 4321', name: 'Automatic Control' },
  { code: 'EECE 4325', name: 'Introduction to Robotics' },
  { code: 'EECE 4361', name: 'Senior Design I' },
  { code: 'EECE 4362', name: 'Senior Design II' },
  { code: 'EECE 4365', name: 'Digital Signal Processing' },
  { code: 'EECE 4372', name: 'Electric Machinery & Power Systems' },
  { code: 'EECE 4373', name: 'Renewable Energy' },
  { code: 'EECE 4380', name: 'Computer Architecture' },
  { code: 'EECE 4390', name: 'Communications Networks' },
  // MECE - Mechanical Engineering
  { code: 'MECE 1101', name: 'Introduction to Mechanical Engineering' },
  { code: 'MECE 2301', name: 'Statics' },
  { code: 'MECE 2302', name: 'Dynamics' },
  { code: 'MECE 2340', name: 'Engineering Materials' },
  { code: 'MECE 3304', name: 'System Dynamics' },
  { code: 'MECE 3315', name: 'Fluid Mechanics' },
  { code: 'MECE 3320', name: 'Measurements and Instrumentation' },
  { code: 'MECE 3321', name: 'Mechanics of Solids' },
  { code: 'MECE 3335', name: 'Thermodynamics I' },
  { code: 'MECE 3336', name: 'Thermodynamics II' },
  { code: 'MECE 3360', name: 'Heat Transfer' },
  { code: 'MECE 3380', name: 'Kinematics and Dynamics of Machines' },
  { code: 'MECE 3385', name: 'Mechanical Vibrations' },
  { code: 'MECE 3390', name: 'Renewable Energy' },
  { code: 'MECE 4304', name: 'Automatic Control Systems' },
  { code: 'MECE 4320', name: 'Introduction to Mechatronics' },
  { code: 'MECE 4322', name: 'Introduction to Finite Elements' },
  { code: 'MECE 4350', name: 'Machine Elements' },
  { code: 'MECE 4361', name: 'Senior Design Project I' },
  { code: 'MECE 4362', name: 'Senior Design Project II' },
  // INFS - Information Systems
  { code: 'INFS 2300', name: 'Data Modeling Management Tools' },
  { code: 'INFS 3308', name: 'Business Information Infrastructure' },
  { code: 'INFS 3310', name: 'Introduction to Business Programming' },
  { code: 'INFS 3320', name: 'Organizational Information Assurance' },
  { code: 'INFS 3325', name: 'Introduction to Python for Business Analytics' },
  { code: 'INFS 3333', name: 'Advanced Spreadsheet Modeling' },
  { code: 'INFS 3335', name: 'Database Management' },
  { code: 'INFS 3336', name: 'Systems Analysis' },
  { code: 'INFS 3338', name: 'Computer Networks and the Internet' },
  { code: 'INFS 3375', name: 'Data Visualization' },
  { code: 'INFS 3385', name: 'Data Wrangling and Warehousing' },
  { code: 'INFS 3390', name: 'Management Information Systems' },
  { code: 'INFS 4308', name: 'Project Management' },
  { code: 'INFS 4330', name: 'Data Mining and Machine Learning' },
  { code: 'INFS 4391', name: 'Information Security' },
  // MATH - Mathematics
  { code: 'MATH 1314', name: 'College Algebra' },
  { code: 'MATH 1342', name: 'Elementary Statistical Methods' },
  { code: 'MATH 2318', name: 'Linear Algebra' },
  { code: 'MATH 2346', name: 'Mathematics for Electrical and Computer Engineers' },
  { code: 'MATH 2412', name: 'Precalculus' },
  { code: 'MATH 2413', name: 'Calculus I' },
  { code: 'MATH 2414', name: 'Calculus II' },
  { code: 'MATH 2415', name: 'Calculus III' },
  { code: 'MATH 3341', name: 'Differential Equations' },
  { code: 'MATH 3345', name: 'Linear Optimization' },
  { code: 'MATH 3347', name: 'Elementary Cryptology' },
  { code: 'MATH 3349', name: 'Numerical Methods' },
  { code: 'MATH 3361', name: 'Applied Discrete Mathematics' },
  { code: 'MATH 3363', name: 'Modern Algebra I' },
  { code: 'MATH 3372', name: 'Real Analysis I' },
  // PHYS - Physics
  { code: 'PHYS 1401', name: 'General Physics I' },
  { code: 'PHYS 1402', name: 'General Physics II' },
  { code: 'PHYS 2426', name: 'Physics for Scientists and Engineers II' },
  { code: 'PHYS 2327', name: 'Physics for Scientists and Engineers III' },
  { code: 'PHYS 3303', name: 'Thermodynamics' },
  { code: 'PHYS 3305', name: 'Classical Mechanics' },
  { code: 'PHYS 3402', name: 'Modern Physics' },
  // STAT - Statistics
  { code: 'STAT 2334', name: 'Applied Statistics for Health' },
  { code: 'STAT 2336', name: 'Statistical Computing and Data Management' },
  { code: 'STAT 3301', name: 'Applied Statistics' },
  { code: 'STAT 3335', name: 'Applied Regression Analysis' },
  { code: 'STAT 3337', name: 'Probability and Statistics' },
  { code: 'STAT 3338', name: 'Mathematical Statistics' },
  // CIVE - Civil Engineering
  { code: 'CIVE 1101', name: 'Introduction to Civil Engineering' },
  { code: 'CIVE 3315', name: 'Fluid Mechanics and Hydraulics' },
  { code: 'CIVE 3321', name: 'Mechanics of Materials' },
  { code: 'CIVE 3324', name: 'Structural Analysis I' },
  { code: 'CIVE 3331', name: 'Environmental Engineering' },
  { code: 'CIVE 3345', name: 'Transportation Engineering' },
  { code: 'CIVE 4346', name: 'Reinforced Concrete Design' },
  { code: 'CIVE 4360', name: 'Civil Engineering Design Practice' },
  { code: 'CIVE 4392', name: 'Civil Engineering Senior Project' },
  // CYBI - Cyberspace & Informatics
  { code: 'CYBI 1101', name: 'Introduction to Cyberspace & Informatics' },
  { code: 'CYBI 2322', name: 'Foundations of Systems I' },
  { code: 'CYBI 2324', name: 'Foundations of Systems II' },
  { code: 'CYBI 2326', name: 'Programming of Cyber Systems & Reverse Engineering' },
  { code: 'CYBI 3318', name: 'Cryptography' },
  { code: 'CYBI 3331', name: 'Software Engineering and Project Management' },
  { code: 'CYBI 3335', name: 'Data Communications and Networking' },
  { code: 'CYBI 3343', name: 'Intrusion Detection and Incident Response' },
  { code: 'CYBI 3345', name: 'Operating Systems and Security' },
  { code: 'CYBI 4318', name: 'Cyber Security' },
  { code: 'CYBI 4319', name: 'Digital Forensics' },
  { code: 'CYBI 4326', name: 'Secure Software Development' },
  { code: 'CYBI 4330', name: 'Malware Hacking' },
  { code: 'CYBI 4332', name: 'Blockchain' },
  { code: 'CYBI 4340', name: 'Capstone Project' },
  // MANE - Manufacturing Engineering
  { code: 'MANE 1101', name: 'Introduction to Manufacturing Engineering' },
  { code: 'MANE 3300', name: 'Computer-Aided Design' },
  { code: 'MANE 3302', name: 'Computer-Aided Manufacturing' },
  { code: 'MANE 3332', name: 'Engineering Statistics' },
  { code: 'MANE 3340', name: 'Fundamentals of Industrial Engineering' },
  { code: 'MANE 3364', name: 'Manufacturing Processes' },
  { code: 'MANE 4311', name: 'Quality Control' },
  { code: 'MANE 4322', name: 'Robotics and Industry Autonomy' },
  { code: 'MANE 4340', name: 'Operations Research' },
  { code: 'MANE 4361', name: 'Senior Design I' },
  { code: 'MANE 4362', name: 'Senior Design II' },
  // General Education
  { code: 'ENGL 1301', name: 'Composition I' },
  { code: 'ENGL 1302', name: 'Composition II' },
  { code: 'ENGL 3342', name: 'Technical Communication' },
  { code: 'COMM 1315', name: 'Public Speaking' },
  { code: 'PHIL 2326', name: 'Ethics, Technology and Society' },
  { code: 'POLS 2305', name: 'U.S. Federal Government and Politics' },
  { code: 'POLS 2306', name: 'Texas Government and Politics' },
  { code: 'HIST 1301', name: 'U.S. History I' },
  { code: 'HIST 1302', name: 'U.S. History II' },
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
        <option value="CV">Civil Engineering</option>
        <option value="MF">Manufacturing Engineering</option>
        <option value="CY">Cyberspace & Informatics</option>
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