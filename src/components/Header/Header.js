import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = (props) => {
  console.log(props);
  const { setSearch } = props;

  const onChangeSearchInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="header-container">
      <Link
        style={{
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "30px",
        }}
        to="/"
      >
        MovieDb
      </Link>
      <div className="all-routes">
        <p className="route">Popular</p>
        <p className="route">TopRated</p>
        <p className="route">Upcoming</p>
        <input
          onChange={onChangeSearchInput}
          className="search-bar"
          type="search"
          placeholder="Enter movie name"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
