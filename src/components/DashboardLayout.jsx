import React from 'react';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import './DashboardLayout.css';
import { SidebarProvider } from '../context/SidebarProvider.jsx';
import { useSidebar } from '../context/useSidebar.js';

const DashboardContent = ({children}) => {
  const { sidebarOpen } = useSidebar();
  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <Sidebar />
      </aside>

      <div className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
        <Topbar />
        <div className="content-wrapper">{children}</div>
      </div>
    </div>
  )
}

const DashboardLayout = () => (
  <SidebarProvider>
    <DashboardContent></DashboardContent>
  </SidebarProvider>
)

export default DashboardLayout;
