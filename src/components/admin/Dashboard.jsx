import React, { useState } from 'react';
import AdminPanel from './AdminPanel';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Toggle Sidebar Button */}
      <button onClick={toggleSidebar} className="md:hidden">
        Toggle Sidebar
      </button>

      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        {/* Left Column: AdminPanel */}
        <AdminPanel />
      </div>

      {/* Right Column: Dashboard */}
      <div className="flex-1 p-4">
      <div className="bg-cover bg-center w-full h-full absolute z-0" style={{ backgroundImage: "url('https://64.media.tumblr.com/c4dfaa40ebc2def7df57d6b80cc37948/tumblr_peeip0iNXh1tdnbbbo1_540.gif')" }}>
        {/* Text overlay */}
        <div className="relative z-10 p-8">
          <h1 className="text-4xl font-bold text-amber-900">Welcome to the admin portal</h1>
          <p className="text-lg mt-4 text-amber-900">where we empower you to manage our delicious offerings with ease and precision.</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
