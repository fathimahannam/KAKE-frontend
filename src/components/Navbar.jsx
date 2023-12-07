import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {  faComment } from '@fortawesome/free-solid-svg-icons';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const navigate = useNavigate();



  useEffect(() => {
    const token = getLocal('authToken');
    if (token) {

      const decoded = jwtDecode(token);
      // Check if the token is not expired or invalid here if needed
      setIsLoggedIn(true); // Set isLoggedIn to true if the user has a valid token
    } else {
      setIsLoggedIn(false); // Set isLoggedIn to false if there's no valid token
    }
  }, []);
  const handleLogout=(e)=>{
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    // setTimeout(()=>{
      navigate('/login')
    // })
  }  

  return (
    <div className='w-full h-20 flex justify-between items-center px-8 text-black ml-6'>
      <h1 className='text-2xl font-bold text-black'>K A K E.</h1>
      <ul className='flex items-center'>
      <button
          onClick={() => {
            navigate('/wishlist')
          }}
          className=" bg-transparent text-rose-400 font-semibold hover:text-rose-600 py-2 px-4 rounded-md"
        >
          <FontAwesomeIcon icon={faHeart}  className="fa-2x"/>
        </button>
        <button
          onClick={() => {
            navigate('/chat')
          }}
          className=" bg-transparent text-black font-semibold hover:text-gray-500 py-2 px-4 rounded-md"
        >
          <FontAwesomeIcon icon={ faComment}  className="fa-2x"/>
        </button>
        <li className='mr-10 bg-black text-white hover:bg-white hover:text-black font-bold py-2 px-4 rounded-md shadow-lg transition duration-300 ease-in-out'>
          {isLoggedIn ? (
             <button  onClick={handleLogout}>LOGOUT</button>
          ) : (
            <Link to="/login">LOGIN</Link>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
