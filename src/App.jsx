import { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MovieContext } from './context/MovieContext';
import Navbar from './components/Navbar';

const APP_ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${APP_ACCESS_TOKEN}`
  }
};

function App() {

  const [movies, setMovies] = useContext(MovieContext);
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
      <Navbar>
        <form className='flex gap-[20px]' action="">
          <input className='h-[50px] px-[10px] min-w-[300px] border border-blue-300/50' ref={ref} type="search" placeholder="The Wild Robot..." id="form_search" />
          <input className='h-[50px] min-w-[180px] border bg-blue-300/15 border-blue-300/50 cursor-pointer' type="submit" value="Rechercher" onClick={(e) => fetchMovies(e)}/>
        </form>
      </Navbar>
      <main className="min-h-screen">
        <div className='flex flex-wrap gap-12 p-5 justify-center'>
          {movies && movies.length > 1 && movies.map((movie) => (
            <Link to={`/movie/${movie.id}`}>
            <div className='movie_card bg-blue-300/10 p-2 w-[250px]' key={movie.id}>
              <img className='w-full aspect-[4/6]' src={`https://image.tmdb.org/t/p/w300/${movie.file_path}`} alt="" />
              <h2 className='truncate'>{movie.title}</h2>
              <div>⭐ {movie.rating || "N/A"}</div>
            </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );  
}

export default App
