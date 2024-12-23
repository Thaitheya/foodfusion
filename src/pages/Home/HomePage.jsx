import React, { useEffect, useReducer } from "react";
import {
  getAll,
  getAllByTag,
  getAllTags,
  search,
} from "../../services/Foodservice";
import Thumbnail from "../../components/Thumbnail/Thumbnail";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import Tag from "../../components/Tags/Tag";
import NotFound from "../../components/Not Found/NotFound";

const intitialState = { foods: [], tags: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

const HomePage = () => {
  const [state, dispatch] = useReducer(reducer, intitialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then(tags =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );
    const foodData = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();
    foodData.then((foods) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
  }, [searchTerm, tag]);

  return (
    <div className="container py-4">
      <div className="row mb-4 align-items-center">
        <div className="col-lg-4 col-md-5">
          <Tag tags={tags} />
          {foods.length === 0 && <NotFound />}
        </div>
        <div className="col-lg-8 col-md-7">
          <Search />
        </div>
      </div>
      <Thumbnail foods={foods} />
    </div>
  );
};

export default HomePage;
