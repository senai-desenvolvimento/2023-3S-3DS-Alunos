//#region - Importações dos recursos consumidos
import { useState, useRef } from "react";
import { ActivityIndicator } from "react-native";

import api from "../../service/service";
import { AntDesign } from "@expo/vector-icons";

import { ContentLogo } from "./Style";
import { Title, Subtitle, TitleError } from "../../components/Title/Style";
import { Logo } from "../../components/Logo/Style";
import { Container, ContainerLogo } from "../../components/Container/Style";
import { Input } from "../../components/Input/Style";
import { Button } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { ShowError, VerifyInput } from "../../utils/VerifyInput";
//#endregion

const RecuperarSenha = ({ navigation }) => {
  //#region - Declaração de estados da página
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  //#endregion

  // Função para enviar um email de verificação de email
  async function EnviarEmail(){
    setLoad(true);

    await api.post(`/RecuperarSenha?email=${email}`)
    .then(async () => {
      // Navegando para a tela de validação do código enviado
      navigation.replace("Verifique seu e-mail", { emailRecuperacao : email })

    }).catch(error => {
      console.log(error)
    });

    setLoad(false);
  }

  return (
    <Container>
      <ContainerLogo>
        <ContentLogo onPress={() => navigation.replace("Login")}>
          <AntDesign name="arrowleft" size={30} color="#34898F"/>
        </ContentLogo>

        <Logo source={require("../../../assets/logo.png")} />
      </ContainerLogo>

      <Title>Recuperar senha</Title>

      <Subtitle>
        Digite abaixo seu email cadastrado que enviaremos um link para
        recuperação de senha
      </Subtitle>

      <Input
        placeholder="Usuário ou E-mail"  

        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      
      <Button disabled={load} onPress={() => EnviarEmail()}>
        { !load 
          ? <ButtonTitle>Continuar</ButtonTitle>
          : <ActivityIndicator color={'#fbfbfb'}/>
        }
      </Button>
    </Container>
  );
};

export default RecuperarSenha;
