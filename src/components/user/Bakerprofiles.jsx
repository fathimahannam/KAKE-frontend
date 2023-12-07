import React, { useEffect, useState } from 'react';
import StarRating from './StarRating'; 
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../../utils/config';
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Bakerprofiles() {
  const { userId } = useParams();
  const navigate = useNavigate()

  const [profile, setProfile] = useState({
    name: '',
    location: '',
    image: '',
  });

  const [selectedCake, setSelectedCake] = useState(null);
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    // Fetch user profile data
    const profileApiUrl = `${BACKEND_BASE_URL}/api/bakers/user-profiles/${userId}/`;
    axios.get(profileApiUrl, config)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });

    // Fetch cakes
    const apiUrl = `${BACKEND_BASE_URL}/api/bakers/show-cakes/?user_id=${userId}`;
    axios.get(apiUrl, config)
      .then((response) => {
        setCakes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cakes:', error);
      });
  }, [userId]);

  const openModal = (cake) => {
    setSelectedCake(cake);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedCake(null);
  };

  const addToWishlist = (cakeId) => {
    axios.post(`${BACKEND_BASE_URL}/api/bakers/add-to-wishlist/${cakeId}/`)
        .then(response => {
            // Handle success, e.g., update the UI to reflect the item being added to the wishlist.
        })
        .catch(error => {
            // Handle error.
        });
};


  
  return (
    <div className="bg-black min-h-screen relative">
      {/* Top Image */}
      <div className="h-[200px] w-full relative">
        <img
          src="https://heriots.co.uk/cdn/shop/collections/birthday-cake.jpg?v=1677069997"
          alt="Top Background"
          className="h-full w-full object-cover"
        />
        {/* Circular Profile Image */}
        <div className="absolute top-4 left-4 transform -translate-y-1/3 flex justify-center items-center pl-11 pt-12">
          <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-300">
            <img
              src={BACKEND_BASE_URL + profile.image}
              alt="Profile"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        </div>
        {/* Name and Bio */}
        <div className="absolute bottom-4 left-11 text-white pl-4 ">
          <h2 className="text-2xl font-semibold text-black">{profile.name}</h2>
          <p className="text-gray-600">{profile.location}</p>
        </div>
      </div>
      {/* Content Below */}
      <div className="py-4 px-6 bg-white h-[800px] ">
        {/* Your Profile Content Goes Here */}
        <div className="py-4 px-6 bg-white-100">
          <h2 className="text-2xl font-semibold mb-4">Image Gallery</h2>
          <div className="grid grid-cols-4 gap-4">
            {cakes.map((cake, index) => (
              <div key={index} className="relative aspect-ratio-1/1 overflow-hidden rounded-lg">
                <img
                  src={BACKEND_BASE_URL + cake.image}
                  alt={`Cake ${index + 1}`}
                  className="object-cover w-full h-full"
                  onClick={() => openModal(cake)}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-2">
                  <p className="text-center font-bold">{cake.cakeName}</p>
                  <p className="text-center">₹ {cake.price}</p>
                  <StarRating rating={cake.rating} onRatingChange={(newRating) => handleRatingChange(newRating, index)} />
                </div>
              </div>
            ))}
       
          </div>
        </div>
      </div>
      {/* Modal */}
      {selectedCake && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="bg-white p-4 max-w-md w-full rounded-lg z-50">
            <img src={BACKEND_BASE_URL + selectedCake.image} alt={selectedCake.cakeName} className="w-full" />
            <h2 className="text-xl font-semibold">{selectedCake.cakeName}</h2>
            <p>{selectedCake.description}</p>
            {console.log(selectedCake)}
            <p>Price: ₹{selectedCake.price}</p>
            <p>---------------------------------------</p>
            <p> SIZE: {selectedCake.availableSizes}</p>
            <p>FLAVOUR: {selectedCake.flavors}</p>
            <div className="flex justify-end">
              <button
                onClick={() => addToWishlist(selectedCake.id)}
                className="bg-transparent text-red-600 font-semibold hover:text-red-700 py-2 px-4 rounded-md"
              >
                <FontAwesomeIcon icon={faHeart} className="fa-2x" />
              </button>
              <button
                onClick={closeModal}
                className="bg-red-600 hover.bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
              >
                Close
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md ml-2"
              onClick={()=>navigate(`/checkout/${selectedCake.id}`)}>

                Buy
        {/* <Link to="/checkout/" className="text-white no-underline">
        </Link> */}
      </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bakerprofiles;
