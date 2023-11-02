import { useEffect, useState } from "react";
import {getMovieList, searchMovie} from "./Api"

const App = () => {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    })
  }, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
          <div className=" w-[400px] bg-[#FFFFDD] mx-6 sm:mx-0 rounded-md" key={i}>
            <div className="h-[60px] flex items-center justify-center font-bold text-lg">{movie.title}</div>
            <img src={`${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
            <div className="italic text-[20px] ">release: {movie.release_date}</div>
            <div className="text-[#FE0000] font-bold text-lg underline">{movie.vote_average}</div>
          </div>
      )
    })
  }

const search = async (q) => {
  if(q.length > 3) {
    const query = await searchMovie(q)
    setPopularMovies(query.results)
  }
}
console.log({popularMovies})
  return (
    <div className="text-center bg-gray-800">
      <header className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-white font-bold my-3 text-4xl font-inter">Nicholas Movie</h1>
        <input 
        placeholder="Search Your Movie..." 
        className="h-[45px] mb-[32px] font-bold text-[14px] p-[16px] outline-none rounded-[5px] w-[300px] md:w-[475px] "
        onChange={({target}) => search(target.value)}
        />
        <div className="w-full flex justify-center items-center gap-[20px] flex-wrap">
          <PopularMovieList />
        </div>
      </header>
    </div>
  )
}

export default App