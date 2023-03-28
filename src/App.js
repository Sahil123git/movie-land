//5038fa50
// export default App;
import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=5038fa50";

const App = () => {
  const [searchTerm, setSearchTerm] = useState(""); //here initial val is empty string
  const [movies, setMovies] = useState([]); //here initial value of movies is empty array
  //means movies will be having arr of objects (Array destructuring CONCEPT)

  useEffect(() => {
    //when user refresh the site by default key word will be batman
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    // console.log(data);
    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} //here we r updating only searchTerm useState val as user is currently writing he is not yet finished
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)} //at this time only we will change movie useState so after user has written all his content then only update MovieCard block
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {/*iterating over arr of objects using map*/}
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
