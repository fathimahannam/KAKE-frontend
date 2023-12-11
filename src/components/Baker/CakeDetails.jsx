import React, { useState } from 'react';
import axios from 'axios';  // Import Axios for making API requests
import { getLocal } from '../../actions/auth';
import jwtDecode from 'jwt-decode';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../../utils/config';
const CakeUploadForm = () => {
  const [cakeInfo, setCakeInfo] = useState({
    cakeName: '',
    description: '',
    price: '',
    availableSizes: '',
    flavors: '',
    image: null,
  });
 const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCakeInfo({
      ...cakeInfo,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setCakeInfo({
      ...cakeInfo,
      image: imageFile,
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = getLocal('authtoken');
      const decoded = jwtDecode(token);
      console.log("pppppppppp",decoded,token);
  
      const formData = new FormData();
      formData.append('user', decoded.user_id); // Replace 'userId' with the actual user ID field in the decoded token
      formData.append('cakeName', cakeInfo.cakeName);
      formData.append('description', cakeInfo.description);
      formData.append('price', parseFloat(cakeInfo.price)); // Ensure 'price' is a number
      formData.append('availableSizes', cakeInfo.availableSizes);
      formData.append('flavors', cakeInfo.flavors);
      formData.append('image', cakeInfo.image);
      
  
      const response = await axios.post(`${BACKEND_BASE_URL}/api/bakers/cakes/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Cake uploaded successfully:', response.data);
      toast.success('successfully added ',{duration:3000})
      setTimeout(()=>{
        navigate('/baker/profile')
      },1000)
      
      setCakeInfo({
        cakeName: '',
        description: '',
        price: '',
        availableSizes: '',
        flavors: '',
        image: null,
      });
    } catch (error) {
      console.error('Error uploading cake:', error);
    }
  };
  

  return (
    
    <div className=' min-h-screen flex items-center justify-center'>
         <Toaster position="top-center" reverseOrder={false }></Toaster>
      <div
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 rounded-lg p-4 shadow-md"
        style={{
          backgroundImage: "url('https://i.pinimg.com/564x/c7/d8/68/c7d8687a4a0a8192b7eea948f4a55598.jpg')",
        }}
      >
        <h2 className="text-3xl font-semibold mb-4">Upload a New Cake</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mb-4 ">
        <label htmlFor="cakeName" className="block text-gray-700 font-bold">
          Cake Name:
        </label>
        <input
          type="text"
          id="cakeName"
          name="cakeName"
          value={cakeInfo.cakeName}
          onChange={handleInputChange}
          className="w-full border rounded-lg p-2 bg-transparent"
        />
      </div>
      {/* Add similar input fields for description, price, availableSizes, flavors */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={cakeInfo.description}
          onChange={handleInputChange}
          className="w-full border rounded-lg p-2  bg-transparent"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold">
          Price:
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={cakeInfo.price}
          onChange={handleInputChange}
          className="w-full border rounded-lg p-2  bg-transparent"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="availableSizes" className="block text-gray-700 font-bold">
          Available Sizes:
        </label>
        <input
          type="text"
          id="availableSizes"
          name="availableSizes"
          value={cakeInfo.availableSizes}
          onChange={handleInputChange}
          className="w-full border rounded-lg p-2  bg-transparent"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="flavors" className="block text-gray-700 font-bold">
          Flavors:
        </label>
        <input
          type="text"
          id="flavors"
          name="flavors"
          value={cakeInfo.flavors}
          onChange={handleInputChange}
          className="w-full border rounded-lg p-2  bg-transparent"
        />
      </div>

      <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold">
              Cake Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-white text-white font-bold py-2 px-4 w-full rounded"
          >
            Upload Cake
          </button>
        </form>
      </div>
    </div>
  );
};

export default CakeUploadForm;

