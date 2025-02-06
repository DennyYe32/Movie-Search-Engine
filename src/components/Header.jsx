import React, {useState} from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Header.css';
import logo1 from '../assets/logo1.png';
import pfp from '../assets/popcornpfp.jpg'

function Header(props) {
  const [searchInput, setSearchInput] = useState("");
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieData = async () =>{
    // fetching videos Data
    await fetch(`https://www.omdbapi.com/?s=${searchInput}&page=${props.val}&apikey=5553db97`)
    .then(res=>res.json())
    .then(data => {setApiData(data.Search), setLoading(false)});
}

  useEffect(()=>{
    fetchMovieData();
  
  },[])

const handleChange = Event => {
  setSearchInput(Event.target.value)
}

  return (
    <header className="header">
      <div className="logo" onClick={() => window.location.href = '/'}>
        <img src={logo1} alt="Logo" />
        <span>ReelMovies</span>
      </div>

      <div className='spaceFill'></div>
      <div className='right'>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/tvshows">TV Show</Link>
        <Link to="/favorites">Favorites List</Link>
      </nav>

      <div className="user-info">
        <img src= {pfp} alt="User Avatar" />
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
      </div>
      
    </header>
  )
}

export default Header