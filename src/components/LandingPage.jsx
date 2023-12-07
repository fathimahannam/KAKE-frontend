import React from 'react';
import backgroundImage from '../assets/bgimg.png'
import { useEffect } from 'react';
import { getLocal } from '../actions/auth';

import Navbar from './Navbar';
import jwtDecode from 'jwt-decode';
import img from '../assets/h4.jpg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../utils/config';
import { toast, Toaster } from 'react-hot-toast';

const LandingPage = () => {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
  };
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBakers, setFilteredBakers] = useState([]);
  const buttons = [
    { text: 'Become A Baker', imageUrl:'https://i.pinimg.com/564x/f0/33/16/f033162333b3ae0ca8600d8c895a502d.jpg', linkTo: '/baker-register' },
    
  ];
  const [bakers,setBakers]=useState([])
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearch = () => {
    // Filter bakers based on the search query
    const filtered = bakers.filter((baker) =>
    baker.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBakers(filtered);
  };
  
const token = getLocal('authtoken')
const decoded = jwtDecode(token)
const id = decoded.user_id
console.log(id)
  useEffect(() => {
    const localResponse = getLocal('authToken');
    
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      if (decoded.is_admin === true) {
        navigate('/admin');
        console.log("admin")
        // toast.success('Logged in successfully', { duration: 3000 });
      } else if (decoded.is_staff) {
        navigate('/bakerhome');
        // toast.success('Logged in successfully', { duration: 3000 });
      } else {
        navigate('/home');
        
        // toast.success('Logged in successfully', { duration: 3000 });
        
        
      }
    }
    
  }, ['authtoken']);

  useEffect(() => {
    axios.get(`${BACKEND_BASE_URL}/api/bakers/view-bakers/`)
    .then((response) => {
      if (Array.isArray(response.data)) {
        // console.log(response.data);
        setBakers(response.data);
      } else {
        console.error('Response data is not in the expected format:', response.data);
      }
    })
    .catch((error) => {
      console.error('Error fetching bakers:', error);
    });
  }, []);
  
 
  function CardButton({ text, imageUrl, linkTo }) {
    return (
      <Link to={linkTo} className="w-full ">
        <div className="bg-red-200 hover:bg-white text-white text-lg hover:text-black p-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-md ">
          <div className="mb-2">
            <img src={imageUrl} alt="Button Image" className="w-20 h-20 mx-auto rounded-full" />
          </div>
          <p className="text-xl text-center">{text}</p>
        </div>
      </Link>
    );
  }
  const [faqs, setFaqs] = useState([
    { question: 'What flavors of cakes do you offer?', answer: 'We offer a variety of flavors, including chocolate, vanilla, strawberry, and more.' },
    { question: 'Do you provide gluten-free options?', answer: 'Yes, we offer gluten-free cake options for customers with dietary restrictions.' },
    { question: 'How can I place an order?', answer: 'You can place an order by visiting our website and using our online order form or by contacting us directly.' },
  ]);

  const toggleFAQ = (index) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index].isOpen = !updatedFaqs[index].isOpen;
    setFaqs(updatedFaqs);
  };
  return (
    
    <div>
      <Navbar/>
      <Toaster position="top-center" reverseOrder={false }></Toaster>
    <div className="min-h-screen flex flex-col justify-center items-center ml-12 mr-12" style={containerStyle}>
      <div className="text-center bg-white bg-opacity-60 p-8 rounded-lg">
        <h1 className="text-4xl font-extrabold mb-4">"Welcome to a World of Sweet Delights."</h1>
        <p className="text-lg text-gray-600 mb-8">Delicious treats baked with love!</p>
        <div className="w-full max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your location..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-yellow-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-2 text-yellow-500 hover:text-yellow-600 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.293 17.293a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="p-11">
  {/* Display filtered bakers */}
  <div className="flex justify-center">
    <div className="grid grid-cols-1 gap-2">
      {filteredBakers.length === 0 ? (
        <p>No bakers found.</p>
      ) : (
        filteredBakers.map((baker, index) => (
         
          <div key={index} className="bg-white p-3 rounded-lg shadow-md flex items-center h-12 ">
            <div className="w-11 h-11 mx-2">
              <img src={BACKEND_BASE_URL + baker.image} alt={`Baker ${index}`} className="w-11 h-11 rounded-full" />
            </div>
            <div className="mr-11 text-sm flex-grow">
              <p className="text-md">{baker.name}</p>
              <p className=" text-gray-500 text-xs">{baker.location}</p>
            </div>
            <div className="text-blue-500 hover:underline ">

              <Link to={`/bakerprofiles/${baker.user_id}`}>View Profile</Link>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</div>

    </div>
    <div className='p-6'>
    <div className="flex justify-center">
    <div className="grid grid-cols-1  w-full gap-4 mt-8 pl-7 pr-7">
          {buttons.map((button, index) => (
            <CardButton
              key={index}
              text={button.text}
              imageUrl={button.imageUrl}
              linkTo={button.linkTo}
            />
          ))}
          </div> 
        </div>

    </div>



    {/* *************************************************************************************************** */}
    <div className="min-h-screen">
      {/* Section 1 - Image on Left */}
      <section className="container mx-auto py-16 px-4 md:px-0 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <img
            src="https://i.pinimg.com/564x/3a/f5/4a/3af54a43f8826ee14bc896abd0bb4447.jpg" // Add your image URL here
            alt="Image 1"
            className="rounded-lg shadow-lg w-full md:h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 md:ml-8 mt-8 md:mt-0">
          <h2 className="text-3xl font-semibold mb-4">Valentine</h2>
          <p className="text-gray-700 leading-relaxed">
          a delectable creation designed to add sweetness and romance to your celebration of love. Crafted with passion and adorned with love, this exquisite cake is the perfect indulgence to share with your special someone on this cherished occasion.
          </p>
        </div>
      </section>

      {/* Section 2 - Image on Right */}
      <section className="container mx-auto py-16 px-4 md:px-0 flex flex-col md:flex-row-reverse items-center">
        <div className="md:w-1/2">
          <img
            src="https://i.pinimg.com/564x/8f/cf/f7/8fcff7a5b61bc8202eed29bf4ae4d7d8.jpg" // Add your image URL here
            alt="Image 2"
            className="rounded-lg shadow-lg w-full md:h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 md:mr-8 mt-8 md:mt-0">
          <h2 className="text-3xl font-semibold mb-4">strawberry delight</h2>
          <p className="text-gray-700 leading-relaxed">
          Order Your Slice of Happiness: Don't deny yourself the pleasure any longer. Order Strawberry Delight today, and let the enchanting flavors of ripe strawberries elevate your dessert experience to a whole new level. It's not just a cake; it's a Strawberry Delight experience waiting for you to savor.
          </p>
        </div>
      </section>

      {/* Section 3 - Image on Left */}
      <section className="container mx-auto py-16 px-4 md:px-0 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <img
            src="https://i.pinimg.com/564x/99/24/2b/99242bb77c935d47d2d70546c725dfa1.jpg" // Add your image URL here
            alt="Image 3"
            className="rounded-lg shadow-lg w-full md:h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 md:ml-8 mt-8 md:mt-0">
          <h2 className="text-3xl font-semibold mb-4">choco chocolate</h2>
          <p className="text-gray-700 leading-relaxed">
          Indulge your senses in a world of pure chocolate ecstasy with our Choco Chocolate Bliss cake. This heavenly creation is a chocolate lover's dream come true, designed to tantalize your taste buds and leave you craving for more.
          </p>
        </div>
      </section>
    </div>

        
    <div className=" flex flex-col justify-center items-center">

      <section className="container mx-auto mt-8 text-center">
      <div className="bg-gradient-to-t from-red-100 to-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="faq-container flex flex-col items-center w-full">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq mb-4 w-96 ${
                  faq.isOpen ? 'bg-white' : 'bg-red-200 text-white'
                } p-4 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out`}
                onClick={() => toggleFAQ(index)}
              >
                <p className="font-semibold">{faq.question}</p>
                {faq.isOpen && <p className="mt-2">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>


    </div>
    
  );
 
};
export default LandingPage;
