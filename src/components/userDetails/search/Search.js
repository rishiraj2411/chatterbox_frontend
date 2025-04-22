import React from "react";
import "./SearchModule.css";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className="search">
      <BiSearch size={18} className="searchIcon" />
      <input
        type="text"
        className="searchClass"
        placeholder="Search products"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
