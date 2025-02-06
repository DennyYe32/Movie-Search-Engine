import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import axios from 'axios';
import './ListDetails.css';

function ListDetailsPage() {
  const { id } = useParams(); // Get the list ID from the URL
  const navigate = useNavigate();
  const [listName, setListName] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchListName = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debugging log
        if (!token) {
          alert('Please log in to view your favorite lists.');
          navigate('/login'); // Redirect to login if not authenticated
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/favorite/list-details/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Fetched lists response:', response.data); // Debugging log
        setListName(response.data.list_name);
      } catch (err) {
        console.error('Error fetching favorite lists:', err.response || err.message);
        setError('Failed to load favorite lists.');
      } 
    };

    const fetchListDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please log in to view this list.');
          navigate('/login'); // Redirect if not authenticated
          return;
        }
    
        // Fetch list details and associated movies by list_id
        const response = await axios.get(`http://localhost:5000/api/favoriteMovie/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMovies(response.data.movies); // Set associated movies
      } catch (err) {
        console.error('Error fetching list details:', err.message);
        setError('Failed to load list details.');
      }
    };

    fetchListName();
    fetchListDetails();
  }, [id, navigate]);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`); // Redirect to movie detail page using movie ID
  };

  return (
    <div>
      <Header />
      <div className="list-details-container">
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <h1>{listName}</h1>
            {movies.length > 0 ? (
              <ul className="movie-list">
                {movies.map((movie) => (
                  <li
                  key={movie.movie_id}
                  className="movie-item"
                  onClick={() => handleMovieClick(movie.movie_id)} // Redirect on click
                >
                  <img
                    src={movie.poster_uri}
                    alt={`${movie.movie_name} Poster`}
                    className="movie-poster"
                  />
                  <h3>{movie.movie_name}</h3>
                </li>
                ))}
              </ul>
            ) : (
              <p>No movies added to this list yet.</p>
            )}
            <button onClick={() => navigate('/favorites')} className="back-button">
              Back to Favorites
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ListDetailsPage;
