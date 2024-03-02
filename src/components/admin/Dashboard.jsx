import React, { useState } from 'react';
import AdminPanel from './AdminPanel';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row  bg-amber-900">
      {/* Toggle Sidebar Button */}
      <button onClick={toggleSidebar} className="md:hidden">
        Toggle Sidebar
      </button>

      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        {/* Left Column: AdminPanel */}
        <AdminPanel />
      </div>

      {/* Right Column: Dashboard */}

    </div>
  );
}

export default Dashboard;
