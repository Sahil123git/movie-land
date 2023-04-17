import React, { useEffect, useState } from "react";
import LoadingComponent from "./Loading";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

const API_KEY = "5038fa50";
const API_URL = `https://www.omdbapi.com?apikey=${API_KEY}`;

function MovieDetails() {
  const [loading, setLoading] = useState(0);
  const [movieData, setMovieData] = useState({});

  const searchMovies = async (id) => {
    setLoading(1);
    // console.log(id);
    // const temp = `${API_URL}&i=${id}`;
    // console.log(temp);
    const response = await fetch(`${API_URL}&i=${id}&plot=full`);
    const data = await response.json();
    setMovieData(data);
    console.log(data);
    setLoading(0);
  };

  const { id } = useParams();
  useEffect(() => {
    //when user refresh the site by default key word will be batman
    // console.log(id);
    searchMovies(id);
    // console.log(movieData);
  }, [id]);

  //   searchMovies(id);
  return (
    <div className="outer">
      {loading ? (
        <LoadingComponent />
      ) : (
        <div>
          <h1>{movieData.Title}</h1>
          <div className="movie-info">
            <img
              // src={movieData.Poster}
              src={
                movieData.Poster !== "N/A"
                  ? movieData.Poster
                  : "https://via.placeholder.com/500"
              }
              className="poster"
              alt="Poster"
              height="350px"
              width="300px"
            />
            <div className="movie-details">
              <h3>Release Date: {movieData.Released}</h3>
              <h3>IMDB Rating: {movieData.imdbRating}</h3>
              <h3>Genre: {movieData.Genre}</h3>
              <h3>Language: {movieData.Language}</h3>
            </div>
          </div>
          <div className="more-details">
            <h2>Plot</h2>
            <h3>{movieData.Plot}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
