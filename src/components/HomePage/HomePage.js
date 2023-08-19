import React, { useState, useEffect } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";

const HomePage = ({ searchResults, search }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  const getAllMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=" +
      currentPage;
    let options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const { results } = data;
    setMovies(results);
  };

  useEffect(() => {
    getAllMovies();
  }, [currentPage]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const renderMovies = currentMovies.map((each) => (
    <Link to={`/details/${each.id}`} key={each.id} className="list-element">
      <img className="poster" src={imageUrl + each?.poster_path} alt="poster" />
      <h5 className="title">{each.title}</h5>
      <p className="rating">Rating: {each.vote_average}</p>
    </Link>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(movies.length / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  if (searchResults?.results?.length > 0) {
    const { results } = searchResults;
    const required = results[0];

    return (
      <div className="home-container">
        <Link
          to={`/details/${required.id}`}
          key={required.id}
          className="element"
        >
          <img
            className="poster"
            style={{
              marginTop: "50px",
            }}
            src={imageUrl + required?.poster_path}
            alt="poster"
          />
          <h5 className="title">{required.title}</h5>
          <p className="rating">Rating: {required.vote_average}</p>
        </Link>
      </div>
    );
  }

  return (
    <div className="home-container">
      <ul className="list-container">{renderMovies}</ul>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={number === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
