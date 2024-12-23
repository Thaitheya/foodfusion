import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (term.trim()) {
      navigate(`/search/${term}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search foods..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="btn btn-danger"
        type="button"
        onClick={handleSearch}
        style={{ borderRadius: "0px 50px 50px 0px" }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
