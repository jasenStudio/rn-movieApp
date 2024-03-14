import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDetailResponse } from "../../../infrastructure/interfaces/movie-db-detail.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { FullMovie } from "../../entities/movie.entity";


export const getMovieByIdUseCase  = async (
    fetcher:HttpAdapter,
    movieId:number)
    :Promise<FullMovie> => {

        try {
            const detailResponse = await fetcher.get<MovieDetailResponse>(`/${movieId}`);
            const fullMovie = MovieMapper.fromMovieDBtoEntity(detailResponse);
            return fullMovie
            // return fullmovie
            
        } catch (error) {
            throw new Error(`Cannot get movie by id: ${movieId}`);
        }
}