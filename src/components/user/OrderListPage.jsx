// OrderListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getLocal } from '../../actions/auth';
import jwtDecode from 'jwt-decode';
import { BACKEND_BASE_URL } from '../../utils/config';
const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const token = getLocal('authtoken')
  const decoded = jwtDecode(token);

  const userId = decoded.user_id

console.log(userId) 
 useEffect(() => {
    // Fetch orders from your APIaxios.get(`${BACKEND_BASE_URL}/api/bakers/get_orders/${userId}/`)
    axios.get(`${BACKEND_BASE_URL}/api/bakers/get_orders/${userId}/`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then(response => {
        setOrders(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);
//   console.log(orders,"================")
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6">Order History</h1>
      
      {Array.isArray(orders) && orders.map(order => (
        <div key={order.id} className="mb-6 p-6 border border-gray-300 rounded-md">
          {/* Order details */}
          {console.log(order,"inside div")}
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">Order {order.id}</div>
            <div className="text-gray-500">{order.datetime}</div>
          </div>

          {/* Product details */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img src={BACKEND_BASE_URL+ order.product_image} alt={order.product.name} className="w-12 h-12 object-cover mr-4" />
              <div>
                <div className="text-lg font-semibold">{order.product_name}</div>
              </div>
            </div>
            <div className="text-gray-700"> ₹ : {order.product_price}</div>
          </div>

          {/* User and delivery details */}
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-semibold">{order.user.user}</div>
              <div className="text-gray-500 text-xl">order address : {order.address}</div>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderListPage;
