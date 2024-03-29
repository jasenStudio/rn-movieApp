import { useRoute } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { View, Text } from "react-native"
import { RootStackParams } from "../../navigation/StackNavigator"
import { useSingleMovie } from "../../hooks/useSingleMovie"
import { MovieHeader } from "../../components/movie/MovieHeader"
import { MovieDetails } from "../../components/movie/MovieDetail"
import { ScrollView } from "react-native-gesture-handler"
import { FullScreenLoader } from "../../components/loaders/FullScreen"

interface Props extends StackScreenProps<RootStackParams,'Details'>{}

export const DetailScreen = ({route}:Props) => {

  const {movieId} = route.params
  const { movie, isLoading,cast } = useSingleMovie(movieId);

  if(isLoading){
    return <FullScreenLoader />
  }

  return (
    <ScrollView>
     <MovieHeader 
      title={movie!.title}
      poster={movie!.poster}
      originalTitle={movie!.originalTitle} />

      <MovieDetails 
      movie={movie!}
      cast={cast!}
      />
    </ScrollView>
  )
}
