import React, { useEffect, useState } from 'react';
import img from '../../assets/user.jpg'
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/config';
// import AdminPanel from './AdminPanel';

function UserManagement() {
  const [users, setUsers] = useState([]);

  const toggleBlock = (email) => {
    const updatedUsers = users.map((user) => {
      if (user.email === email) {
        return { ...user, blocked: !user.blocked };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  useEffect(() => {
    axios.get(BACKEND_BASE_URL+'/api/users/') 
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <>
   
    <div className=" p-12 "  style={{ backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/022/778/704/large_2x/birthday-background-with-cake-illustration-ai-generative-free-photo.jpg")`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      
      <h1 className="text-3xl font-semibold mb-8 text-center text-black h-1/3">User Management</h1>

      <ul className="grid grid-cols-1 gap-4" >
        {users.map((user) => (
          <li
            key={user.email}
            className={`bg-white bg-opacity-75 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              user.blocked ? 'opacity-70' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                <p className={`text-gray-600 ${user.blocked ? 'line-through text-red-500' : ''}`}>
                  {user.email}
                </p>
              </div>
              <button
                onClick={() => toggleBlock(user.email)}
                className={`px-4 py-2 ${
                  user.blocked ? 'bg-green-500' : 'bg-red-500'
                } text-white rounded-md hover:bg-red-300 transition-colors`}
              >
                {user.blocked ? 'Unblock' : 'Block'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>

    </>
   
  
  );
}

export default UserManagement;
