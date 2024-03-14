import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { UpComingResponse } from "../../../infrastructure/interfaces/movie-db-upcoming.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";

export const moviesUpComingUseCase =  async ( fetcher:HttpAdapter) => {

    try {
        const upComing = await fetcher.get<UpComingResponse>('/upcoming');
        let resultUpcoming = upComing.results.map( result => MovieMapper.fromMovieDBResultToEntity(result) )
        // console.log({data:resultUpcoming[1],upComing:'Up'})
        // return upComing.results.map( result => MovieMapper.fromMovieDBResultToEntity(result) )
        return resultUpcoming
    } catch (error) {
        throw new Error('Error fetching movies = upComing')
    }
}