import { useState, createContext } from "react";

export const MovieContext = createContext(null);


export const MovieController = ({children}) => {
    const [movies, setMovies] = useState([])

    return(
        <MovieContext.Provider value={[movies, setMovies]}>
            {children}
        </MovieContext.Provider>
    )
}