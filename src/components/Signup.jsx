import React, { useState } from 'react';
import imgg from '../assets/signup_img.jpg';
import { useNavigate } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../utils/config';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Loader from '../components/user/Loader'

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const data = {
    name,
    email,
    password,
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        setIsLoading(true); // Set loading to true when the signup process starts

        const response = await axios.post(BACKEND_BASE_URL + '/api/signup/', data);

        if (response.status === 200) {
          toast.success('Registration successful! Check your email to activate your account', { duration: 4000 });
        } else {
          toast.error('Something went wrong');
        }
      } else {
        toast.error('Password mismatch');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    } finally {
      setIsLoading(false); // Set loading back to false when the signup process is finished
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-screen flex">
          <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]">
            <div className="w-full h-[550px] hidden md:block">
              <img className="w-full h-full" src={imgg} alt="login" />
            </div>
  
            <div className="p-4 flex flex-col justify-around " style={{ marginTop: '-10px' }}>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center ">
                Create Your Account
              </h1>
              <form onSubmit={signupSubmit}>
                <div className="mb-4">
                  <input
                    className="border border-gray-300 rounded px-4 py-3 w-full placeholder-gray-400 text-lg"
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                {/* Rest of your form */}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  style={{ backgroundColor: '#b79556', hover: { backgroundColor: '#e4e1d1' } }}
                >
                  {isLoading ? <Loader /> : 'Sign in'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
      }

export default Register;
