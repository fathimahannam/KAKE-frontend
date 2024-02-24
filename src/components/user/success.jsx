// src/components/SuccessPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen"  
        style={{
            backgroundImage: "url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcm00NjdiYXRjaDUtc2NlbmUtdy0wMDJjLXgtbDBhbDBxdzEuanBn.jpg?s=gIkx56qhbaj_WIMdSEDxHsa4DdR1c-8x0fRjKsglcvE')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <h1 className='text-8xl text-white font-bold'>K A K E.</h1>
            <br />
            <div className="text-white text-4xl font-bold">
            Congratulations! Your cake order is complete. Sweet moments await!
            </div>
            <div>
            <button className='bg bg-#f3dbd6 border border-white mt-4 px-32 font-bold py-2 rounded-lg shadow-md hover:bg-white '>
            <Link to="/ordelist">
                <button>orders</button>
            </Link>
            </button>
            </div>
        </div>
    );
};

export default SuccessPage;
