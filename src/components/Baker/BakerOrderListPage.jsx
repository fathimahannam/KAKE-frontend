// BakerOrderListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getLocal } from '../../actions/auth';
import jwtDecode from 'jwt-decode';
import { BACKEND_BASE_URL } from '../../utils/config';

const BakerOrderListPage = () => {
  const token = getLocal('authtoken');
  const decoded = jwtDecode(token);
  const bakerId = decoded.user_id;
  const[st,setSt] =useState(false)

  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  // function for fetching data
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/api/bakers/baker/${bakerId}/orders/`
      );
      const data = response.data;

      if (data.orders.length > 0) {
        console.log('Example order structure:', data.orders[0]);
      }

      setOrders(data.orders);
      console.log(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [bakerId,st]);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus((prevSelectedStatus) => ({
      ...prevSelectedStatus,
      [orderId]: newStatus,
    }));
  };
  const handleSubmitStatus = async (orderId) => {
    try {
      console.log('Selected status:', selectedStatus);
      const response = await axios.patch(
        `${BACKEND_BASE_URL}/api/bakers/baker/${bakerId}/orders/${orderId}/update-status/`,
        { status: selectedStatus},  // Pass status in the request payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       setSt(!st)
      console.log('Status updated successfully:', response.data);
      // You may want to refetch orders or update the state based on the response
    } catch (error) {
      console.error('Error updating status:', error.response.data);
    }
  };
  
  
  
  
  
  
  

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold  mb-6">Baker's Order History</h1>

      {Array.isArray(orders) &&
        orders.map((order) => (
          <div key={order.order_id} className="mb-6  bg-red-100 hover:bg-red-200 p-6 border border-gray-300 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-500 font-semibold">Order {order.order_id} <div>
                <div className=" text-black text-3xl">Name : {order.cake}</div>
                <div className="text-black text-xl"> price : ₹ {order.price}</div>
                {console.log(order)}
                <div className="text-black text-lg font-semibold">order detail: {order.status}</div>

                   Status:
                  <select
                    value={selectedStatus[order.order_id] || order.status}
                    onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                  <button onClick={() => {
                    handleSubmitStatus(order.order_id),
                    fetchOrders()
                  }}>Submit Status</button>
                </div>
              </div>
              <div className="text-gray-500 mb-16">{order.datetime}</div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                {/* ... (product details) */}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
               
                <div className="text-gray-500">order address : <span className='text-black'> {order.address}</span></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BakerOrderListPage;
