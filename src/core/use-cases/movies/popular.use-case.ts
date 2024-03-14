import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { PopularResponse, TopRatedResponse} from "../../../infrastructure/interfaces/movie-db-upcoming.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";

interface Options {
    page?:number,
    limit?:number
}


export const moviesPopularUseCase =  async ( fetcher:HttpAdapter, options?:Options) => {

    try {
        const popular = await fetcher.get<PopularResponse>('/popular',{
            params:{
                page:options?.page ?? 1
            }
        });
        let resultPopular = popular.results.map( result => MovieMapper.fromMovieDBResultToEntity(result) )

        // return upComing.results.map( result => MovieMapper.fromMovieDBResultToEntity(result) )
        return resultPopular
    } catch (error) {
        throw new Error('Error fetching movies = upComing')
    }
}