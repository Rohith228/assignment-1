import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CastDetails from "../CastDetails/CastDetails";
import "./detailspage.css";

const DetailsPage = () => {
  const [movie, setMovie] = useState([]);

  const { id } = useParams();
  console.log(id);

  const imageUrl = "https://image.tmdb.org/t/p/w500";
  const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`;

  const getMovieDetails = async () => {
    let options = {
      method: "GET",
    };
    const response = await fetch(detailsUrl, options);
    const data = await response.json();
    setMovie(data);
  };

  console.log(movie);
  const { genres } = movie;
  console.log(genres);

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <div className="details-container">
      <div className="top-container">
        <div>
          <div
            style={{
              display: "flex",
            }}
          >
            <img
              style={{
                height: "300px",
              }}
              src={imageUrl + movie.poster_path}
              alt="poster"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <h1
                style={{
                  color: "crimson",
                }}
              >
                {movie.title}
              </h1>
              <h2
                style={{
                  color: "green",
                }}
              >
                Rating: {movie.vote_average}
              </h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    color: "indigo",
                    fontWeight: "bold",
                  }}
                >
                  {movie.runtime}min
                </p>
                {genres &&
                  genres.map((each) => {
                    return (
                      <p
                        style={{
                          marginLeft: "5px",
                          color: "gray",
                        }}
                      >
                        {each.name}
                      </p>
                    );
                  })}
              </div>
              <p
                style={{
                  color: "goldenrod",
                }}
              >
                Release Date: {movie.release_date}
              </p>
            </div>
          </div>
          <div
            style={{
              width: "900px",
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                color: "crimson",
              }}
            >
              Overview
            </h2>
            <p
              style={{
                color: "blue",
              }}
            >
              {movie.overview}
            </p>
          </div>
        </div>
        <img
          style={{
            width: "50%",
            backgroundSize: "cover",
          }}
          src={imageUrl + movie.backdrop_path}
          alt="backdrop_poster"
        />
      </div>
      <h2
        style={{
          color: "crimson",
        }}
      >
        Cast
      </h2>
      <CastDetails movieid={movie.id} />
    </div>
  );
};

export default DetailsPage;
