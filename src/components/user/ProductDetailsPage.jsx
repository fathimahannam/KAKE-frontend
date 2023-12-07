import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../../utils/config';

function ProductDetailsPage() {
  const { cakeId } = useParams();
  const [cake, setCake] = useState({
    cakeName: '',
    description: '',
    price: '',
    availableSizes: [],
    flavors: [],
    image: '',
  });
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    // Fetch cake details based on the cakeId
    axios.get(`${BACKEND_BASE_URL}/api/cakes/${cakeId}`)
      .then((response) => {
        setCake(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cake details:', error);
      });
  }, [cakeId]);

  return (
    <div className="bg-pink-100 p-6 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-pink-700">{cake.cakeName}</h2>
          <img
            src={`${BACKEND_BASE_URL}${cake.image}`}
            alt={cake.cakeName}
            className="w-64 h-64 mx-auto rounded-lg"
          />
        </div>
        <p className="text-lg text-gray-700 mt-6">{cake.description}</p>
        <p className="text-xl text-pink-700 mt-2">Price: ${cake.price}</p>

        <div className="mt-6">
          <label className="text-gray-600">Select Size:</label>
          <input
            type="text"
            className="p-2 mx-2 border rounded-lg"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            placeholder="Enter Size"
          />
        </div>

        <button
          className="bg-yellow-500 text-white p-2 rounded-lg mt-6 hover:bg-yellow-600"
          onClick={orderCake}
        >
          Order Now
        </button>
      </div>
    </div>
  );

  function orderCake() {
    if (!selectedSize) {
      alert('Please enter a size before ordering.');
      return;
    }

    // Perform the order action here, e.g., send an API request.
    // You can use the selectedSize and cake.flavors to place the order.
    // Add your order logic here.
  }
}

export default ProductDetailsPage;
