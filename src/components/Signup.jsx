import imgg from '../assets/signup_img.jpg';
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import {BACKEND_BASE_URL} from '../utils/config'
import axios from 'axios'
import {toast,Toaster} from 'react-hot-toast'



function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


const navigate=useNavigate()
  const data = {
    name,
    email,
    password,
  };
  const [isLoading,setIsloader]=useState(false)
  




  const signupSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(BACKEND_BASE_URL+'/api/signup/',data);
          
          
          if (response.status === 200) {
            toast.success(
              'Registration successful! Check your email to activate your account',{ duration: 4000 }
            );
            

          } else {
            toast.error('Something went wrong');
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
    <div className='w-full h-screen flex '>
      <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
        <div className='w-full h-[550px] hidden md:block '>
          <img className='w-full h-full' src={imgg} alt="login" />
        </div>
        
        <div className='p-4 flex flex-col justify-around ' style={{ marginTop: '-10px'}} >
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center ">
                Create Your Account
              </h1>
        <form  onSubmit={signupSubmit}>
        
          <div className="mb-4 ">
            <input
              className="border border-gray-300 rounded px-4 py-3 w-full placeholder-gray-400 text-lg"
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-gray-300 rounded px-4 py-3 w-full placeholder-gray-400 text-lg"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-gray-300 rounded px-4 py-3 w-full placeholder-gray-400 text-lg"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="border border-gray-300 rounded px-4 py-3 w-full placeholder-gray-400 text-lg"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
             
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
  type="submit"
  className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
  style={{ backgroundColor: '#b79556', hover: { backgroundColor: '#e4e1d1' } }}
>
  Sign in
</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;