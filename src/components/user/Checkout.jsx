import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import useRazorpay from 'react-razorpay';
import { getLocal } from '../../actions/auth';
import jwtDecode from 'jwt-decode';
import { RAZORPAY_KEY_ID } from '../../utils/config';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { BACKEND_BASE_URL } from '../../utils/config';

function VipPay() {
  const token = getLocal('authtoken')
  const decoded = jwtDecode(token);
  const [Razorpay] = useRazorpay();
  const [amount, setAmount] = useState(500);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [existingAddresses, setExistingAddresses] = useState([]);
  const navigate = useNavigate()
  const user_id = decoded.user_id;
  const [newAddress, setNewAddress] = useState('');
  const userId = user_id
  const [cake, setCake] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    
    axios.get(`${BACKEND_BASE_URL}/api/bakers/cakess/${id}/`)
      .then((response) => {
        setCake(response.data);

        setAmount(cake.price)

      })
      .catch((error) => {
        console.error('Error fetching cake details:', error);
      });
      // axios.get(`${BACKEND_BASE_URL}/api/bakers/get_orders/${userId}/`
      axios.get(`${BACKEND_BASE_URL}/api/existing-addresses/${userId}/`)
      .then((response) => {
        setExistingAddresses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching addresses:', error);
      });
    
  }, [id]);
  const handleDeliveryAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };
  const handleNewAddressChange = (e) => {
    setNewAddress(e.target.value);
  };
console.log(cake,'oooooo')
console.log(id)
console.log();

  const handleNewAddressSubmit = () => {
    const newAddressData = {
      address: newAddress,
      user: user_id,
    };

    // Make a POST request to the backend to add the new address
    axios.post('http://127.0.0.1:8000/api/add-address/', newAddressData)
      .then(response => {
        console.log(response.data); // Handle the response from the backend
        // Optionally update the dropdown value and clear the new address input field
        setExistingAddresses([...existingAddresses, newAddressData]);
        setDeliveryAddress(newAddress);
        setNewAddress('');
      })
      .catch(error => {
        console.error('Error adding address:', error);
        // Handle error, e.g., display an error message to the user
      });
  };

  
  const [address, setAddress] = useState()

  const handleSubscribe = async () => {
    
    setAddress(deliveryAddress)

    razorpayPayment()
  }
 
  
  const complete_payment = (payment_id,order_id,signature) => {
  
    axios
    .post(`http://127.0.0.1:8000/api/complete/${decoded.user_id}/`, {
      "payment_id": payment_id,
      "order_id": order_id,
      "signature": signature,
      "amount": amount,
      "currency": 'INR',
    }, {
      
    })
      .then((response) => {
        axios.post(`http://127.0.0.1:8000/api/bakers/orders/`, {
          user: decoded.user_id,
          product: id,  
          address: deliveryAddress,  
          baker:cake.user,
        });
          navigate('/success')

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  console.log(decoded.user_id,id,deliveryAddress)

  const razorpayPayment = () => {
  
    axios
    .post(`http://127.0.0.1:8000/api/create/${decoded.user_id}/`, {
      // "payment_id": payment_id,
      // "order_id": order_id,
      // "signature": signature,
      "amount": amount,
      "currency": 'INR',
    }, {
      
    })
      .then(function (response) {
        console.log(response.data.data);
        const order_id = response.data.data.id;

        const options = {
          key: RAZORPAY_KEY_ID,
          name: 'Talki',
          description: 'VIP membership upgrade',
          // image: logoImage,
          order_id: order_id,
          handler: function (response) {
            complete_payment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: 'Talki',
            email: 'violet.store.she@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Talki Team',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on('payment.failed', function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        rzp1.open();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto p-8">
            {/* Product Details Section */}
            {cake && (
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col lg:flex-row">
  <div className="lg:w-1/2 lg:mr-8">
    <img
      src={cake.image}
      alt={cake.cakeName}
      className="w-auto h-auto mb-4"
    />
  </div>
  <div className="lg:w-1/2 mx-auto">
  <h1 className="text-5xl font-semibold mt-11 mb-4">{cake.cakeName}</h1>
    <p>{cake.name}</p>
    <p className='text-2xl mt-6 '>₹ : {cake.price}</p>
    <p className='mt-4'>{cake.description}</p>
  </div>
</div>

      )}

              <br />
  
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4">Checkout</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select or Add Delivery Address
        </label>
        <select
          value={deliveryAddress}
          onChange={handleDeliveryAddressChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="" disabled>
            Choose an Address
          </option>
          {existingAddresses?.map((address, index) => (
            <option key={index} value={address.address}>
            {address.address}
            </option>
          ))}
        </select>
        <p className="mt-2 text-gray-500 text-sm">
          Or add a new address below:
        </p>
        <input
          type="text"
          value={newAddress}
          onChange={handleNewAddressChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        <button
          onClick={handleNewAddressSubmit}
          className="bg-amber-900 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded-md mt-2"
        >
          Submit Address
        </button>
      </div>
      <button
         onClick={razorpayPayment}
        className="bg-black hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md w-full mt-4"
      >
        Place Order
      </button>

    </div>
  </div>
  );
}

export default VipPay;