import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/config';
import { getLocal } from '../../actions/auth';
import jwtDecode from 'jwt-decode';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const token = getLocal('authtoken');
  const decoded = jwtDecode(token);
  const [error, setError] = useState(null);

  // Fetch wishlist items from the API when the component mounts
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/api/bakers/wishlist/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setWishlistItems(response.data);
      } catch (error) {
        setError('Error fetching wishlist. Please try again.');
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [token]);

  const removeFromWishlist = async (cakeId) => {
    try {
      await axios.delete(`${BACKEND_BASE_URL}/api/bakers/remove-from-wishlist/${cakeId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // Update the state to remove the deleted item
      setWishlistItems((items) => items.filter((item) => item.cake.id !== cakeId));
    } catch (error) {
      setError('Error removing from wishlist. Please try again.');
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <div>
      <h2>My Wishlist</h2>
      {error && <p>{error}</p>}
      <ul>
        {wishlistItems.map((item) => (
          <li key={item.id}>
            {item.cake.cakeName}
            <button onClick={() => removeFromWishlist(item.cake.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wishlist;
