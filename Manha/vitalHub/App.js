import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Navegacao } from "./src/screens/Navegacao/Navegacao";
import { Login } from "./src/screens/Login/Login";

//instância do StackNavigator
const Stack = createNativeStackNavigator();

//import das fonts
import {
  useFonts,
  MontserratAlternates_600SemiBold,
  MontserratAlternates_500Medium,
  MontserratAlternates_700Bold
} from "@expo-google-fonts/montserrat-alternates";

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_700Bold
  });

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    // envolve a estrutura da navegação
    <NavigationContainer>
      {/* componente para navegação */}
      <Stack.Navigator>
        {/* tela */}
        <Stack.Screen
          // nome da tela
          name="Navegacao"
          //componente que será chamado
          component={Navegacao}
          //título da tela
          options={{ title: "Navegação" }}
        />

        <Stack.Screen
          // nome da tela
          name="Login"
          //componente que será chamado
          component={Login}
          //título da tela
          options={{ title: "Login" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
