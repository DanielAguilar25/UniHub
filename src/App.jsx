import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import Home from './pages/Home'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}