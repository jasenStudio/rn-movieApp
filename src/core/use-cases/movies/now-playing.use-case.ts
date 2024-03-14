import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";


export const moviesNowPlayingUseCase = async ( fetcher:HttpAdapter):Promise<Movie[]> => {

  try {
    const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing');
// console.log(nowPlaying.results.map( MovieMapper.fromMovieDBResultToEntity ))
    let resultado = nowPlaying.results.map( result => MovieMapper.fromMovieDBResultToEntity(result) )
    return resultado

  } catch (error) {
    throw new Error('Error fetching movies = now playing')
  }

}