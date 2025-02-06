// src/pages/TVShowPage/TVShow.js
import React, { useState } from 'react';
import Header from '../../components/Header';
import Filter from '../../components/Filter';
import './TVShow.css';

function TVShowPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="tvshow-page">
      <Header /> 
      <div className="container">
        <Filter />
        <div className="main-content">
          {/* Critically Acclaimed TV Shows */}
          <div className="category-section">
            <h2>Critically Acclaimed TV Shows</h2>
            <div className="category-content">
              <div className="tv-show-item">
                <img src="https://via.placeholder.com/200x300" alt="TV Show Poster" />
                <div>TV Show 1</div>
              </div>
              <div className="tv-show-item">
                <img src="https://via.placeholder.com/200x300" alt="TV Show Poster" />
                <div>TV Show 2</div>
              </div>
            </div>
          </div>

          {/* Your Next Watch */}
          <div className="category-section">
            <h2>Your Next Watch</h2>
            <div className="category-content">
              <div className="tv-show-item">
                <img src="https://via.placeholder.com/200x300" alt="TV Show Poster" />
                <div>TV Show 3</div>
              </div>
              <div className="tv-show-item">
                <img src="https://via.placeholder.com/200x300" alt="TV Show Poster" />
                <div>TV Show 4</div>
              </div>
            </div>
          </div>

          {/* Trending TV Shows */}
          <div className="category-section">
            <h2>Trending TV Shows</h2>
            <div className="category-content">
              <div className="tv-show-item">
                <img src="https://via.placeholder.com/200x300" alt="TV Show Poster" />
                <div>TV Show 5</div>
              </div>
              <div className="tv-show-item">
                <img src="https://via.placeholder.com/200x300" alt="TV Show Poster" />
                <div>TV Show 6</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Section */}
      <div className="pagination">
        <span className="page-number">Page {currentPage}</span>
        <button onClick={previousPage} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={nextPage}>Next Page</button>
      </div>
    </div>
  );
}

export default TVShowPage;
