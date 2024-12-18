import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Movie from './movie.jsx'
import { MovieController } from './context/MovieContext.jsx'
import Test from './pages/Test.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MovieController>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/test' element={<Test />}/>
        <Route path='/movie/:id' element={<Movie />}/>
      </Routes>
      </MovieController>
  </BrowserRouter>,
)
