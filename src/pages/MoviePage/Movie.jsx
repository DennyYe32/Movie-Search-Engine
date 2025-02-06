// src/pages/MoviePage/Movie.js
import React, { useState } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Filter from '../../components/Filter';
import logo1 from '../../assets/logo1.png'
import './Movie.css';

function MoviePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);


    /////////////////////////
    const keyWord = "Team"
    ////////////////////////

  const fetchMovieData = async () =>{
    // fetching videos Data
    await fetch(`https://www.omdbapi.com/?s=${keyWord}&type=movie&page=${currentPage}&apikey=5553db97`)
    .then(res=>res.json())
    .then(data => {setApiData(data.Search), setLoading(false)});
}

  useEffect(()=>{
    fetchMovieData();
  
  },[])

  

  const viewDetails = (index) => {
    navigate(`/movies/${index}`);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    setLoading(true);
    fetchMovieData();
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    setLoading(true);
    fetchMovieData();
  };

  if (loading) {
    return (
      <div className='load'>
        <img src={logo1} alt="Logo1" />
        <h2>Loading...</h2>
      </div>
    )
  }
  return (
    <div>
      <Header var = {currentPage} />
      <div className="container">
        <Filter />
        <div className="main-content-mv">
          <h2>Movies</h2>
          <div className="movie-container">
            {apiData.map((movie, index) => (
              <div
                key={index}
                className="movie-item"
                onClick={() => viewDetails(movie.imdbID)}
              >
                <img src={movie.Poster} alt="Movie Poster" />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pagination">
        <span className="page-number">Page {currentPage}</span>
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={nextPage}>Next Page</button>
      </div>
    </div>
  );
}

export default MoviePage;
