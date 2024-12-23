import React from "react";

const StarRating = ({ rating = 0, maxStars= 5, size= 18 }) => {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${i <= rating ? "text-warning" : "text-secondary"}`}
        style={{
          fontSize: `${size}px`,
          cursor: "pointer",
        }}
      >
        ★
      </span>
    );
  }

  return <div className="star-rating d-flex">{stars}</div>;
};

// StarRating.defaultProps = {
//   rating: 0,
//   maxStars: 5,
//   size: 18,
// };

export default StarRating;
