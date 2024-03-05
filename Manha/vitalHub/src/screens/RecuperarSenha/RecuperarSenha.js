import { Title, Subtitle } from "../../components/Title/Style";
import { Logo } from "../../components/Logo/Style";
import { Container, ContainerLogo } from "../../components/Container/Style";
import { Input } from "../../components/Input/Style";
import { Button } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { ContentLogo } from "./Style";
import { ButtonIconBack } from "../../components/ButtonIconBack/ButtonIconBack";

const RecuperarSenha = ({ navigation }) => {
  return (
    <Container>
      <ContainerLogo>
        <ContentLogo>
          <ButtonIconBack navigation={navigation} />
        </ContentLogo>
        <Logo source={require("../../../assets/logo.png")} />
      </ContainerLogo>

      <Title>Recuperar senha</Title>

      <Subtitle>
        Digite abaixo seu email cadastrado que enviaremos um link para
        recuperação de senha
      </Subtitle>

      <Input placeholder="Usuário ou E-mail" />

      <Button>
        <ButtonTitle>Continuar</ButtonTitle>
      </Button>
    </Container>
  );
};

export default RecuperarSenha;
