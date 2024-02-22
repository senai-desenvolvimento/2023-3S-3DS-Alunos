
import { AntDesign } from "@expo/vector-icons";
import { ContentLogo } from "./Style";
import { Container, ContainerLogo } from "../../components/Container/Style";
import { Logo } from "../../components/Logo/Style";
import { Subtitle, Title } from "../../components/Title/Style";
import { Input } from "../../components/Input/Style";
import { Button, ButtonTitle } from "../../components/Button/Style";

export const RecuperarSenha = () => {
  return (
    <Container>
      <ContainerLogo>
        <ContentLogo>
          <AntDesign
            name="arrowleft"
            size={30}
            color="#34898F"
            onPress={() => {}}
          />
        </ContentLogo>

        <Logo source={require("../../assets/logo.png")} />
      </ContainerLogo>

      <Title>Recuperar senha</Title>

      <Subtitle>
        Digite abaixo seu email cadastrado que enviaremos um link para
        recuperação de senha
      </Subtitle>

      <Input placeholder="Usuário ou E-mail" />

      <Button onPress={() => {}}>
        <ButtonTitle>Continuar</ButtonTitle>
      </Button>
    </Container>
  );
};