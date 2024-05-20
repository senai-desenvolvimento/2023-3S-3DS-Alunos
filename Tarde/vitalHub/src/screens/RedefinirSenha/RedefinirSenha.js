//#region - Implementações a serem consumidas
import { useState, useRef } from "react";
import api from "../../service/service";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { ShowError, VerifyInput } from "../../utils/VerifyInput";

import { Title, Subtitle, TitleError } from "../../components/Title/Style";
import { Logo } from "../../components/Logo/Style";
import { Container, ContainerLogo } from "../../components/Container/Style";
import { Input } from "../../components/Input/Style";
import { Button } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { ContentLogo } from "../RecuperarSenha/Style";
//#endregion

const RedefinirSenha = ({navigation, route}) => {
  //#region - Declaração de estados da página
  const [load, setLoad] = useState(false);

  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  //#endregion

  async function AlterarSenha(){
    if( senha === confirmar ){
      await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
        senhaNova : senha
      }).then( () => {
        navigation.replace("Login")
      }).catch(error => {
        console.log(error)
      });

    }else{
      alert("Senha incompatíveis")
    }
  }

  return (
    <Container>
      <ContainerLogo>
        <ContentLogo onPress={() => navigation.replace("Verifique seu e-mail", { emailRecuperacao : route.params.emailRecuperacao })}>
          <AntDesign name="arrowleft" size={30} color="#34898F"/>
        </ContentLogo>

        <Logo source={require("../../../assets/logo.png")} />
      </ContainerLogo>

      <Title>Redefinir senha</Title>

      <Subtitle>Insira e confirme a sua nova senha.</Subtitle>

      <Input
        secureTextEntry={true}
        placeholder="Nova Senha"

        value={senha}
        onChangeText={(txt) => setSenha(txt)}
      />

      <Input
        secureTextEntry={true}
        placeholder="Confirme nova senha"

        value={confirmar}
        onChangeText={(txt) => setConfirmar(txt)}
      />
      
      <Button disabled={load} onPress={() => AlterarSenha()}>
        {
          !load
            ? <ButtonTitle>Confirmar nova senha</ButtonTitle>
            : <ActivityIndicator color={'#fbfbfb'}/>
        }
      </Button>
    </Container>
  );
};

export default RedefinirSenha;
