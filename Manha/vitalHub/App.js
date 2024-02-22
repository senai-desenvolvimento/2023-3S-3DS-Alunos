import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Navegacao } from "./src/screens/Navegacao/Navegacao";

import { Login } from "./src/screens/Login/Login";
import { Home } from "./src/screens/Home/Home";

import { CriarConta } from "./src/screens/CriarConta/CriarConta";
import { RedefinirSenha } from "./src/screens/RedefinirSenha/RedefinirSenha";
import { VerifiqueSeuEmail} from "./src/screens/VerifiqueSeuEmail/VerifiqueSeuEmail";
import { RecuperarSenha } from "./src/screens/RecuperarSenha/RecuperarSenha";

//instância do StackNavigator
const Stack = createNativeStackNavigator();

//import das fonts
import {
  useFonts,
  MontserratAlternates_600SemiBold,
  MontserratAlternates_500Medium,
  MontserratAlternates_700Bold,
} from "@expo-google-fonts/montserrat-alternates";

import {
  Quicksand_500Medium,
  Quicksand_400Regular,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_700Bold,
    Quicksand_500Medium,
    Quicksand_400Regular,
    Quicksand_600SemiBold,
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

        <Stack.Screen
          name="Recuperar Senha"
          component={RecuperarSenha}
          options={{ title: "Recuperar senha" }}
        />

        <Stack.Screen
          name="Verifique seu e-mail"
          component={VerifiqueSeuEmail}
          options={{ title: "Verifique seu e-mail" }}
        />

        <Stack.Screen
          name="Redefinir Senha"
          component={RedefinirSenha}
          options={{ title: "Redefinir senha" }}
        />

        <Stack.Screen
          name="Cadastro"
          component={CriarConta}
          options={{ title: "Criar conta" }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
