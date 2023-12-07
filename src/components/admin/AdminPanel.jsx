import React, { useState } from 'react';

import { Link } from 'react-router-dom';

function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white-100 flex">
      {/* Sidebar */}
      <aside
       style={{backgroundImage: 'url("https://i.pinimg.com/564x/f1/d1/56/f1d15638d334c8566ee1cf982994a27e.jpg")'}} className={`bg-slate-950 text-white  p-6 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transform transition-transform duration-300 md:translate-x-0 md:block`}
      >
        <h1 className="text-2xl font-semibold text-black mb-4">Admin Panel</h1>
        <nav className="space-y-4">
          <Link
            to="/admin/dashboard"
            className="block hover:bg-white text-black px-4 py-2 rounded transition duration-300"
          >
            DB
          </Link>
          <Link
            to="/admin/users"
            className="block  hover:bg-white text-black px-4 py-2 rounded transition duration-300"
          >
            Users
          </Link>
          <Link
            to="/admin/bakers-request"
            className="block hover:bg-white text-black px-4 py-2 rounded transition duration-300"
          >
            Bakers request
          </Link>
          <Link
            to="/admin/bakers"
            className="block hover:bg-white text-black px-4 py-2 rounded transition duration-300"
          >
            Bakers 
          </Link>

        </nav>
      </aside>

      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden absolute top-4 left-4 text-red-500"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      {/* Main Content */}

    </div>
  );
}

export default AdminPanel;


