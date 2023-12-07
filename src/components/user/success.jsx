// src/components/SuccessPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-green-500">
            <div className="text-white text-4xl font-bold">
                Congratulations! Your action was successful.
            </div>
            <Link to="/ordelist">
                <button>orders</button>
            </Link>
        </div>
    );
};

export default SuccessPage;
