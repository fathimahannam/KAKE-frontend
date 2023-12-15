import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwtDecode from 'jwt-decode';
import { getLocal } from '../../actions/auth';
import axios from 'axios';
import { faHome, faPlus, faUser,faList } from '@fortawesome/free-solid-svg-icons';
import { BACKEND_BASE_URL } from '../../utils/config';
import EditProfile from './EditProfile'; 

function Profile() {
  // Get the user ID from the decoded JWT token
  const token = getLocal('authtoken');
  const decoded = jwtDecode(token);
  const userId = decoded.user_id;

  const [profile, setProfile] = useState({ 
    name: '',
    location: '',
  });

  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    const apiUrl = `${BACKEND_BASE_URL}/api/bakers/show-cakes/?user_id=${userId}`;
    const profileApiUrl = `${BACKEND_BASE_URL}/api/bakers/user-profiles/${userId}/`;


    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fetch user profile data
    axios
      .get(profileApiUrl, config)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });

    // Fetch cakes
    axios
      .get(apiUrl, config)
      .then((response) => {
        console.log(response.data);
        setCakes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cakes:', error);
      });
  }, [userId, token]);
  console.log(profile);


  const updateProfile = (newProfileData) => {
    setProfile(newProfileData);
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
              src={profile.image}
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
        src={BACKEND_BASE_URL + cake.image} // Use the image URL from the cake data
        alt={`Cake ${index + 1}`}
        className="object-cover w-full h-full"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-2">
        <p className="text-center font-bold">{cake.cakeName}</p>
        <p className="text-center">₹ {cake.price}</p>
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-80  border-t border-gray-200">
        <div className="container mx-auto flex justify-center items-center h-16">
          <Link to="/baker/profile" className="text-3xl  mx-4 pr-24" title="Home">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link to="/baker/cakedetails" className="text-3xl  mx-4" title="Add Product">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
          <Link to="/baker/order-details" className="text-3xl  mx-4 pl-24" title="Profile">
            <FontAwesomeIcon icon={faList} />
          </Link>
          <Link to="/baker/editprofile" className="text-3xl  mx-4 pl-24" title="Profile">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
