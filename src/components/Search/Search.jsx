import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({
  searchRoute = "/search/",
  defaultRoute = "/",
  margin = "1rem 0",
}) => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    term.trim() ? navigate(searchRoute + term) : navigate(defaultRoute);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="input-group" style={{ margin }}>
      <input
        type="text"
        className="form-control"
        placeholder="Search foods..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="btn btn-primary" type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
