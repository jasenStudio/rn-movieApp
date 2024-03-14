import { Text, View } from "react-native"
import { useMovie } from "../../hooks/useMovie"
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PosterCarousel } from "../../components/movies/PosterCarousel";
import { HorizontalCarousel } from "../../components/movies/HorizontalCarousel";
import { Movie } from '../../../core/entities/movie.entity';
import { FullScreenLoader } from "../../components/loaders/FullScreen";


export const HomeScreen = () => {


const { top } = useSafeAreaInsets();
const {isLoading,nowPlaying,popular,topRated,upComing,popularNextPage} = useMovie();

if(isLoading){
  return <FullScreenLoader />
}
 

  return (
    <ScrollView>
        <View style={{
          marginTop:top + 20,
          paddingBottom:30
        }}>
          {/* primaria */}
  <PosterCarousel movies={nowPlaying} />

  {/* popular */}
<HorizontalCarousel 
movies={popular} 
title="Populares" 
loadNextPage={ popularNextPage }

/>

{/* toprated */}
<HorizontalCarousel movies={topRated} title="Mejor Calificadas" />

<HorizontalCarousel movies={upComing} title="Proximamente" />

        </View>
    </ScrollView>
  )
}
