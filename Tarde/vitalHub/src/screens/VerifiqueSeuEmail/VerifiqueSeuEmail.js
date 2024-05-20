//#region - Importações dos recursos consumidos
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import api from "../../service/service";

import { ContainerBox, EmailText } from "./Style";
import { Logo } from "../../components/Logo/Style";
import { ContentLogo } from "../RecuperarSenha/Style";
import { InputCode } from "../../components/Input/Style";
import { Title, Subtitle, TitleError } from "../../components/Title/Style";
import { Button, ButtonSecondary } from "../../components/Button/Style";
import { Container, ContainerLogo } from "../../components/Container/Style";
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/Style";
//#endregion

const VerifiqueSeuEmail = ({navigation, route}) => {
  //#region - Declaração de estados da página
  const [load, setLoad] = useState(false);
  const [codigo, setCodigo] = useState('');
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  //#endregion
  
  // Função para passar para o próximo campo
  const focusNext = (index) => {
    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Função para voltar para o campo anterior
  const focusPrev = (index) => {
    if (index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Carregando o focus dentro do primeiro campo
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  // Função para validar o código enviado no email
  async function ValidarCodigo(){
    setLoad(true);
    
    await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`)
    .then(() => {
      navigation.replace("Redefinir Senha", { emailRecuperacao : route.params.emailRecuperacao });

    }).catch(error => {
      console.log(error)
    });
    
    setLoad(false);
  }

  // Função para reenviar o código via email
  async function ReenviarEmail(){  
    await api.post(`/RecuperarSenha?email=${route.params.emailRecuperacao}`)
    .then(() => {
      alert("Codigo reenviado para o email!");

    }).catch(error => {
      console.log(error)
    });
  }

  return (
    <Container>
      <ContainerLogo>
        <ContentLogo onPress={() => navigation.replace("Recuperar Senha")}>
          <AntDesign name="arrowleft" size={30} color="#34898F" />
        </ContentLogo>

        <Logo source={require("../../../assets/logo.png")} />
      </ContainerLogo>

      <Title>Verifique seu e-mail</Title>
      <Subtitle>Digite o código de 4 dígitos enviado para <EmailText>{ route.params.emailRecuperacao }</EmailText> </Subtitle>

      <ContainerBox> 
        {[0, 1, 2, 3].map((index) => (
          <InputCode
            key={index}
            ref={inputRefs[index]}
            keyboardType="numeric"
            placeholder="0"
            maxLength={1}
            caretHidden={true}

            onChangeText={(text) => {
              if (text === '') {
                focusPrev(index);
                inputRefs[index].current.clear();

              } else {
                const newCodigo = [...codigo];
                newCodigo[index] = text;
                setCodigo(newCodigo.join(''));

                if (text.length === 1) {
                  focusNext(index);
                }
              }
            }}
          />
        ))}
      </ContainerBox>
      
      <Button disabled={load} onPress={() => ValidarCodigo()}>
        {!load ? <ButtonTitle>Entrar</ButtonTitle> : <ActivityIndicator />}
      </Button>

      <ButtonSecondary
        disabled={load}
        onPress={ReenviarEmail}
      >
        <ButtonSecondaryTitle>Reenviar código</ButtonSecondaryTitle>
      </ButtonSecondary>
    </Container>
  );
};

export default VerifiqueSeuEmail;
