import React from "react";
import { useState, useEffect } from "react";

const CastDetails = ({ movieid }) => {
  const [casting, setCasting] = useState([]);

  const castUrl = `https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`;
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  const getCast = async () => {
    const options = {
      method: "GET",
    };
    const response = await fetch(castUrl, options);
    const data = await response.json();
    const { cast } = data;
    setCasting(cast);
  };

  console.log(casting);

  useEffect(() => {
    getCast();
  }, [movieid]);
  if (casting) {
    return (
      <ul
        style={{
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          listStyleType: "none",
        }}
      >
        {casting &&
          casting.map((each) => {
            return (
              <li
                style={{
                  width: "300px",
                  margin: "10px",
                }}
              >
                <img
                  style={{
                    height: "200px",
                  }}
                  src={imageUrl + each.profile_path}
                  alt="not-available"
                />
                <h3
                  style={{
                    color: "purple",
                  }}
                >
                  {each.name}
                </h3>
                <div
                  style={{
                    flexWrap: "wrap",
                    width: "150px",
                  }}
                >
                  <p
                    style={{
                      color: "darkgrey",
                      fontWeight: "300",
                    }}
                  >
                    Character: {each.character}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    );
  }
};

export default CastDetails;
