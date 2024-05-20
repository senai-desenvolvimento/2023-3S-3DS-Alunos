//import libs
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import screens
import Login from "./src/screens/Login/Login";
import CriarConta from "./src/screens/CriarConta/CriarConta";
import RecuperarSenha from "./src/screens/RecuperarSenha/RecuperarSenha";

// Solitando a permissao de acesso a localizacao
import {
  requestForegroundPermissionsAsync, // Solicita a permissao de localizacao
} from "expo-location";

// Solicitar a permissao de acesso a camera
import { Camera } from "expo-camera";

// Solicitar os acessos a galeria
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

//import fonts
import {
  useFonts,
  MontserratAlternates_600SemiBold,
  MontserratAlternates_700Bold,
  MontserratAlternates_500Medium,
} from "@expo-google-fonts/montserrat-alternates";

import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";

import RedefinirSenha from "./src/screens/RedefinirSenha/RedefinirSenha";
import VerifiqueSeuEmail from "./src/screens/VerifiqueSeuEmail/VerifiqueSeuEmail";
//import Navegacao from "./src/screens/Navegacao/Navegacao";
import MedicoProntuario from "./src/screens/MedicoProntuario/MedicoProntuario";
import PerfilPaciente from "./src/screens/PerfilPaciente/PerfilPaciente";
import LocalConsulta from "./src/screens/LocalConsulta/LocalConsulta";
import PacienteProntuario from "./src/screens/PacienteProntuario/PacienteProntuario";
import SelecionarMedico from "./src/screens/SelecionarMedico/SelecionarMedico";
import SelecionarClinica from "./src/screens/SelecionarClinica/SelecionarClinica";
import Home from "./src/screens/Home/Home";
import Prontuario from './src/screens/Prontuario/Prontuario'
import SelecionarData from "./src/screens/SelecionarData/SelecionarData";
import { useEffect, useState } from "react";

import { Main } from "./src/screens/Main/Main";
import { StatusBar } from "react-native";

//StackNavigator
const Stack = createNativeStackNavigator();

//componente App
export default function App() {
  // Solicitar o acesso a localizacao
  async function requestLocation() {
    await requestForegroundPermissionsAsync();
  }

  // Solicitar o acesso a camera
  async function requestCamera() {
    await Camera.requestCameraPermissionsAsync();
  }

  // Solicitar o acesso a camera
  async function requestGaleria() {
    await MediaLibrary.requestPermissionsAsync();

    await ImagePicker.requestMediaLibraryPermissionsAsync();
  }

  //effects
  useEffect(() => {
    // Solicitando o acesso a localizacao
    requestLocation();

    // Solicitando o acesso a camera
    requestCamera();

    // Solicitando o acesso a galeria
    requestGaleria();
  }, []);

  //fonts loaded
  const [fontsLoaded, fontsError] = useFonts({
    MontserratAlternates_600SemiBold,
    MontserratAlternates_700Bold,
    MontserratAlternates_500Medium,
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
  });

  if (!fontsLoaded && !fontsError) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen
            name="Navegacao"
            component={Navegacao}
            options={{ title: "Navegacao" }}
          /> */}

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />

          <Stack.Screen name="Main" component={Main} />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Home" }}
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
            name="Selecionar clinica"
            component={SelecionarClinica}
            options={{ title: "Selecionar Clinica" }}
          />

          <Stack.Screen
            name="Selecionar medico"
            component={SelecionarMedico}
            options={{ title: "Selecionar medico" }}
          />

          <Stack.Screen
            name="Calendar"
            component={SelecionarData}
            options={{ title: "Calendar" }}
          />

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
            name="Verifique seu e-mail"
            component={VerifiqueSeuEmail}
            options={{ title: "Verifique seu e-mail" }}
          />

          <Stack.Screen
            name="Local consulta"
            component={LocalConsulta}
            options={{ title: "Local consulta" }}
          />

          <Stack.Screen
            name="Perfil paciente"
            component={PerfilPaciente}
            options={{ title: "Perfil paciente" }}
          />

          <Stack.Screen
            name="Prontuario"
            component={Prontuario}
            options={{ title: "Prontuario" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
