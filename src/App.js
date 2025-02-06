import {useState,useEffect}  from "react";
import MovieCard from './MovieCard'; 
// 40330852
import './App.css';
import SearchIcon from './search.svg'
const API_URL = 'http://www.omdbapi.com?apikey=40330852';
const movie1={
    
        "Title": "The Amazing Spiderman 2 Webb Cut",
        "Year": "2021",
        "imdbID": "tt18351128",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNzI0MmQyMzYtZDAzNi00ZWZiLWFjMTgtNzQwOTRjYTFlM2Y3XkEyXkFqcGc@._V1_SX300.jpg"
    
}
const App=()=>
{
    const [movies,setMovies]=useState([]);
    const [searchTerm,setSearchTerm]=useState('');
    const searchMovies=async(title)=>   
    {
        const response=await fetch(`${API_URL}&s=${title}`)
        const data= response.json();
        console.log(data)
        data.then((res) => {
            setMovies(res.Search);
        });
    }
    useEffect(()=>
    {
        searchMovies('Spiderman');
    },[]);
    return(
        < div className="app">
          <h1>MovieLand</h1>  
          <div className="search">
            <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <img src={SearchIcon}
            alt="SearchIcon"
            onClick={()=>searchMovies(searchTerm)}
            />
          </div>
          {
            movies?.length>0
            ?(
                <div className="container">
             {movies.map((movie)=>(
                <MovieCard movie={movie} key={movie.imdbID}/>
             ))}
          </div>
            ):
            (
                <div className="empty">
                 <h2>No movies found</h2>
                </div>
            )
          }
         
        </div>
    );
}
export default App;