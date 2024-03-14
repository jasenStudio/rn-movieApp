import { useEffect, useState } from "react"
import * as useCase from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';
import { FullMovie } from "../../core/entities/movie.entity";
import { Cast } from "../../core/entities/cast.entity";


export const useSingleMovie = (movieId:number) => {
//  getMovieCastUseCase 

const [isLoading, setIsloading] = useState(true);
const [movie, setMovie] = useState<FullMovie>();
const [cast, setCast] = useState<Cast[]>();

useEffect(() => {
  loadMovie();
}, [movieId])

const loadMovie = async () => {

  setIsloading(true);

  const fullMoviePromise =  useCase.getMovieByIdUseCase(movieDBFetcher,movieId);
  const castPromise      =  useCase.getMovieCastUseCase(movieDBFetcher,movieId);

  const [fullMovie,castMovie] = await Promise.all([
    fullMoviePromise,
    castPromise
  ])

  setMovie(fullMovie);
  setCast(castMovie);

  setIsloading(false)


}

  return {
    isLoading,
    movie,
    cast
  }
}
