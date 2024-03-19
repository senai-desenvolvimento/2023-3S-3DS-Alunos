import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import moment from "moment";

import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [history, setHistory] = useState({})
  const [authenticated, setAuthenticated] = useState(false)
  const [biometricExist, setBiometricExist] = useState(false);

  async function CheckExistAuthenticates() {
    // Validar se o aparelho tem o acesso a biometria
    const compatible = await LocalAuthentication.hasHardwareAsync();

    setBiometricExist(compatible);

    // Consultar as validações existentes
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync()
    console.log( LocalAuthentication.AuthenticationType[ types[0] ])
  }

  async function handleAuthentication(){
    const biometric = await LocalAuthentication.isEnrolledAsync();

    // Validar se existe uma biometria cadastrada
    if( !biometric ) {
      return Alert.alert(
        "Falha ao logar",
        "Não foi encontrado nenhuma biometria cadastrada."
      )
    }

    // Caso exista ->
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage : 'Login com biometria'
    })

    setAuthenticated( auth.success )

    if( auth.success ){
      SetHistory()
    }
  }

  async function SetHistory(){
    const objAuth = {
      dateAuthenticate : moment().format("DD/MM/YYYY HH:mm:ss")
    }

    await AsyncStorage.setItem("authenticate", JSON.stringify( objAuth ))

    setHistory( objAuth )
  }

  async function GetHistory(){
    const objAuth = await AsyncStorage.getItem("authenticate")

    if( objAuth )
    {
      setHistory( JSON.parse( objAuth ) )
    }
  }

  useEffect(() => {
    CheckExistAuthenticates();

    GetHistory()
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {biometricExist
          ? "Seu dispositivo é compatível com a Biometria"
          : "Seu dispositivo não suporta o FaceId / Biometria"}
      </Text>

      <TouchableOpacity style={styles.btnAuth} onPress={ () => handleAuthentication() }>
        <Text style={styles.txtAuth}>
          Autenticar acesso
        </Text>
      </TouchableOpacity>

      <Text style={[styles.txtReturn, { color : authenticated ? 'green' : 'red' }]}>
        { authenticated ? 'Autenticado' : 'Não autenticado'}
      </Text>

      {
        history.dateAuthenticate

        ? <Text style={ styles.txtHistory }>Último acesso em  { history.dateAuthenticate }</Text>
        : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    lineHeight: 30,
    width: "70%",
  },
  btnAuth: {
    padding: 16,
    borderRadius: 15,
    margin: 20,
    backgroundColor : '#ff8800'
  },
  txtAuth : {
    color : '#FFF',
    fontSize : 20,
    fontWeight : 'bold'
  },
  txtReturn : {
    fontSize : 22,
    textAlign : 'center',
    marginTop : 50
  },
  txtHistory : {
    fontSize : 16,
    fontWeight : 'bold',
    color : '#858383',
    position : 'absolute',
    bottom : 120
  }
});
