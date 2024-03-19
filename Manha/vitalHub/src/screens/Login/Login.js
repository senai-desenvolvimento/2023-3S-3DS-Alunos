import { Container } from "../../components/Container/Style";
import { Logo } from "../../components/Logo/Style";
import { Title } from "../../components/Title/Style";
import { Input } from "../../components/Input/Style";
import { Button, ButtonGoogle } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { AntDesign } from "@expo/vector-icons";
import { ButtonTitleGoogle, ContentAccount, TextAccount } from "./Style";
import { LinkBold, LinkMedium } from "../../components/Link/Style";

import { useState } from "react";
import axios from "axios";

const Login = ({ navigation }) => {

  // Chamar a funcao de login
  async function Login() {
    navigation.navigate("Main")
  }

  return (
    <Container>
      <Logo source={require("../../../assets/logo.png")} />

      <Title>Entrar ou criar conta</Title>
      <Input
        placeholder="Usuário ou Email"
        // value={email}
        onChangeText={(txt) => setEmail(txt)}
      />
      <Input
        placeholder="Senha"
        secureTextEntry={true}
        // value={senha}
        onChangeText={(txt) => setSenha(txt)}
      />

      <LinkMedium>Esqueceu sua senha?</LinkMedium>

      <Button onPress={() => Login()}>
        <ButtonTitle>Entrar</ButtonTitle>
      </Button>

      <ButtonGoogle>
        <AntDesign name="google" size={20} color={"#496BBA"} />
        <ButtonTitleGoogle>Entrar com Google</ButtonTitleGoogle>
      </ButtonGoogle>

      <ContentAccount>
        <TextAccount>
          Não tem conta? <LinkBold>Crie uma conta agora!</LinkBold>{" "}
        </TextAccount>
      </ContentAccount>
    </Container>
  );
};

export default Login;
