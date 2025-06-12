import { useState } from 'react';

const Rating = ({ scale = 5, character = '★', starSize = 24 }) => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      {[...Array(scale)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            style={{
              cursor: 'pointer',
              color: starValue <= rating ? 'gold' : 'gray',
              fontSize: `${starSize}px`,
            }}
            onClick={() => setRating(starValue)}
          >
            {character}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
