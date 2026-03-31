import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}