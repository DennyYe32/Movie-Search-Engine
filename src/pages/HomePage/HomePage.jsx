import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../../components/Header';
import logo1 from '../../assets/logo1.png'
import { useNavigate } from 'react-router-dom';
import './HomePage.css';





function HomePage() {
  const [searchInput, setSearchInput] = useState("");
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSeach] = useState(0);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();




  const fetchMovieData = async () =>{
    // fetching videos Data
    await fetch(`https://www.omdbapi.com/?s=${searchInput}&page=1&apikey=5553db97`)
    .then(res=>res.json())
    .then(data => {setApiData(data.Search), setLoading(false)});
}

useEffect(()=>{
  setLoading(true);
  fetchMovieData();

},[search])



  const handleChange = Event => {
    setSearchInput(Event.target.value)
  }

  const click = Event => {
    setSeach(search + 1);
    setOffset(0);
  }

  const viewDetails = (index) => {
    navigate(`/movies/${index}`);
  };
  
  const nextClick = Event => {
    setOffset(offset + 1);
  }

  const backClick = Event => {
    if (offset > 0) {
      setOffset(offset - 1);
    }

  }

  if (loading) {
    return(
      <div className='load'>
      <img src={logo1} alt="Logo1" />
      <h2>Loading...</h2>
    </div>
    )
  }
  if (apiData == null && search == 0) {
    return (
      <div className="homepage">
      <Header />
      
      <div className="main-container">

        <div className="main-content">
        <div className="search-bar">
        <input type="text" 
        placeholder="Search for movies..."
        onChange = {handleChange}
        value = {searchInput} />
        <button onClick={click}>Search</button>
      </div>
        <div className="poster">
            <div className="movie-list" >
              Welcome to the Home Page type a movie title and click Search to begin!
            </div>
                    
          </div>
        </div>
      </div>
    </div>
    )
  }
  if (apiData == null) {
    return (
      <div className="homepage">
      <Header />
      
      <div className="main-container">

        <div className="main-content">
        <div className="search-bar">
        <input type="text" 
        placeholder="Search for movies..."
        onChange = {handleChange}
        value = {searchInput} />
        <button onClick={click}>Search</button>
      </div>
        <div className="poster">
            <div className="movie-list" >
              Sorry we couldn't find that movie 
            </div>
                    
          </div>
        </div>
      </div>
    </div>
    )
  }
  return (
    <div className="homepage">
      <Header />
      
      <div className="main-container">
        <button className='nextButton' onClick={backClick}>Back</button>

        <div className="main-content">
        <div className="search-bar">
        <input type="text" 
        placeholder="Search for movies..."
        onChange = {handleChange}
        value = {searchInput} />
        <button onClick={click}>Search</button>
      </div>
        <div className="poster">
            <div className="movie-list" >
              <div className="movie-item" style={{ width: '250px', height: '400px'}} onClick={() => viewDetails(apiData[0].imdbID)}>
                <img src= {apiData[(0 + offset*4)%10].Poster} alt="Movie Poster" style={{ width: '200px', height: '320px' }}/>
                <div>{apiData[(0 + offset*4)%10].Title}</div>
                <div className="rating">{apiData[(0 + offset*4)%10].Year}</div>
              </div>
              <div className="movie-item" style={{ width: '250px', height: '400px'}} onClick={() => viewDetails(apiData[1].imdbID)}>
                <img src= {apiData[(1 + offset*4)%10].Poster} style={{ width: '200px', height: '320px' }} />
                <div>{apiData[(1 + offset*4)%10].Title}</div>
                <div className="rating">{apiData[1].Year}</div>
              </div>
              <div className="movie-item" style={{ width: '250px', height: '400px'}} onClick={() => viewDetails(apiData[2].imdbID)}>
                <img src= {apiData[(2 + offset*4)%10].Poster} alt="Movie Poster" style={{ width: '200px', height: '320px' }}/>
                <div>{apiData[(2 + offset*4)%10].Title}</div>
                <div className="rating">{apiData[(2 + offset*4)%10].Year}</div>
              </div>
            </div>
        
          
            {/* Ranking sections */}
            <div className="ranking-container">
              <div className="movie-item" style={{ width: '250px', height: '400px'}} onClick={() => viewDetails(apiData[3].imdbID)}>
                <img src= {apiData[(3 + offset*4)%10].Poster} alt="Movie Poster" style={{ width: '200px', height: '320px' }}/>
                <div>{apiData[(3 + offset*4)%10].Title}</div>
                <div className="rating">{apiData[(3 + offset*4)%10].Year}</div>
              </div>
              
              <div className="movie-item" style={{ width: '250px', height: '400px'}} onClick={() => viewDetails(apiData[4].imdbID)}>
                <img src= {apiData[(4 + offset*4)%10].Poster} alt="Movie Poster" style={{ width: '200px', height: '320px' }}/>
                <div>{apiData[(4 + offset*4)%10].Title}</div>
                <div className="rating">{apiData[(4 + offset*4)%10].Year}</div>
              </div>
              <div className="movie-item" style={{ width: '250px', height: '400px'}} onClick={() => viewDetails(apiData[5].imdbID)}>
                <img src= {apiData[(5 + offset*4)%10].Poster} alt="Movie Poster" style={{ width: '200px', height: '320px' }}/>
                <div>{apiData[(5 + offset*4)%10].Title}</div>
                <div className="rating">{apiData[(5 + offset*4)%10].Year}</div>
              </div>
            </div>
          </div>
        </div>
        <button className='nextButton' onClick={nextClick}>Next</button>

      </div>
    </div>
  )
}

export default HomePage
