import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <Sidebar />
      </aside>

      <div className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="content-wrapper">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
