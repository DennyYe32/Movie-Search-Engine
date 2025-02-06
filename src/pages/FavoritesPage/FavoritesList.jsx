import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import './FavoritesList.css';

function FavoritesPage() {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hardcoded API URI
  const API_URL = 'http://localhost:5000/api/favorite'; // Update if your backend uses a different route

  // Fetch favorite lists from the backend
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debugging log
        if (!token) {
          alert('Please log in to view your favorite lists.');
          navigate('/login'); // Redirect to login if not authenticated
          return;
        }

        const response = await axios.get(`${API_URL}/favorite-lists`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Fetched lists response:', response.data); // Debugging log
        if (response.data?.lists) {
          setLists(response.data.lists);
        } else {
          setLists([]);
        }
      } catch (err) {
        console.error('Error fetching favorite lists:', err.response || err.message);
        setError('Failed to load favorite lists.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLists();
  }, [navigate]);

  // Create a new favorite list
  const handleCreateList = async () => {
    const listName = prompt('Enter a name for the new list:');
    if (!listName) return;

    setIsCreating(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/favorite-lists`,
        { name: listName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Create list response:', response.data); // Debugging log
      if (response.data) {
        setLists((prevLists) => [...prevLists, response.data]);
        alert('List created successfully!');
      }
    } catch (err) {
      console.error('Error creating favorite list:', err.response || err.message);
      alert('Failed to create the list. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  // Delete a favorite list
  const handleDeleteList = async (listId) => {
    if (!window.confirm('Are you sure you want to delete this list?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/favorite-lists/${listId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
      alert('List deleted successfully!');
    } catch (err) {
      console.error('Error deleting favorite list:', err.response || err.message);
      alert('Failed to delete the list. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <div className="favorites-container">
        <h1>Your Favorite Lists</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : lists.length === 0 ? (
          <p className="no-lists-message">No favorite lists yet. Click "Create List" to get started!</p>
        ) : (
          <div className="lists">
            {lists.map((list) => (
              <div key={list._id} className="list-item">
                <h3 onClick={() => navigate(`/favorites/${list._id}`)}>{list.list_name}</h3>
                <button onClick={() => handleDeleteList(list._id)}>Delete</button>
              </div>
            ))}
          </div>
        )}

        <button
          className="create-list-button"
          onClick={handleCreateList}
          disabled={isCreating}
        >
          {isCreating ? 'Creating...' : 'Create List'}
        </button>
      </div>
    </div>
  );
}

export default FavoritesPage;
