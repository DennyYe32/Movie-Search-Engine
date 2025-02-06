// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MoviePage from './pages/MoviePage/Movie';
import TVShowPage from './pages/TVShowPage/TVShow';
import FavoritesPage from './pages/FavoritesPage/FavoritesList';
import LoginPage from './pages/LoginPage/Login';
import RegisterPage from './pages/RegisterPage/SignUp';
import MovieDetail from './pages/MovieDetail/Detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/tvshows" element={<TVShowPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/movies/:title" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
