import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { TopRatedResponse} from "../../../infrastructure/interfaces/movie-db-upcoming.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";

export const moviesTopRatedUseCase =  async ( fetcher:HttpAdapter) => {

    try {
        const topRated = await fetcher.get<TopRatedResponse>('/top_rated');
        let resulttopRated = topRated.results.map( result => MovieMapper.fromMovieDBResultToEntity(result) )
        
        // return upComing.results.map( result => MovieMapper.fromMovieDBResultToEntity(result) )
        return resulttopRated
    } catch (error) {
        throw new Error('Error fetching movies = upComing')
    }
}