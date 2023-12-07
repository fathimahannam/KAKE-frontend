import React from 'react';

function CakeDetail({ cake, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-white p-4 max-w-md w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          Close
        </button>
        <img
          src={BACKEND_BASE_URL + cake.image}
          alt={cake.cakeName}
          className="object-cover w-full h-48"
        />
        <h2 className="text-2xl font-semibold">{cake.cakeName}</h2>
        <p>Description: {cake.description}</p>
        <p>Price: ₹{cake.price}</p>
      </div>
    </div>
  );
}

export default CakeDetail;
