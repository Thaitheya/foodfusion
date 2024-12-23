import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../../services/Foodservice";
import StarRating from "../../components/StarRating/StarRating";
import { Price } from "../../components/Price/Price";
import { useCart } from "../../Hooks/useCart";
const FoodPage = () => {
  const [food, setFood] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);
  const handleAddToCart = () => {
    addToCart(food);
    navigate('/cart')
  }
  return (
    <div className="container py-4">
      {food && (
        <div className="card shadow-lg rounded-4 border-0">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={`${food.imageUrl}`}
                alt={food.name}
                className="card-img-top rounded-start"
                style={{
                  height: "250px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{food.name}</h5>
                <StarRating rating={food.stars} maxStars={5} size={24} />
                <span className="mt-2 text-muted small d-flex justify-content-start ">
                  {Array.isArray(food.origins)
                    ? food.origins.join(", ")
                    : "Unknown"}
                </span>
                <span className="text-muted small d-flex justify-content-end">
                  🕒 {food.cookTime} mins
                </span>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-center mt-3 d-flex justify-content-start">
                    <Price price={food.price * quantity} />
                  </div>
                  <button onClick={handleAddToCart} className="btn btn-primary">Add to cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodPage;
