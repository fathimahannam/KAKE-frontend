import React, { useEffect, useState } from 'react';
import jwtDecode from "jwt-decode";
import { getLocal } from '../../actions/auth';
import { Link } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../../utils/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const token = getLocal('authToken');
  const decoded = jwtDecode(token);

  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPhonenumber, setNewPhonenumber] = useState('');
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}/api/bakers/user-profiles/${decoded.user_id}/`)
      .then((response) => response.json())
      .then((data) => {
        setName(data);
        setProfileImage(data.profile_image);
       
      })
      .catch((error) => {
        console.log('error fetch', error);
      });
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
    setNewName(name.name);
  };
  const handleSaveProfile = () => {
  const formData = new FormData();

  if (newName) {
    formData.append('name', newName);
  }

  if (newLocation) {
    formData.append('location', newLocation);
  }

  if (newPhonenumber) {
    formData.append('phoneNumber', newPhonenumber);
  }

  if (newImage) {
    formData.append('image', newImage);
  }

  // Make your API request with the formData
  // ...

  // Example using fetch:
  fetch(`${BACKEND_BASE_URL}/api/bakers/editbakers/${decoded.user_id}/`, {
    method: 'PUT',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      // Handle success
setName(data);

        setProfileImage(data.profile_image);
        setIsEditing(false);
      console.log(data);
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });
};
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setNewImage(file);  // Update the newImage state
  };
  
console.log(name)
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-200 shadow-md rounded-md ">
      <div className="flex flex-col items-center mb-8">
        <img
          className="w-32 h-32 rounded-full mb-4 "
          src={BACKEND_BASE_URL+name.image}
          alt={`${name.name}'s Profile Photo`}
        />
        <h1 className="text-3xl font-bold text-white">{name.name}'s Profile</h1>
        <button
          className="bg-red-300 hover:bg-red-400 text-white text-lg py-2 px-4 rounded-md mt-2"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
      </div>

      <div className="bg-white rounded-md p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h2>
        <p className="text-gray-600">name:{name.name}</p>
        <p className="text-gray-600">email:{name.email}</p>
        <p className="text-gray-600">location:{name.location}</p>
        <p className="text-gray-600">phonenumber:{name.phoneNumber}</p>
      </div>

      {isEditing && (
        <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="modal-content bg-white p-8 rounded shadow-lg">
            <button
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 cursor-pointer"
              onClick={() => setIsEditing(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl mb-4 text-gray-800">Edit Profile</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newName">
                New Name
              </label>
              
              <input
                id="newName"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newphonenumber">
                phone number
              </label>
              
              <input
                id="newName"
                type="text"
                value={newPhonenumber}
                onChange={(e) => setNewPhonenumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newlocation">
                location
              </label>
              
              <input
                id="newName"
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newImage">
                New Profile Image
              </label>
              <input
                id="newImage"
                type="file"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </div>
      )}
            {/* Fixed Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-80  border-t border-gray-200">
        <div className="container mx-auto flex justify-center items-center h-16">
          <Link to="/baker/profile" className="text-3xl  mx-4 pr-24" title="Home">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link to="/baker/cakedetails" className="text-3xl  mx-4" title="Add Product">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
          <Link to="/baker/editprofile" className="text-3xl  mx-4 pl-24" title="Profile">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;