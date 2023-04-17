import React, { useState, useEffect } from "react";
import LoadingComponent from "./Loading";
import MovieCard from "./MovieCard";
import SearchIcon from "../search.svg";
import "../App.css";

const API_KEY = "5038fa50";
const API_URL = `https://www.omdbapi.com?apikey=${API_KEY}`;
const PageSz = 10;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); //here initial val is empty string
  const [movies, setMovies] = useState([]); //here initial value of movies is empty array
  const [loading, setLoading] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  //means movies will be having arr of objects (Array destructuring CONCEPT)

  useEffect(() => {
    //when user refresh the site by default key word will be batman
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    setLoading(1);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setLoading(0);
    // console.log(data);
    setTotalCnt(data.totalResults);
    setMovies(data.Search);
    setTitle(title);
    console.log(data, page);
  };

  const handlePrevClick = async () => {
    setPage(page - 1);
    setLoading(true);
    const response = await fetch(`${API_URL}&s=${title}&page=${page - 1}`);
    const data = await response.json();
    setLoading(false);
    setMovies(data.Search);
  };
  const handleNextClick = async () => {
    setPage(page + 1);
    setLoading(true);
    const response = await fetch(`${API_URL}&s=${title}&page=${page + 1}`);
    const data = await response.json();
    setLoading(false);
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

      {loading ? (
        <LoadingComponent />
      ) : movies?.length > 0 ? (
        <div className="container">
          {/*iterating over arr of objects using map*/}
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      <div className="container d-flex justify-content-between p-5">
        <button type="button" onClick={handlePrevClick} disabled={page <= 1}>
          &larr; Prev
        </button>
        &nbsp;
        <button
          type="button"
          disabled={page + 1 > Math.ceil(totalCnt / PageSz)}
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};
export default Home;
