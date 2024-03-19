import { Title, Subtitle } from "../../components/Title/Style";
import { Logo } from "../../components/Logo/Style";
import { Container, ContainerLogo } from "../../components/Container/Style";
import { Input } from "../../components/Input/Style";
import { Button } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { ContentLogo } from "../RecuperarSenha/Style";
import { ButtonIconCancel } from "../../components/ButtonIconCancel/ButtonIconCancel";

const RedefinirSenha = ({navigation}) => {
  return (
    <Container>
      <ContainerLogo>
        <ContentLogo>
          <ButtonIconCancel navigation={navigation}/>
        </ContentLogo>
        <Logo source={require("../../../assets/logo.png")} />
      </ContainerLogo>

      <Title>Redefinir senha</Title>

      <Subtitle>
        Insira e confirme a sua nova senha.
      </Subtitle>

      <Input placeholder="Nova Senha" secureTextEntry={true}/>
      <Input placeholder="Confirme nova senha" secureTextEntry={true}/>

      <Button>
        <ButtonTitle>Confirmar nova senha</ButtonTitle>
      </Button>
    </Container>
  );
};

export default RedefinirSenha;
