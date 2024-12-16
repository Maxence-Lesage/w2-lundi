import { useEffect, useRef, useState } from 'react';
import './App.css'
import axios from 'axios';

const APP_ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${APP_ACCESS_TOKEN}`
  }
};

function App() {

  const [movies, setMovies] = useState(null);
  const ref = useRef();

  async function fetchMovies(e){
    if(e) e.preventDefault();
    const discover = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
    const byQuery = ref.current.value && `https://api.themoviedb.org/3/search/movie?query=${ref.current.value}&include_adult=false&language=en-US&page=1`
    try {
      const response = await axios.get(`${byQuery ? byQuery : discover}`, options);
      setMovies(response.data.results.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          file_path: movie.poster_path
        };
      }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  return (
    <>
      <h1>Movies</h1>
      <form action="">
        <input ref={ref} type="search" placeholder="The Wild Robot" id="form_search" />
        <input type="submit" value="Rechercher" onClick={(e) => fetchMovies(e)}/>
      </form>
      <div className='container'>
        {movies && movies.map((movie) => (
          <div className='movie_card' key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w300/${movie.file_path}`} alt="" />
            <h2>{movie.title}</h2>
            <div>Note: {movie.rating || "N/A"}</div>
          </div>
        ))}
      </div>
    </>
  );  
}

export default App
