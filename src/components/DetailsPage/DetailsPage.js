import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CastDetails from "../CastDetails/CastDetails";
import "./detailspage.css";
import { TailSpin } from "react-loader-spinner";

const DetailsPage = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const { id } = useParams();
  const imageUrl = "https://image.tmdb.org/t/p/w500";
  const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`;

  const getMovieDetails = async () => {
    let options = {
      method: "GET",
    };
    const response = await fetch(detailsUrl, options);
    const data = await response.json();
    setMovie(data);
    setIsLoading(false);
  };

  const { genres } = movie;

  useEffect(() => {
    getMovieDetails();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="top-container">
        <div>
          <div className="poster-and-details">
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
                  color: "#B3B6BA",
                }}
              >
                {movie.title}
              </h1>
              <h2
                style={{
                  color: "#536F8F",
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
                    color: "#B3B6BA",
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
                  color: "#535A62",
                }}
              >
                Release Date: {movie.release_date}
              </p>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              flexWrap: "wrap",
              marginLeft: "25px",
            }}
          >
            <h2
              style={{
                color: "#B3B6BA",
              }}
            >
              Overview
            </h2>
            <p
              className="overview-text"
              style={{
                color: "#616975",
              }}
            >
              {movie.overview}
            </p>
          </div>
        </div>
        <img
          className="backdrop"
          style={{
            width: "100%",
            height: "auto",
          }}
          src={imageUrl + movie.backdrop_path}
          alt="backdrop_poster"
        />
      </div>
      <h2
        style={{
          color: "#B3B6BA",
        }}
      >
        Cast
      </h2>
      <CastDetails movieid={movie.id} />
    </div>
  );
};

export default DetailsPage;
