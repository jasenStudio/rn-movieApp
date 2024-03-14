import { useEffect, useState } from "react"
import { Movie } from "../../core/entities/movie.entity"

import * as useCase from '../../core/use-cases';

import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';
import { NowPlayingResponse } from '../../infrastructure/interfaces/movie-db.response';

let popularPage = 1;

export const useMovie = () => {

    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upComing, setUpComing] = useState<Movie[]>([]);


    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

    initialLoad();

    }, [])

    const initialLoad = async () => {

        const NowPlayingPromise =  useCase.moviesNowPlayingUseCase(movieDBFetcher)
        const PopularPromise =      useCase.moviesUpComingUseCase(movieDBFetcher)
        const topRatedPromise =   useCase.moviesTopRatedUseCase(movieDBFetcher)
        const UpcomingPromise =     useCase.moviesPopularUseCase(movieDBFetcher)

        const [
            NowPlayingMovies,
            PopularMovies,
            TopRatedMovies,
            UpComingMovies
        ] =  
            await Promise.all([
             NowPlayingPromise,
             PopularPromise,
             topRatedPromise,
            UpcomingPromise
        ])
        //const nowPlayingMovies = await useCase.moviesNowPlayingUseCase(movieDBFetcher)
        setNowPlaying(NowPlayingMovies);
        setPopular(PopularMovies);
        setTopRated(TopRatedMovies);
        setUpComing(UpComingMovies);

        setIsLoading(false)
    }
    

        return {
            nowPlaying,
            popular,
            upComing,
            topRated,
            isLoading,

            //metodos
            popularNextPage: async () => {
                popularPage++;
                const popularMovies = await useCase.moviesPopularUseCase(movieDBFetcher,{
                    page:popularPage
                })

                setPopular( prev => [...prev,...popularMovies])
            }
        }
}
