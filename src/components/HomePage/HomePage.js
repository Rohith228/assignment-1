import React from "react";
import { useState, useEffect } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";

const HomePage = ({ search }) => {
  const [movies, setMovies] = useState([]);
  console.log(search);

  const imageUrl = "https://image.tmdb.org/t/p/w500";

  const getAllMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1";
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
  }, []);

  console.log(movies);

  const filteredMovie = movies.filter((each) =>
    each.title.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredMovie.length > 0) {
    return (
      <div className="home-container">
        <ul className="list-container">
          {filteredMovie.map((each) => {
            return (
              <Link
                to={`/details/${each.id}`}
                key={each.id}
                className="list-element"
              >
                <img
                  className="poster"
                  src={imageUrl + each?.poster_path}
                  alt="poster"
                />
                <h5 className="title">{each.title}</h5>
                <p className="rating">Rating: {each.vote_average}</p>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <h1
        style={{
          textAlign: "center",
          color: "crimson",
        }}
      >
        There is Nothing To Show
      </h1>
    );
  }
};

export default HomePage;
