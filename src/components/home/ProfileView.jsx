import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MAJOR_CHOICES = [
  { value: 'CS', label: 'Computer Science' },
  { value: 'CE', label: 'Computer Engineering' },
  { value: 'EE', label: 'Electrical Engineering' },
  { value: 'ME', label: 'Mechanical Engineering' },
  { value: 'CI', label: 'Computer Information Systems' },
]

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

export default function ProfileView({ profile, onProfileUpdate }) {
  const [linkedinUrl, setLinkedinUrl] = useState(profile?.linkedin_url || '')
  const [preferredName, setPreferredName] = useState(profile?.preferred_name || '')
  const [major, setMajor] = useState(profile?.major || 'CS')
  const [gradYear, setGradYear] = useState(profile?.graduation_year || 2026)
  const [classes, setClasses] = useState(
    profile?.current_classes ? profile.current_classes.split(', ').filter(Boolean) : []
  )
  const [classInput, setClassInput] = useState('')
  const [dropdown, setDropdown] = useState([])
  const [status, setStatus] = useState('')

  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [resetStatus, setResetStatus] = useState('')

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteStatus, setDeleteStatus] = useState('')

  const navigate = useNavigate()

  function filterCourses(val) {
    setClassInput(val)
    if (!val) { setDropdown([]); return }
    const matches = COURSES.filter(c =>
      (c.code.toLowerCase().includes(val.toLowerCase()) ||
      c.name.toLowerCase().includes(val.toLowerCase())) &&
      !classes.includes(c.code)
    ).slice(0, 6)
    setDropdown(matches)
  }

  function addClass(code) {
    if (!classes.includes(code)) setClasses(prev => [...prev, code])
    setClassInput('')
    setDropdown([])
  }

  function removeClass(code) {
    setClasses(prev => prev.filter(c => c !== code))
  }

  async function handleSave() {
    setStatus('saving...')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/accounts/profile/update/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            linkedin_url: linkedinUrl,
            preferred_name: preferredName,
            major,
            graduation_year: parseInt(gradYear),
            current_classes: classes.join(', '),
          }),
      })
      if (res.ok) {
        setStatus('saved!')
        onProfileUpdate({ preferred_name: preferredName, major, graduation_year: gradYear, current_classes: classes.join(', ') })
        setTimeout(() => setStatus(''), 2000)
      } else {
        setStatus('something went wrong')
      }
    } catch {
      setStatus('server unreachable')
    }
  }

  async function handleResetPassword() {
    setResetStatus('sending...')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/accounts/password/reset/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      if (res.ok) {
        setResetStatus('new password sent to your email!')
        setTimeout(() => setShowResetConfirm(false), 3000)
      } else {
        setResetStatus('something went wrong')
      }
    } catch {
      setResetStatus('server unreachable')
    }
  }

  async function handleDelete() {
    setDeleteStatus('deleting...')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/accounts/account/delete/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password: deletePassword }),
      })
      const data = await res.json()
      if (res.ok) {
        navigate('/login')
      } else {
        setDeleteStatus(data.error || 'incorrect password')
      }
    } catch {
      setDeleteStatus('server unreachable')
    }
  }

  return (
            <div style={{ padding: '0 0 60px 40px', maxWidth: '560px' }}>
            <div className="main-header">
                <p className="main-title">my profile</p>
                <p className="main-sub">edit your information</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div>
        <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
            linkedin url
        </label>
        <input
            type="text"
            value={linkedinUrl}
            onChange={e => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/yourname"
            style={{
            width: '100%', boxSizing: 'border-box', background: '#1a1a1a',
            border: '1px solid #0077b5', borderRadius: '8px', padding: '12px',
            color: '#fff', fontSize: '15px',
            }}
        />
        </div>

        <div>
          <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '6px' }}>preferred name</label>
          <input
            type="text"
            value={preferredName}
            onChange={e => setPreferredName(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box', background: '#1a1a1a',
              border: '1px solid #333', borderRadius: '8px', padding: '12px',
              color: '#fff', fontSize: '15px',
            }}
          />
        </div>

        <div>
          <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '6px' }}>major</label>
          <select
            value={major}
            onChange={e => setMajor(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box', background: '#1a1a1a',
              border: '1px solid #333', borderRadius: '8px', padding: '12px',
              color: '#fff', fontSize: '15px',
            }}
          >
            {MAJOR_CHOICES.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '6px' }}>graduation year</label>
          <select
            value={gradYear}
            onChange={e => setGradYear(parseInt(e.target.value))}
            style={{
              width: '100%', boxSizing: 'border-box', background: '#1a1a1a',
              border: '1px solid #333', borderRadius: '8px', padding: '12px',
              color: '#fff', fontSize: '15px',
            }}
          >
            {[2026, 2027, 2028, 2029, 2030, 2031].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '6px' }}>current classes</label>
          <div style={{
            background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px',
            padding: '10px', display: 'flex', flexWrap: 'wrap', gap: '6px',
            cursor: 'text', minHeight: '48px',
          }}
            onClick={() => document.getElementById('profile-class-input').focus()}
          >
            {classes.map(c => (
              <span key={c} style={{
                background: '#B7C68430', border: '1px solid #B7C684',
                borderRadius: '12px', padding: '4px 10px',
                color: '#B7C684', fontSize: '13px', cursor: 'pointer',
              }} onClick={() => removeClass(c)}>
                {c} ×
              </span>
            ))}
            <input
              id="profile-class-input"
              value={classInput}
              onChange={e => filterCourses(e.target.value)}
              onBlur={() => setTimeout(() => setDropdown([]), 200)}
              placeholder="type to add..."
              style={{
                background: 'none', border: 'none', outline: 'none',
                color: '#fff', fontSize: '14px', minWidth: '120px',
              }}
            />
          </div>
          {dropdown.length > 0 && (
            <div style={{
              background: '#1e1e1e', border: '1px solid #333', borderRadius: '8px',
              marginTop: '4px', overflow: 'hidden',
            }}>
            {dropdown.map(c => (
            <div
                key={c.code}
                onMouseDown={() => addClass(c.code)}
                style={{
                padding: '10px 14px', color: '#fff', fontSize: '14px',
                cursor: 'pointer', borderBottom: '1px solid #222',
                }}
            >
                {c.code} — {c.name}
            </div>
            ))}         
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          style={{
            background: '#B7C684', border: 'none', borderRadius: '8px',
            padding: '12px', fontWeight: 500, cursor: 'pointer', fontSize: '15px',
          }}
        >
          save changes
        </button>
        {status && <p style={{ color: '#B7C684', margin: 0, fontSize: '14px' }}>{status}</p>}

        <hr style={{ border: 'none', borderTop: '1px solid #222', margin: '8px 0' }} />

        <button
          onClick={() => setShowResetConfirm(true)}
          style={{
            background: '#2a2a2a', border: '1px solid #444', borderRadius: '8px',
            padding: '12px', color: '#aaa', cursor: 'pointer', fontSize: '15px',
          }}
        >
          reset password via email
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          style={{
            background: '#2a2a2a', border: '1px solid #e05c5c', borderRadius: '8px',
            padding: '12px', color: '#e05c5c', cursor: 'pointer', fontSize: '15px',
          }}
        >
          delete my account
        </button>
      </div>

      {showResetConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 999
        }}>
          <div style={{
            background: '#1e1e1e', borderRadius: '12px', padding: '28px',
            width: '380px', display: 'flex', flexDirection: 'column', gap: '16px'
          }}>
            <p style={{ color: '#fff', fontSize: '18px', fontWeight: 500, margin: 0 }}>reset password</p>
            <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
              we'll send a new temporary password to your UTRGV email. you'll be logged out after.
            </p>
            {resetStatus && <p style={{ color: '#B7C684', margin: 0, fontSize: '14px' }}>{resetStatus}</p>}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleResetPassword} style={{
                flex: 1, background: '#B7C684', border: 'none', borderRadius: '8px',
                padding: '12px', fontWeight: 500, cursor: 'pointer',
              }}>send email</button>
              <button onClick={() => setShowResetConfirm(false)} style={{
                flex: 1, background: '#2a2a2a', border: 'none', borderRadius: '8px',
                padding: '12px', color: '#888', cursor: 'pointer',
              }}>cancel</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 999
        }}>
          <div style={{
            background: '#1e1e1e', borderRadius: '12px', padding: '28px',
            width: '380px', display: 'flex', flexDirection: 'column', gap: '16px'
          }}>
            <p style={{ color: '#e05c5c', fontSize: '18px', fontWeight: 500, margin: 0 }}>delete account</p>
            <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
              this will permanently delete your account and all your data. this cannot be undone.
            </p>
            <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>enter your password to confirm:</p>
            <input
              type="password"
              placeholder="your password"
              value={deletePassword}
              onChange={e => setDeletePassword(e.target.value)}
              style={{
                background: '#111', border: '1px solid #e05c5c', borderRadius: '8px',
                padding: '12px', color: '#fff', fontSize: '14px',
              }}
            />
            {deleteStatus && <p style={{ color: '#e05c5c', margin: 0, fontSize: '14px' }}>{deleteStatus}</p>}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleDelete} style={{
                flex: 1, background: '#e05c5c', border: 'none', borderRadius: '8px',
                padding: '12px', fontWeight: 500, cursor: 'pointer', color: '#fff',
              }}>yes, delete everything</button>
              <button onClick={() => setShowDeleteConfirm(false)} style={{
                flex: 1, background: '#2a2a2a', border: 'none', borderRadius: '8px',
                padding: '12px', color: '#888', cursor: 'pointer',
              }}>cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}