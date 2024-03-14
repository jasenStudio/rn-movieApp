import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieCastResponse } from "../../../infrastructure/interfaces/movie-cast";
import { castMapper } from "../../../infrastructure/mappers/cast.mapper";
import { Cast } from "../../entities/cast.entity";

export const getMovieCastUseCase =  async ( 
    fetcher:HttpAdapter
    ,movieId:number
    ):Promise<Cast[]> => {
   try {

    const { cast } = await fetcher.get<MovieCastResponse>(`/${movieId}/credits`);
    const actors = cast.map( (actor) => castMapper.fromMovieDBCastToEntity(actor) );
  
     return actors 
   } catch (error) {
    throw new Error(`Cannot get movie cast ${movieId}`);
   }
}