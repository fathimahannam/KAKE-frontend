import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLocal } from '../../actions/auth';
import jwtDecode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faComment } from '@fortawesome/free-solid-svg-icons';
import ProfilePage from './EditProfile';

function BakerLandingPage() {
  const images = [
    {
      src: 'https://assets.epicurious.com/photos/62b9e092ba4911ad9d7f93ac/4:3/w_5005,h_3754,c_limit/ChiffonCake_HERO_062322_36161.jpg',
      alt: 'Image 1',
      caption: 'BULID YOUR EMPIRE HERE',
      },
    {
      src: 'https://i.ytimg.com/vi/uHE9Wixi8dU/maxresdefault.jpg',
      alt: 'Image 2',
      caption: 'BULID YOUR EMPIRE HERE',
    },
    {
      src: 'https://insanelygoodrecipes.com/wp-content/uploads/2023/03/Sweet_Cold_Ice_Cream_Cake_with_Berries.jpg',
      alt: 'Image 3',
      caption: 'BULID YOUR EMPIRE HERE',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds (adjust as needed)

    return () => {
      clearInterval(interval);
    };
  }, []);



  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocal('authToken');
    if (token) {

      const decoded = jwtDecode(token);
      // Check if the token is not expired or invalid here if needed
      setIsLoggedIn(true); // Set isLoggedIn to true if the user has a valid token
    } else {
      setIsLoggedIn(false); // Set isLoggedIn to false if there's no valid token
    }
  }, []);
  const handleLogout=(e)=>{
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    // setTimeout(()=>{
      navigate('/login')
    // })
  }  
  const handleStartButtonClick = () => {
    // Redirect to the '/profile' page
    navigate('/baker/profile');
  };

  return (
    <div className="bg-white min-h-screen text-black">
      {/* Header */}
      <header className="bg-white text-black py-4">
      <div className='w-full h-20 flex justify-between items-center px-8 text-black ml-6'>
      <h1 className='text-2xl font-bold text-black'>K A K E.</h1>
      <ul className='flex items-center'>
        <li>
        <button
          onClick={() => {
            navigate('/baker/baker-chat')
          }}
          className=" bg-transparent text-black font-semibold hover:text-gray-500 py-2 px-4 rounded-md"
        >
          <FontAwesomeIcon icon={ faComment}  className="fa-2x"/>
        </button>
        </li>
        <li className='mr-10 bg-black text-white hover:bg-white hover:text-black font-bold py-2 px-4 rounded-md shadow-lg transition duration-300 ease-in-out'>
          {isLoggedIn ? (
             <button  onClick={handleLogout}>LOGOUT</button>
          ) : (
            <Link to="/login">LOGIN</Link>
          )}
        </li>
      </ul>
    </div>
      </header>

      {/* Carousel Section */}
      <div className="carousel relative w-full">
        <img
          className="carousel-image w-full h-[500px] object-cover"
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
        />
        <div className="carousel-caption absolute inset-0 flex items-center justify-center text-white bg-opacity-80 ">
          <div className="text-center">
            <h3 className="text-8xl font-semibold">{images[currentIndex].caption}</h3>
            <p className="text-lg">_________________________________________________</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="bg-rose-100 text-rose-800 py-20">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-semibold mb-4">Unlock the artistry of baking with us,Start Your Delicious Journey.</h2>
    <p className="text-lg mb-8">Indulge in the world of homemade delights crafted with love.</p>
    <button
            onClick={handleStartButtonClick}
            className="bg-black text-white hover:bg-white hover:text-black font-bold py-2 px-4 rounded-md shadow-lg transition duration-300 ease-in-out"
          >
            Start
          </button>
  </div>
</section>



      {/* Footer */}
      <footer className="bg-white text-black py-8 text-center">
        <div className="container mx-auto">
          <p>&copy; 2023 K A K E.</p>
        </div>
      </footer>
    </div>
  );
}

export default BakerLandingPage;
