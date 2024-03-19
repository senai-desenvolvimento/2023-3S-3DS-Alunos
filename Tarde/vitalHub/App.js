//import libs
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import screens
import Login from "./src/screens/Login/Login";
import CriarConta from "./src/screens/CriarConta/CriarConta";
import RecuperarSenha from "./src/screens/RecuperarSenha/RecuperarSenha";

//import fonts
import {
  useFonts,
  MontserratAlternates_600SemiBold,
  MontserratAlternates_700Bold,
  MontserratAlternates_500Medium,
} from "@expo-google-fonts/montserrat-alternates";

import {
  Quicksand_300Light, Quicksand_400Regular,
  Quicksand_500Medium, Quicksand_600SemiBold
} from '@expo-google-fonts/quicksand'

import RedefinirSenha from "./src/screens/RedefinirSenha/RedefinirSenha";
import VerifiqueSeuEmail from "./src/screens/VerifiqueSeuEmail/VerifiqueSeuEmail";
import Navegacao from "./src/screens/Navegacao/Navegacao";
import MedicoProntuario from "./src/screens/MedicoProntuario/MedicoProntuario";
import PerfilPaciente from "./src/screens/PerfilPaciente/PerfilPaciente";
import LocalConsulta from "./src/screens/LocalConsulta/LocalConsulta";
import PacienteProntuario from "./src/screens/PacienteProntuario/PacienteProntuario";
import SelecionarMedico from "./src/screens/SelecionarMedico/SelecionarMedico";
import SelecionarClinica from "./src/screens/SelecionarClinica/SelecionarClinica";
import Home from "./src/screens/Home/Home";
import SelecionarData from "./src/screens/SelecionarData/SelecionarData";
import { Main } from "./src/screens/Main/Main";

//StackNavigator
const Stack = createNativeStackNavigator();

//component
export default function App() {
  //fonts loaded
  const [fontsLoaded, fontsError] = useFonts({
    MontserratAlternates_600SemiBold, MontserratAlternates_700Bold,
    MontserratAlternates_500Medium, Quicksand_300Light, Quicksand_400Regular,
    Quicksand_500Medium, Quicksand_600SemiBold
  });

  if (!fontsLoaded && !fontsError) {
    return null;
  } else {
    return (
      <NavigationContainer>
        
        <Stack.Navigator>

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />

          <Stack.Screen
            name="Main"
            component={Main}
          />
          
          {/* <Stack.Screen
            name="Navegacao"
            component={Navegacao}
            options={{ title: "Navegacao" }}
          /> */}

          <Stack.Screen
            name="Cadastro"
            component={CriarConta}
            options={{ title: "Criar conta" }}
          />

          <Stack.Screen
            name="Recuperar Senha"
            component={RecuperarSenha}
            options={{ title: "Recuperar senha" }}
          />

          <Stack.Screen
            name="Redefinir Senha"
            component={RedefinirSenha}
            options={{ title: "Recuperar senha" }}
          />

          <Stack.Screen
            name="Medico Prontuario"
            component={MedicoProntuario}
            options={{ title: "Medico Prontuario" }}
          />

          <Stack.Screen
            name="Paciente Prontuario"
            component={PacienteProntuario}
            options={{ title: "Paciente Prontuario" }}
          />

          <Stack.Screen
            name="Selecionar Medico"
            component={SelecionarMedico}
            options={{ title: "Selecionar Medico" }}
          />

          <Stack.Screen
            name="Paciente Perfil"
            component={PerfilPaciente}
            options={{ title: "Paciente Perfil" }}
          />

          <Stack.Screen
            name="Local Consulta"
            component={LocalConsulta}
            options={{ title: "Local Consulta" }}
          />

          <Stack.Screen
            name="Verifique seu e-mail"
            component={VerifiqueSeuEmail}
            options={{ title: "Verifique seu e-mail" }}
          />

          <Stack.Screen
            name="Selecionar clinica"
            component={SelecionarClinica}
            options={{ title: "Selecionar Clinica" }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Home", headerShown: false }}
          />

          <Stack.Screen
            name="Calendar"
            component={SelecionarData}
            options={{ title: "Calendar" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
