import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Users from './pages/admin/Users.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import { useAuth } from './context/useAuth.js'
import { AuthProvider } from './context/AuthProvider.jsx'
import Maintenances from './pages/maintenance/Maintenances.jsx'
import AdminMaintenances from './pages/admin/AdminMaintenances.jsx'
import { Assets } from './pages/admin/Assets.jsx'
import { AlertProvider } from './context/AlertProvider.jsx'


function ProtectedRoute() {
  const { token } = useAuth();  
  return token ? <Outlet /> : <Navigate to="/login" replace />;

}
function RedirectedByRole() {
  const {role} = useAuth();
  if (role == "admin") {
    return <Navigate to="/admin/usuarios" replace />;
  } else if (role == "tech") {
    return <Navigate to="/mantenimientos" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
}
function PublicRoute() {
  const { token } = useAuth();
  return token ? <Navigate to="/home" replace /> : <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Router>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/admin/usuarios" element={<Users />} />
                <Route path="/mantenimientos" element={<Maintenances />} />
                <Route path='/admin/mantenimientos' element={<AdminMaintenances />} />
                <Route path='/admin/equipamentos' element={<Assets />} />
                <Route path="*" element={<RedirectedByRole/>} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AlertProvider>
    </AuthProvider>
  )
}

export default App;
