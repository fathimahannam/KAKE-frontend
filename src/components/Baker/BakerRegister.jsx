import React, { useState } from 'react';
import axios from 'axios';
import jwtDecode from "jwt-decode";
import { getLocal } from '../../actions/auth'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BACKEND_BASE_URL } from '../../utils/config';

function BakerApplication() {
  const navigate =useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    location:'',
    image: null,
    phoneNumber: '',
    
  });

  const token = getLocal('authToken');
  const decoded = jwtDecode(token); 
  const user =decoded.user_id 
console.log("=====",user);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      formDataToSend.append('user',user)
  
      const response = await axios.post(`${BACKEND_BASE_URL}/api/bakers/baker-application/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },});
        
    
      toast.success('Form submitted successfully', { duration: 3000 });
      navigate('/home')

  
      
      console.log('Response from backend:', response.data);
    } catch (error) {
      
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div style={{ backgroundColor: 'rgba(208, 223, 220, 1)' }}  className=" text-black min-h-screen p-4 md:p-8 " 
    > 
      <div className="container mx-auto max-w-md">
        <button
          className="absolute top-4 left-4 bg-white text-black hover:bg-gray-200 hover:text-black px-3 py-1 rounded-full transition duration-300 ease-in-out"
          onClick={() => window.history.back()}
        >
          Home
        </button>
        <h1 className="text-2xl md:text-4xl font-semibold text-center my-6">Apply to Become a Bakerr</h1>
        <form onSubmit={handleSubmit} className="bg-transperent  rounded-lg p-4 md:p-6 shadow-lg" style={{ backgroundImage: 'url("https://i.pinimg.com/474x/11/2d/ab/112dab8bc6c066224d4cefb266b2cb03.jpg")' }}>
          <div className="mb-4">
            <label className="block text-black-400 text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent border border-gray-600 rounded-lg p-2 md:p-3 w-full focus:outline-none focus:ring focus:border-primary-600 hover:border-primary-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black-400 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border border-gray-600 rounded-lg p-2 md:p-3 w-full focus:outline-none focus:ring focus:border-primary-600 hover:border-primary-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black-400 text-sm mb-1">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-transparent border border-gray-600 rounded-lg p-2 md:p-3 w-full focus:outline-none focus:ring focus:border-primary-600 hover:border-primary-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black-400 text-sm mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="bg-transparent border border-gray-600 rounded-lg p-2 md:p-3 w-full focus:outline-none focus:ring focus:border-primary-600 hover:border-primary-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black-400 text-sm mb-1">Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="bg-transparent border border-gray-600 rounded-lg p-2 md:p-3 w-full focus:outline-none focus:ring focus:border-primary-600 hover:border-primary-400"
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white hover:text-black py-2 px-4 rounded-full w-full transition duration-300 ease-in-out"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default BakerApplication;