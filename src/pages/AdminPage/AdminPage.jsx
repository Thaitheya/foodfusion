import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteById, getAll, search } from "../../services/Foodservice";
import NotFound from "../../components/Not Found/NotFound";
import Search from "../../components/Search/Search";
import { toast } from "react-toastify";

const AdminPage = () => {
  const [foods, setFoods] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    loadFoods();
  }, [searchTerm]);

  const loadFoods = async () => {
    const result = searchTerm ? await search(searchTerm) : await getAll();
    setFoods(result);
  };

  const renderNotFound = () => {
    if (foods && foods.length > 0) return null;
    return searchTerm ? (
      <NotFound linkRoute="/admin/foods" linkText="Show All" />
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Return to Dashboard" />
    );
  };

  const handleDelete = async (food) => {
    const confirmed = window.confirm(`Delete Food ${food.name}`)
    if(!confirmed) {
      return;
    }else{
      deleteById(food.id)
      toast.success(`${food.name} has been removed`)
      setFoods(foods.filter(f => f.id !== food.id))
    }
    console.log(`Delete food with ID: ${id}`);
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="fs-2">Manage Foods</div>
        <Link to="/admin/addFood" className="btn btn-primary">
          Add Food +
        </Link>
      </div>
      <div className="mb-4">
        <Search
          searchRoute="/admin/foods/"
          defaultRoute="/admin/foods"
          margin="1rem 0"
        />
      </div>
      {renderNotFound()}
      {foods.length > 0 && (
        <table className="table table-striped">
          <thead className="table-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, index) => (
              <tr key={food.id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{food.name}</td>
                <td>{food.description}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/admin/editFood/${food.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(food)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
