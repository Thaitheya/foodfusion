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
  const navigate = useNavigate();

  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  };

  return (
    <div className="container-fluid py-4">
      {food && (
        <div className="card shadow-lg rounded-4 border-0">
          <div className="row g-0 align-items-center">
            {/* Food Image */}
            <div className="col-md-6">
              <div
                style={{
                  backgroundImage: `url(${food.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  minHeight: "400px",
                  width: "80%",
                  borderTopLeftRadius: "1rem",
                  borderBottomLeftRadius: "1rem",
                }}
              ></div>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <div className="card-body">
                <h1 className="card-title display-4">{food.name}</h1>
                <StarRating rating={food.stars} maxStars={5} size={30} />
                <p className="mt-3 text-muted">
                  {Array.isArray(food.origins)
                    ? food.origins.join(", ")
                    : "Unknown"}
                </p>
                <p className="text-muted">
                  <strong>Cook Time:</strong> 🕒 {food.cookTime} mins
                </p>
                <div className="d-flex align-items-center my-4">
                  <h3 className="mb-0">
                    <Price price={food.price * quantity} />
                  </h3>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary btn-lg mt-3"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodPage;
