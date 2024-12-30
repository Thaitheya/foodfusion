import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { ImProfile } from "react-icons/im";
import { BsBag } from "react-icons/bs";
import { IoFastFoodSharp } from "react-icons/io5";

const Dashboard = () => {
  const { user } = useAuth();

  const allItems = [
    {
      title: "Orders",
      icon: <BsBag size={50} color="white" />,
      url: "/orders",
      bgColor: "#ec407a",
      color: "white",
    },
    {
      title: "Profile",
      icon: <ImProfile size={50} color="white" />,
      url: "/profile",
      forAdmin: false,
      bgColor: "#1565c0",
      color: "white",
    },
    {
      title: "Foods",
      icon: <IoFastFoodSharp size={50} color="white" />,
      url: "/admin/foods",
      forAdmin: true,
      bgColor: "#e040fb",
      color: "white",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="row gy-4">
        {allItems
          .filter((item) => user.isAdmin || !item.forAdmin)
          .map((item) => (
            <div className="col-md-6 col-lg-4" key={item.title}>
              <Link
                to={item.url}
                className="card text-decoration-none text-center"
                style={{
                  backgroundColor: item.bgColor,
                  color: item.color,
                }}
              >
                <div className="card-body d-flex flex-column align-items-center">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="mb-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    <div className="mb-3">{item.icon}</div>
                  )}
                  <h5 className="card-title">{item.title}</h5>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
