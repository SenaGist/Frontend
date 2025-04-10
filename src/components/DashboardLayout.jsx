import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar (ahora vertical en móvil) */}
      <aside className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <Sidebar onItemClick={() => setSidebarOpen(false)} />
      </aside>

      <div className={`main-content`}>
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
