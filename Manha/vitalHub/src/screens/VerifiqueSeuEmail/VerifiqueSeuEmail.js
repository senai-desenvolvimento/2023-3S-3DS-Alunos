import { Container, ContainerLogo } from "../../components/Container/Style";
import { Logo } from "../../components/Logo/Style";
import { Title, Subtitle } from "../../components/Title/Style";
import { ContainerBox, EmailText } from "./Style";
import { Button, ButtonSecondary } from "../../components/Button/Style";
import {
  ButtonSecondaryTitle,
  ButtonTitle,
} from "../../components/ButtonTitle/Style";
import { InputCode } from "../../components/Input/Style";
import { ContentLogo } from "../RecuperarSenha/Style";

import { ButtonIconCancel } from "../../components/ButtonIconCancel/ButtonIconCancel";

const VerifiqueSeuEmail = ({navigation}) => {
  return (
    <Container>
      <ContainerLogo>
        <ContentLogo>
          <ButtonIconCancel navigation={navigation}/>
        </ContentLogo>
        <Logo source={require("../../../assets/logo.png")} />
      </ContainerLogo>

      <Title>Verifique seu e-mail</Title>

      <Subtitle>
        Digite o código de 4 dígitos enviado para{" "}
        <EmailText>username@email.com</EmailText>{" "}
      </Subtitle>

      <ContainerBox>
        <InputCode keyboardType="numeric" placeholder="0" maxLength={1} />
        <InputCode keyboardType="numeric" placeholder="0" maxLength={1} />
        <InputCode keyboardType="numeric" placeholder="0" maxLength={1} />
        <InputCode keyboardType="numeric" placeholder="0" maxLength={1} />
      </ContainerBox>

      <Button>
        <ButtonTitle>Entrar</ButtonTitle>
      </Button>

      <ButtonSecondary>
        <ButtonSecondaryTitle>Reenviar código</ButtonSecondaryTitle>
      </ButtonSecondary>
    </Container>
  );
};

export default VerifiqueSeuEmail;
