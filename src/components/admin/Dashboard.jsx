import React, { useState } from 'react';
import AdminPanel from './AdminPanel';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Left Column: AdminPanel */}

        <AdminPanel />
      

      {/* Right Column: Dashboard */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
        <h3>Your dashboard content goes here</h3>
      </div>
    
      </>
  );
}

export default Dashboard;
