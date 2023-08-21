import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = (props) => {
  const { setSearch, search, setSearchResults } = props;
  const navigate = useNavigate();

  const searchApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${search}&page=1`;

  const onChangeSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = async () => {
    const options = {
      method: "GET",
    };
    const response = await fetch(searchApiUrl, options);
    const data = await response.json();
    setSearchResults(data);
    navigate("/");
  };

  return (
    <div className="header-container">
      <Link
        style={{
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "30px",
          color: "white",
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
        <button onClick={handleClick} type="submit" className="search-button">
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
