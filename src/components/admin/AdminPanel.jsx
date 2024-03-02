import React, { useState } from 'react';

import { Link,useNavigate } from 'react-router-dom';


function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleLogout=(e)=>{
    localStorage.removeItem('authToken')
 
    // setTimeout(()=>{
      navigate('/login')
    // })
  } 
  return (
    <div>
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
          <button onClick={handleLogout} className="block bg-white hover:bg-black text-black hover:text-white px-4 py-2 rounded transition duration-300">
            Logout
          </button>

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
      <div className="flex-1 ">
      <div className="bg-cover bg-center w-full h-full absolute z-0" style={{ backgroundImage: "url('https://64.media.tumblr.com/c4dfaa40ebc2def7df57d6b80cc37948/tumblr_peeip0iNXh1tdnbbbo1_540.gif')" }}>
        {/* Text overlay */}
        <div className="relative z-10 p-8">
          <h1 className="text-4xl font-bold text-amber-900">Welcome to the admin portal</h1>
          <p className="text-lg mt-4 text-amber-900">where we empower you to manage our delicious offerings with ease and precision.</p>
        </div>
      </div>
    </div>

    </div>
    
  
    </div>
  );
}

export default AdminPanel;


