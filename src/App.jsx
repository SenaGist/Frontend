import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Home from './pages/Home'
import Usuarios from './pages/Usuarios'
import Equipos from './pages/Equipos'
import DashboardLayout from './components/DashboardLayout'

function ProtectedRoute() {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function PublicRoute() {
  const { token } = useAuth();
  return token ? <Navigate to="/home" replace /> : <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/equipos" element={<Equipos />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
