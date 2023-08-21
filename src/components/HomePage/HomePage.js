import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Pagination from "pagination-for-reactjs-component";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homepage.css";

const HomePage = ({ searchResults }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const imageUrl = "https://image.tmdb.org/t/p/w500";

  const getAllMovies = async () => {
    setIsLoading(true);
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`;

    let options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const { results } = data;
    setMovies(results);
    setIsLoading(false);
  };

  if (page < 1) {
    setPage(1);
  }

  useEffect(() => {
    getAllMovies();
  }, [page]);

  const renderMovies = movies.map((each) => (
    <Link to={`/details/${each.id}`} key={each.id} className="list-element">
      <img className="poster" src={imageUrl + each?.poster_path} alt="poster" />
      <h5 className="title">{each.title}</h5>
      <p className="rating">Rating: {each.vote_average}</p>
    </Link>
  ));

  if (isLoading) {
    return (
      <div className="home-container">
        <div className="loader">
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
      </div>
    );
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
        {page > 0 && (
          <button
            style={{
              height: "38px",
              marginTop: "20px",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
              padding: "5px",
            }}
            onClick={() => setPage(page - 1)}
          >
            previous
          </button>
        )}
        <div
          style={{
            backgroundColor: "#282B33",
            textAlign: "center",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
        >
          <Pagination pageCount={500} pageIndex={page} setPageIndex={setPage} />
          <h6 style={{ color: "white" }}>page: {page}</h6>
        </div>

        {page <= 500 && (
          <button
            style={{
              height: "38px",
              marginTop: "20px",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
              padding: "5px",
            }}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default HomePage;
