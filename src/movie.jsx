import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

const APP_ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${APP_ACCESS_TOKEN}`
  }
};

export default function Movie(){
    const params = useParams();
    const [movies, setMovies] = useState(null);
    const [trailer, setTrailer] = useState(null);

    async function fetchMovies(){
        try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`, options);
        console.log(response);
        setMovies(
            {
            id: response.data.id,
            title: response.data.title,
            rating: response.data.vote_average,
            file_path: response.data.poster_path,
            tagline: response.data.tagline
            }
        )
        } catch (error) {
        console.log(error)
        }
    }

    async function fetchTrailerUrl(){
      try {
        if(movies){
          const trailer = await axios.get(`https://api.themoviedb.org/3/movie/${movies.id}/videos?language=en-US`, options);
          setTrailer(trailer.data.results.filter((video) => video.type === "Trailer")[0].key)
        }
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
        fetchMovies();
    }, [])

    useEffect(() => {
      fetchTrailerUrl();
    }, [movies])

    return(
        <main className="min-h-screen">
          <nav className='flex items-center gap-[150px] p-4 bg-red-300/5 border border-red-300/50 mb-12'>
            <Link to={"/"}><h1>Movies</h1></Link>
          </nav>
            {movies &&
              <div className='bg-blue-300/10 p-2 w-screen flex gap-5 text-2xl'>
                <img className='w-[300px]' src={`https://image.tmdb.org/t/p/w500/${movies.file_path}`} alt="" />
                <div>
                  <h2 className='truncate'>{movies.title}</h2>
                  <div>{movies.tagline}</div>
                  <div>⭐ {movies.rating || "N/A"}</div>
                </div>
                {trailer && 
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${trailer}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            }
              </div>
            }
        </main>
    )
}