import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../utils/config';

const BakerList = () => {
  const [bakers, setBakers] = useState([]);
  const [selectedBaker, setSelectedBaker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${BACKEND_BASE_URL}/api/bakers/view-baker-requests/`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setBakers(response.data);
        } else {
          console.error('Response data is not in the expected format:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching bakers:', error);
      });
  }, []);

  console.log(bakers);
  const handleApprove = async (bakerId) => {
    try {
      await axios.post(`${BACKEND_BASE_URL}/api/bakers/approve/${bakerId}/`);
    } catch (error) {
      console.error('Error approving baker request:', error);
    }
  };

  const handleReject = async (bakerId) => {
    try {
      await axios.post(`${BACKEND_BASE_URL}/api/bakers/reject/${bakerId}/`);
    } catch (error) {
      console.error('Error rejecting baker request:', error);
    }
  };

  const handleToggleView = (baker) => {
    setSelectedBaker(baker);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-pink-100 p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">List of Bakers</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bakers.map((baker) => (
          <li key={baker.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="text-center">
              <div>
                <img
                src={BACKEND_BASE_URL + baker?.image}
                alt='img'
                className="w-32 h-32 mx-auto rounded-full mb-4"
                />
              </div>
              <p className="text-xl font-semibold text-pink-600">NAME:{baker.name}</p>
              <p className="text-gray-500">LOCATION:{baker.location}</p>
              <p className="text-gray-600">CONTACT ID:{baker.email}</p>
              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleToggleView(baker)}
                >
                  View Details
                </button>
                {/* Additional buttons or actions */}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedBaker && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <h2 className="text-2xl font-semibold mb-4">{selectedBaker.name}</h2>
              <img src={selectedBaker.image_url} alt={selectedBaker.name} className="w-full mb-4 rounded-lg" />
              <div className="mb-4">
                {/* Display baker details here */}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => {
                    handleApprove(selectedBaker.id);
                    setIsModalOpen(false);
                  }}
                >
                  Approve
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => {
                    handleReject(selectedBaker.id);
                    setIsModalOpen(false);
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BakerList;
