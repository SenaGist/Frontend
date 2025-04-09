import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Usuarios from './pages/Usuarios'
import Equipos from './pages/Equipos'
import DashboardLayout from './components/DashboardLayout'

function AppRoutes() {
  const location = useLocation()
  const isLogin = location.pathname === "/login"

  return isLogin ? (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  ) : (
    <DashboardLayout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/equipos" element={<Equipos />} />
      </Routes>
    </DashboardLayout>
  )
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
