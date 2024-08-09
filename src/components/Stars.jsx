import React from 'react';
import fullStar from '../assets/Star 1.png';
import halfStar from '../assets/halfStar.png';

const StarRating = ({rate}) => {
  const stars = [];
  let rating=rate/2;
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
        console.log(rating);
      // Full star
      stars.push(<img key={i} src={fullStar} alt="Full Star" style={{ width: '20px', height: '20px' }} />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      // Half star
      stars.push(<img key={i} src={halfStar} alt="Half Star" style={{ width: '20px', height: '20px' }} />);
    } 
  }

  return <div>{stars}</div>;
};

export default StarRating;