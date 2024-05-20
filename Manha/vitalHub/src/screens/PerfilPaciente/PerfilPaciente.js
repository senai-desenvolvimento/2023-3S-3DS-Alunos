//#region - Implementações dos recursos consumidos
import { useEffect, useState, useRef } from "react";
import { ActivityIndicator, KeyboardAvoidingView } from "react-native";

import moment from "moment";
import api from "../../service/service";
import { UseMask } from "../../utils/Formater";
import { userDecodeToken } from "../../utils/Auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { VerifyInput, ShowError } from "../../utils/VerifyInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Container,
  ContainerFlex,
  ContainerImage,
  ContainerScroll,
} from "../../components/Container/Style";
import { ContentInputSmall, ButtonCamera, ContainerLoad } from "./Style";

import { ProfileImageLarge } from "../../components/ProfileImage/Style";
import { Title, Subtitle, TitleError } from "../../components/Title/Style";
import { Button, ButtonLogout } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { Label, LabelSmall } from "../../components/Label/Style";
import { Input, InputSmall } from "../../components/Input/Style";

import CameraModal from "../../components/CameraModal/CameraModal";
//#endregion

const PerfilPaciente = ({ navigation, route }) => {
  //#region - Declaração de estados na página
  const [load, setLoad] = useState(false);
  const [viewFull, setViewFull] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileUpdate, setProfileUpdate] = useState(null);
  const [statusEdicao, setStatusEdicao] = useState(false);

  const createUserNavigation = ( route.params != undefined );
  const [uriCameraCapture, setUriCameraCapture] = useState(null)
  const [showCameraModal, setShowCameraModal] = useState(false);
  //#endregion

  useEffect(() => {
    console.log(uriCameraCapture);

    if(uriCameraCapture){
      AlterarFotoPerfil()
    }
  }, [uriCameraCapture])

  async function AlterarFotoPerfil(){
    const formData = new FormData();
    formData.append("Arquivo", {
      uri : uriCameraCapture,
      name : `image.${ uriCameraCapture.split(".")[1] }`,
      type : `image/${ uriCameraCapture.split(".")[1] }`
    })

    await api.put(`/Usuario/AlterarFotoPerfil?id=${profile.user}`, formData, {
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    }).then( async response => {
      await setProfileUpdate({
        ...profileUpdate,
        foto : uriCameraCapture
      })
    }).catch(error => {
      console.log(error)
    })
  }

  // Função para remover o token do async storage e voltar para a tela de Login
  async function removerLogin() {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  }

  // Função para carregar os dados do perfil inclusos dentro do token
  async function profileLoad() {
    const token = await userDecodeToken(true);

    if (token !== null) {
      await BuscarUsuario(token);
    }

    if( createUserNavigation ){
      setStatusEdicao( true )
    }
  }

  // Função para bsucar os dados do usuário logado
  async function BuscarUsuario(token) {
    const url = (token.role == "Medico" ? "Medicos" : "Pacientes");

    await api.get(`/${url}/BuscarPorId?id=${token.user}`)
      .then( response => {
        const responseData = response.data;

        // Formatando os dados para serem recebidos
        // dentro de uma copia dos dados originais
        let resultados = null;
        if (token.role === "Medico") {
          resultados = {
            ...token,
            ...responseData.endereco,
            ...responseData.especialidade,
            crm: responseData.crm
          };
        } else {
          resultados = {
            ...token,
            ...responseData.endereco,
            cpf: responseData.cpf,
            dataNascimento: moment(responseData.dataNascimento).format('DD/MM/YYYY')
          };
        }

        // Salvando as informacoes dentro do profile
        setProfile(resultados);
        setProfileUpdate(resultados);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Função para alterar os dados contidos no usuário
  async function AlterarPerfil() {
    const url = profile.role == "Medico" ? "Medicos" : "Pacientes";

    await api.put(`/${url}`, profileUpdate, {
      headers : {
        "Authorization" : `Bearer ${profile.token}`
      }
    }).then( async () => {
      // Mandando o email de verificacao para quando o usuário
      // terminar de preencher as informações
      if( createUserNavigation ){
        navigation.replace("Main");

      }else{
        await BuscarUsuario(profileUpdate);
      }

    }).catch(error => {
      console.log(error);
    })
  }

  // Carregar os dados contidos dentro do token
  useEffect(() => {
    profileLoad();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={20}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      {
        // presentando um load enquanto os dados são buscados
        profileUpdate ? (
          <ContainerScroll scrollEnabled={ !viewFull }>
            <ContainerImage viewFull={viewFull} onPress={() => setViewFull(!viewFull)}>
              {
                load
                  ? <ActivityIndicator />
                  : <ProfileImageLarge
                      source={{ uri: profileUpdate.foto }}
                      // source={require("../../../assets/nicolle.png")}
                      resizeMode={ viewFull ? "contain" : "cover" }/>
              }

              <ButtonCamera onPress={() => setShowCameraModal(true)}>
                <MaterialCommunityIcons name="camera-plus" size={20} color="#fbfbfb"/>
              </ButtonCamera>
            </ContainerImage>

            <Container>
              {
                createUserNavigation  ? (
                  <>
                    <Label>Nome completo</Label>
                    <Input
                      placeholder="Fulano da silva"
                      value={
                        statusEdicao
                          ? profileUpdate.name
                          : profile.name
                      }
                      onChangeText={(txt) =>
                        setProfileUpdate({
                          ...profileUpdate,
                          name: txt
                        })
                      }  
                    />

                    <Label>Email</Label>
                    <Input
                      placeholder="email@email.com"
                      value={
                        statusEdicao
                          ? profileUpdate.email
                          : profile.email
                      }
                      onChangeText={(txt) =>
                        setProfileUpdate({
                          ...profileUpdate,
                          email: moment(txt).isValid() && txt !== '' ? moment(txt).format('DD/MM/YYYY') : txt
                        })
                      }
                    />
                  </>
                ) : (
                  <>
                    <Title>{profile.name}</Title>

                    <Subtitle>
                      {profile.email}
                    </Subtitle>
                  </>
                )
              }

              {
                profile.role === "Medico" ? (
                  <>
                    <Label>Especialidade</Label>
                    <Input
                      editable={statusEdicao}
                      placeholder="especialidade"
                      value={
                        statusEdicao
                          ? profileUpdate.especialidade1
                          : profile.especialidade1
                      }
                      onChangeText={(txt) =>
                        setProfileUpdate({ ...profileUpdate, especialidade1: txt })
                      }
                    />

                    <Label>CRM</Label>
                    <Input
                      maxLength={9}
                      editable={statusEdicao}
                      placeholder="000****-*"

                      value={
                        statusEdicao
                          ? profileUpdate.crm
                          : UseMask("########-#", profile.crm)
                      }

                      onChangeText={(txt) =>
                        setProfileUpdate({ ...profileUpdate, crm: txt })
                      }
                    />
                  </>
                ) : (
                  <>
                    <Label>Data de nascimento</Label>
                    <Input
                      editable={statusEdicao}
                      placeholder="dd/mm/aaaa"
                      value={
                        statusEdicao
                          ? moment(profileUpdate.dataNascimento).isValid() && profileUpdate.dataNascimento !== '' ? moment(profileUpdate.dataNascimento).format('YYYY-MM-DD') : profileUpdate.dataNascimento
                          : profile.dataNascimento
                      }
                      onChangeText={(txt) =>
                        setProfileUpdate({
                          ...profileUpdate,
                          dataNascimento: moment(txt).isValid() && txt !== '' ? moment(txt).format('YYYY-MM-DD') : txt
                          // dataNascimento: moment(txt).isValid() && txt !== '' ? moment(txt).format('DD/MM/YYYY') : txt
                        })
                      }
                    />

                    <Label>CPF</Label>
                    <Input
                      maxLength={13}
                      editable={statusEdicao}
                      placeholder="000********"

                      value={
                        statusEdicao
                          ? profileUpdate.cpf
                          : UseMask("###.###.###-##", profile.cpf)
                      }
                      onChangeText={(txt) =>
                        setProfileUpdate({ ...profileUpdate, cpf: txt })
                      }
                    />
                  </>
                )
              }

              <Label>Endereço</Label>
              <Input
                editable={statusEdicao}
                placeholder="Rua de exemplo"
                value={
                  statusEdicao
                    ? profileUpdate.logradouro
                    : `${profile.logradouro}`
                }
                onChangeText={(txt) =>
                  setProfileUpdate({ ...profileUpdate, logradouro: txt })
                }
              />

              <Label>Cidade</Label>
              <Input
                editable={statusEdicao}
                placeholder="Cidade"
                value={
                  statusEdicao
                    ? profileUpdate.cidade
                    : `${profile.cidade}`
                }
                onChangeText={(txt) =>
                  setProfileUpdate({ ...profileUpdate, cidade: txt })
                }
              />

              <ContainerFlex>
                <ContentInputSmall>
                  <LabelSmall>Número</LabelSmall>
                  <InputSmall
                    editable={statusEdicao}
                    placeholder="2324"
                    value={
                      statusEdicao
                        ? profileUpdate.numero
                            ? `${ profileUpdate.numero }`
                            : ''
                        : profile.numero
                            ? `${profile.numero}`
                            : ''
                    }
                    onChangeText={(txt) =>
                      setProfileUpdate({ ...profileUpdate, numero: txt })
                    }
                  />
                </ContentInputSmall>

                <ContentInputSmall>
                  <LabelSmall>Cep</LabelSmall>
                  <InputSmall
                    editable={statusEdicao}
                    placeholder="0****-**8"

                    value={
                      statusEdicao
                        ? profileUpdate.cep
                        : UseMask("#####-###", profile.cep)
                    }

                    onChangeText={(txt) =>
                      setProfileUpdate({ ...profileUpdate, cep: txt })
                    }
                  />
                </ContentInputSmall>
              </ContainerFlex>
              
              <Button onPress={() => setStatusEdicao && AlterarPerfil()}>
                <ButtonTitle>Salvar</ButtonTitle>
              </Button>

              {!createUserNavigation && (
                <>
                  <Button onPress={() => setStatusEdicao(!statusEdicao)}>
                    <ButtonTitle>
                      {statusEdicao ? "Cancelar" : "Editar"}
                    </ButtonTitle>
                  </Button>
                  <ButtonLogout
                    onPress={() => {
                      removerLogin();
                    }}
                  >
                    <ButtonTitle>Sair do app</ButtonTitle>
                  </ButtonLogout>
                </>
              )}
            </Container>
          </ContainerScroll>
        ) : (
          <ContainerLoad>
            <ActivityIndicator />
          </ContainerLoad>
        )
      }

      {/* Carregando o modal de alteração da foto */}
      <CameraModal
        getMediaLibrary={true}
        visible={showCameraModal}
        setUriCameraCapture={setUriCameraCapture}
        setShowCameraModal={setShowCameraModal}
      />
    </KeyboardAvoidingView>
  );
};

export default PerfilPaciente;
