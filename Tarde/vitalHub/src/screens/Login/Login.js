//#region - Importações dos recursos consumidos
import { useState } from "react";
import { ActivityIndicator } from "react-native";

import api from "../../service/service";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Logo } from "../../components/Logo/Style";
import { Title, TitleError } from "../../components/Title/Style";
import { Input } from "../../components/Input/Style";
import { Container } from "../../components/Container/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { LinkBold, LinkMedium } from "../../components/Link/Style";
import { Button, ButtonGoogle } from "../../components/Button/Style";
import { ButtonTitleGoogle, ContentAccount, TextAccount } from "./Style";
//#endregion

// componente login
const Login = ({ navigation }) => {
  //#region - Declaração de estados da página
  const [load, setLoad] = useState(false);
  
  const [email, setEmail] = useState("heitor.campos@gmail.com");
  const [senha, setSenha] = useState("paciente123"); 
  // const [email, setEmail] = useState("lucassilveira586@gmail.com");
  // const [senha, setSenha] = useState("12345"); 
  //#endregion    

  // função assíncrona de login
  async function Logar() {
    setLoad(true);

    // chamada para a api
    await api.post("/Login", {
      email: email,
      senha: senha,
    }).then( async response => {
      // obtendo o token transformando em string(Json) AsyncStorage só aceita strings
      await AsyncStorage.setItem("token", JSON.stringify(response.data));
  
      // após a autenticação(login) navega para a tela home
      navigation.replace("Main");

    }).catch(error => {
      console.log(error)
    });

    setLoad(false);
  }
  
  return (
    <Container>
      <Logo source={require("../../../assets/logo.png")} />

      <Title>Entrar ou criar conta</Title>
      <Input
        placeholder="Usuário ou Email"

        value={email}
        onChangeText={(txt) => setEmail(txt)}
      />
      
      <Input
        placeholder="Senha"
        secureTextEntry={true}

        value={senha}
        onChangeText={(txt) => setSenha(txt)}
      />

      <LinkMedium onPress={() => navigation.replace("Recuperar Senha")}>
        Esqueceu sua senha?
      </LinkMedium>
      
      <Button disabled={ load } onPress={() => Logar()} >
        {
          load
            ? <ActivityIndicator animating={true} color={'#fff'}/>
            : <ButtonTitle>Entrar</ButtonTitle>
        } 
      </Button>

      <ButtonGoogle>
        <AntDesign name="google" size={20} color={"#496BBA"} />
        <ButtonTitleGoogle>Entrar com Google</ButtonTitleGoogle>
      </ButtonGoogle>

      <ContentAccount>
        <TextAccount>
          Não tem conta?{" "}
          
          <LinkBold onPress={() => navigation.replace("Cadastro")}>
            Crie uma conta agora!
          </LinkBold>
        </TextAccount>
      </ContentAccount>
    </Container>
  );
};

export default Login;
