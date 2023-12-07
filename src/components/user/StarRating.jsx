import React, { useState } from 'react';

const StarRating = ({ rating, onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  const handleClick = (selectedRating) => {
    setSelectedRating(selectedRating);
    onRatingChange(selectedRating);
  };

  const stars = [1, 2, 3, 4, 5]; // Number of stars

  return (
    <div className="flex justify-center items-center">
      {stars.map((star) => (
        <div
          key={star}
          className="cursor-pointer"
          onClick={() => handleClick(star)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={star <= selectedRating ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 text-yellow-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2l2.928 8.595h9.072l-7.337 5.355 2.818 8.547L12 18.305l-7.481 5.192 2.818-8.547-7.336-5.355h9.071z"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default StarRating;
