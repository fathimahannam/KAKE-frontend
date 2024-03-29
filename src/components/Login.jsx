import React, { useState } from 'react';
import img from '../assets/login.jpg';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import login from '../actions/auth';
import Loader from '../components/user/Loader'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const loginResponse = await login(e);

      console.log(loginResponse, 'login response');

      if (loginResponse) {
        console.log('loginresponse === ' + loginResponse);
        toast.success('Logged in successfully', { duration: 3000 });
        navigate('/home');
      } else {
        toast.error('Invalid credentials', { duration: 1000 });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-gradient-to-br " style={{ backgroundImage: "url('https://i.pinimg.com/736x/12/96/41/129641ca0dc9f0f4fcc9136f658f0845.jpg')" }}>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div
        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white text-center">
            Login
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={loginSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
              <input
                type="password"
                name="password"
                id="password"
                minLength={6}
                placeholder="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Link to="/reset-password" className="text-sm font-medium text-primary-600 hover:underline text-white">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full  text-white  bg-rose-200 hover:bg-opacity-5 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {isLoading ? <Loader /> : 'Login'}
            </button>
            <p className="text-sm font-light pt-24 text-white dark:text-gray-400 text-center">
              Don’t have an account yet? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
