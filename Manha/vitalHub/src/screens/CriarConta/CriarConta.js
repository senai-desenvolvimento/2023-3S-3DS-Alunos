//#region - Importações dos recursos consumidos
import { useState } from "react";
import { ActivityIndicator } from "react-native";

import api from "../../service/service";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container } from "../../components/Container/Style";
import { Logo } from "../../components/Logo/Style";
import { Title, Subtitle } from "../../components/Title/Style";
import { Input } from "../../components/Input/Style";
import { Button, ButtonSecondary } from "../../components/Button/Style";
import {
  ButtonSecondaryTitle,
  ButtonTitle,
} from "../../components/ButtonTitle/Style";
import { ShowError, VerifyInput } from "../../utils/VerifyInput";
//#endregion

const CriarConta = ({ navigation }) => {
  //#region - Declarações de estados da página
  const [load, setLoad] = useState(false);
  const [dadosUsuario, setDadosUsuario] = useState({});
  //#endregion

  async function handleCreate() {
    setLoad(true);

    // Verificar se as senhas estão corretas
    const form = new FormData()
    form.append("nome", dadosUsuario.nome)
    form.append("email", dadosUsuario.email)
    form.append("senha", dadosUsuario.senha)
    form.append("idTipoUsuario", "A27831D5-0D98-4479-8276-4EC1F16B7F48")

    await api.post("/Pacientes/SaveDirectory", form, {
      'Content-Type': 'application/json'
    })
    .then( async () => {      
      // Logando dentro do sistema para validar o token
      await api.post("/Login", {
        email : dadosUsuario.email,
        senha : dadosUsuario.senha
      }).then( async response => {
        await AsyncStorage.setItem("token", JSON.stringify(response.data));
        
        navigation.replace("Perfil paciente", { createUser: true });
      }).catch( error => {
        console.log( error )
      });
      
      setLoad(false);
    })
    .catch(error => {
      console.log(error)
    });
    
    setLoad(false);
  }
  
  return (
    <Container>
      <Logo source={require("../../../assets/logo.png")} />

      <Title>Criar Conta</Title>
      <Subtitle>
        Insira seu endereço de e-mail e senha para realizar seu cadastro.
      </Subtitle>

      <Input
        placeholder="Nome Completo"

        value={dadosUsuario.nome}
        onChangeText={(txt) => setDadosUsuario({ ...dadosUsuario, nome: txt })}
      />

      <Input
        placeholder="E-mail"

        keyboardType="email-address"
        value={dadosUsuario.email}
        onChangeText={(txt) => setDadosUsuario({ ...dadosUsuario, email: txt })}
      />

      <Input
        placeholder="Senha"

        secureTextEntry={true}
        value={dadosUsuario.senha}
        onChangeText={(txt) => setDadosUsuario({ ...dadosUsuario, senha: txt })}
      />

      <Input
        placeholder="Confirmar Senha"

        secureTextEntry={true}
        value={dadosUsuario.confirmarSenha}
        onChangeText={(txt) =>
          setDadosUsuario({ ...dadosUsuario, confirmarSenha: txt })
        }
      />

      <Button disabled={load} onPress={() => handleCreate()}>
        {
          load
            ? <ActivityIndicator color={'#fff'}/>
            : <ButtonTitle>Cadastrar</ButtonTitle>
        }
      </Button>

      <ButtonSecondary>
        <ButtonSecondaryTitle onPress={() => navigation.replace("Login")}>
          Cancelar
        </ButtonSecondaryTitle>
      </ButtonSecondary>
    </Container>
  );
};

export default CriarConta;
