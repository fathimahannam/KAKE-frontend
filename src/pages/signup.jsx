import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast'
import { BACKEND_BASE_URL } from '../utils/config'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { getLocal } from  '../actions/auth'
import jwtDecode from 'jwt-decode';
import img from '../assets/h2.jpg'

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate()
  
  const data = {
    email,
    name,
    password,
  };

  const [isLoading, setIsLoader] = useState(false)

  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (!decoded.is_admin === true) {
        navigate('/userhome')
      } else {
        navigate('/')
      }
    }
  }, []);

  const signupSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(BACKEND_BASE_URL + '/api/signup/', data); // Added the missing backtick at the end of the URL

          if (response.status === 200) {
            toast.success(
              'Registration successful! Check your email to activate your account',
              { duration: 4000 }
            );
          } else {
            toast.error('Something went wrong');
            console.error('Error response:', error.response);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        toast.error('Password mismatch');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen" 
    // style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full"style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h2 className="text-4xl font-bold text-center mb-6" >Sign Up</h2>
        <form onSubmit={signupSubmit}>
          <div className="mb-4">
            <input
              className=" bg-transparent border border-white rounded px-4 py-3 w-full placeholder-white text-lg"
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className=" bg-transparent border border-white rounded px-4 py-3 w-full placeholder-white text-lg"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className=" bg-transparent border border-white rounded px-4 py-3 w-full placeholder-white text-lg"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              className=" bg-transparent border border-white rounded px-4 py-3 w-full placeholder-white text-lg"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
             className="bg-red-800 hover:bg-white text-white text-lg hover:text-black p-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-md w-full"

            type="submit"
          >
            Create Account
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-red-800 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
