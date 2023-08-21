import React, { useState, useEffect } from "react";

const CastDetails = ({ movieid }) => {
  const [casting, setCasting] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const castUrl = `https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`;
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  const getCast = async () => {
    const response = await fetch(castUrl);
    const data = await response.json();
    const { cast } = data;
    setCasting(cast);
  };

  useEffect(() => {
    getCast();
  }, [movieid]);

  const totalPages = Math.ceil(casting?.length / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = casting?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          listStyleType: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {currentItems?.map((each) => (
          <li
            key={each.id}
            style={{
              width: "100%",
              maxWidth: "300px",
              margin: "10px",
              textAlign: "center",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "auto",
              }}
              src={imageUrl + each.profile_path}
              alt="not-available"
            />
            <h3
              style={{
                color: "#454D59",
                fontSize: "1.2rem",
              }}
            >
              {each.name}
            </h3>
            <p
              style={{
                color: "#454D59",
                fontWeight: "500",
                fontSize: "1rem",
              }}
            >
              Character: {each.character}
            </p>
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            margin: "5px",
            padding: "5px 10px",
            backgroundColor: "#E0E0E0",
            color: "#333",
            border: "none",
            cursor: "pointer",
          }}
          onClick={goToPreviousPage}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            style={{
              margin: "5px",
              padding: "5px 10px",
              backgroundColor:
                currentPage === index + 1 ? "#007BFF" : "#E0E0E0",
              color: currentPage === index + 1 ? "white" : "#333",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          style={{
            margin: "5px",
            padding: "5px 10px",
            backgroundColor: "#E0E0E0",
            color: "#333",
            border: "none",
            cursor: "pointer",
          }}
          onClick={goToNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CastDetails;
