import React from "react";
import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import { Price } from "../Price/Price";

const Thumbnail = ({ foods }) => {
    if (!Array.isArray(foods)) {
      return <div>No foods available.</div>;
    }
  return (
    <div className="container py-4">
      <div className="row gy-4">
        {foods.map((food) => (
          <div key={food.id} className="col-md-4 col-sm-6">
            <div className="card h-100 shadow-lg rounded-4 border-0">
              <Link to={`/foods/${food.id}`} className="w-100 text-center">
                <img
                  className="card-img-top rounded-top"
                  src={`${food.imageUrl}`}
                  alt={food.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </Link>
              <div className="card-body d-flex flex-column justify-content-between text-center">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0 text-truncate">{food.name}</h5>
                  <span
                    className={`fs-4 ${
                      food.favorite ? "text-danger" : "text-secondary"
                    }`}
                    role="button"
                    title="Favorite"
                  >
                    ❤
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <StarRating rating={food.stars} maxStars={5} size={24} />
                  <span className="mt-2 text-muted small d-flex justify-content-start ">
                    {Array.isArray(food.origins)
                      ? food.origins.join(", ")
                      : "Unknown"}
                  </span>
                  <span className="text-muted small d-flex justify-content-end">
                    🕒 {food.cookTime} mins
                  </span>
                </div>
                <div className="text-center mt-3 d-flex justify-content-start">
                  <Price price={food.price} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thumbnail;
