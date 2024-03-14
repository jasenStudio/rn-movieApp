import 'react-native-gesture-handler';

import { NavigationContainer } from "@react-navigation/native"
import { View, Text } from "react-native"
import { StackNavigator } from './presentations/navigation/StackNavigator';


export const App = () => {
  return (

    <NavigationContainer>
        <StackNavigator />
    </NavigationContainer>
  )
}
