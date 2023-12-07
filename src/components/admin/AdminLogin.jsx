import React, { useState } from 'react';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add your login logic here
    // Check the username and password and redirect to the admin dashboard
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cake-theme bg-cover">
      <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-center text-cake-orange mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-cake-orange font-bold mb-2" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-cake-orange font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-cake-orange text-white py-2 px-4 rounded hover:bg-cake-orange-dark"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
