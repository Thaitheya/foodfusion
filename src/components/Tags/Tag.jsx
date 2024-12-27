import React from "react";
import { Link } from "react-router-dom";

const Tag = ({ tags }) => {
    if (!Array.isArray(tags)) {
      return <div>No foods available.</div>;
    }
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle w-100"
        type="button"
        id="tagDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Filter by Tags
      </button>
      <ul className="dropdown-menu" aria-labelledby="tagDropdown">
        {tags.map(tag => (
          <li key={tag.name}>
            <Link
              to={`/tag/${tag.name}`}
              className="dropdown-item d-flex justify-content-between align-items-center"
            >
              {tag.name}
              <span className="badge bg-primary">{tag.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tag;
