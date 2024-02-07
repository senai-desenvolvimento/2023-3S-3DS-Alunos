import { Button, ButtonGoogle } from "../../components/Button/Style";
import {
  ButtonTitle,
  ButtonTitleGoogle,
} from "../../components/ButtonTitle/Style";
import { Container } from "../../components/Container/Style";
import { Input } from "../../components/Input/Style";
import { LinkBold, LinkMedium } from "../../components/Links/Style";
import { Logo } from "../../components/Logo/Style";
import { Title } from "../../components/Title/Style";
import { AntDesign } from "@expo/vector-icons";
import { ContentAccount, TextAccount } from "./Style";

export const Login = () => {
  return (
    <Container>
      <Logo source={require("../../assets/logo.png")} />

      <Title>Entrar ou criar conta</Title>

      <Input placeholder="Usuário ou E-mail" />

      <Input placeholder="Senha" secureTextEntry />

      <LinkMedium>Esqueceu sua senha?</LinkMedium>

      <Button>
        <ButtonTitle>Entrar</ButtonTitle>
      </Button>

      <ButtonGoogle>
        <AntDesign name="google" size={18} color="#496bba" />
        <ButtonTitleGoogle>Entrar com Google</ButtonTitleGoogle>
      </ButtonGoogle>

      <ContentAccount>
        <TextAccount>
          Não tem conta? <LinkBold>Crie uma conta agora!</LinkBold>
        </TextAccount>
      </ContentAccount>
    </Container>
  );
};
