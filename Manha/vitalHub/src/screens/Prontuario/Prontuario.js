//#region - Importações dos recursos consumidos
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";

import moment from "moment";
import api from "../../service/service";
import { UseMask } from "../../utils/Formater";
import { userDecodeToken } from "../../utils/Auth";

import {
  ContentContainer,
  ContainerFlex,
  ContainerImage,
  ContainerScroll,
} from "../../components/Container/Style";
import { ProfileImageLarge } from "../../components/ProfileImage/Style";
import { Title, Subtitle } from "../../components/Title/Style";
import { Label } from "../../components/Label/Style";
import { Input, InputLarge } from "../../components/Input/Style";
import {
  ButtonCancel,
  ButtonSecondary,
  ButtonSendImage,
} from "../../components/Button/Style";
import {
  ButtonCameraTitle,
  ButtonCancelTitle,
  ButtonSecondaryTitle,
} from "../../components/ButtonTitle/Style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Linha, BoxView, BoxText, BoxViewImage } from "./Style";
import { Button, ButtonLogout } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";

import CameraModal from "../../components/CameraModal/CameraModal";
//#endregion

const Prontuario = ({ navigation, route }) => {
  //#region - Declaraçõws de estados da página
  const [load, setLoad] = useState(false);
  const [profile, setProfile] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [descricaoExame, setDescricaoExame] = useState('');

  const [prontuario, setProntuario] = useState(null);
  const [prontuarioUpdate, setProntuarioUpdate] = useState(null);
  
  const [statusEdicao, setStatusEdicao] = useState(false);
  const [uriCameraCapture, setUriCameraCapture] = useState(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  //#endregion

  useEffect(() => {
    profileLoad();
  }, []);

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      setProfile(token);

      await BuscarConsulta(route.params.consultaId, token.role);
    }
  }

  async function BuscarConsulta(consulta, role) {
    await api
      .get(`/Consultas/BuscarPorId?id=${consulta}`)
      .then( response => {
        // Percorrer os exames
        let exames = ''
        if( response.data.exames )
        {
          response.data.exames.map( (item) => {
            exames += item.descricao
            exames += "\n"
          });
        }

        setDescricaoExame(exames);
        setProntuario(response.data);
        setProntuarioUpdate(response.data);
        setUsuario(
          role === "Medico"
            ? response.data.paciente
            : response.data.medicoClinica.medico
        );
      }).catch((error) => {
        console.log(error);
      });
  }

  // Função para alterar os dados contidos no usuário
  async function AlterarProntuario() {
    await api.put(`/Consultas/Prontuario`, prontuarioUpdate, {
      headers : {
        "Authorization" : `Bearer ${profile.token}`
      }
    }).then( async () => {
      await BuscarConsulta(route.params.consultaId, profile.role)

    }).catch(error => {
      console.log(error);
    })
  }

  async function InserirExame(){
    const formData = new FormData();
    formData.append("ConsultaId", prontuarioUpdate.id);
    formData.append("Imagem", {
      uri : uriCameraCapture,
      name : `image.${uriCameraCapture.split('.').pop()}`,
      type : `image/${uriCameraCapture.split('.').pop()} `
    });

    await api.post(`/Exame/Cadastrar`, formData, {
      headers : {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      setDescricaoExame( descricaoExame + "\n" + response.data.descricao )

    }).catch(error => {
      console.log(error)
    })
  }

  // Inserir o exame no momento que uma foto nova é recebida
  useEffect(() => {
    if( uriCameraCapture ){
      InserirExame();
    }
  }, [uriCameraCapture])

  return (
    <ContainerScroll>
      {
        usuario ? (
          <ContentContainer>
            <ContainerImage>
              {
                usuario.idNavigation.foto
                  ? (
                    <ProfileImageLarge
                      source={{ uri : usuario.idNavigation.foto }}
                    />
                  ) : (
                    <ProfileImageLarge
                      source={require("../../../assets/profileLargeDoctor.png")}
                    />
                  )
              }
              
            </ContainerImage>

            <Title>{usuario.idNavigation.nome}</Title>

            <Subtitle>
              {
                profile.role === "Paciente"
                  ? `${usuario.especialidade.especialidade1} \t ${UseMask(
                      "########-#",
                      usuario.crm
                    )}`
                  : `${moment().diff(usuario.dataNascimento, "years")} anos \t ${
                      usuario.idNavigation.email
                    }`
              }
            </Subtitle>

            <Label>Descrição da consulta</Label>
            <InputLarge
              editable={profile.role === "Medico" && statusEdicao}
              placeholder="Descrição da consulta"

              value={
                statusEdicao
                  ? prontuarioUpdate.descricao
                  : prontuario.descricao
              }
              onChangeText={ (txt) => 
                setProntuarioUpdate({
                  ...prontuarioUpdate,
                  descricao : txt
                })
              }
            />

            <Label>Diagnóstico do paciente</Label>
            <Input
              editable={profile.role === "Medico" && statusEdicao}
              placeholder="Diagnóstico do paciente"

              value={
                statusEdicao
                  ? prontuarioUpdate.diagnostico
                  : prontuario.diagnostico
              }
              onChangeText={ (txt) => 
                setProntuarioUpdate({
                  ...prontuarioUpdate,
                  diagnostico : txt
                })
              }
            />

            <Label>Prescrição médica</Label>
            <InputLarge
              editable={profile.role === "Medico" && statusEdicao}
              placeholder="Prescrição médica"

              value={ prontuario.receita && (
                  statusEdicao
                    ? prontuarioUpdate.receita.medicamento
                    : prontuario.receita.medicamento
                )
              }
              onChangeText={ (txt) => 
                setProntuarioUpdate({
                  ...prontuarioUpdate,
                  receita : {
                    medicamento : txt
                  }
                })
              }
            />

            {
              profile.role === "Paciente" && (
              <>
                <Label>Exames médicos</Label>
                {
                  uriCameraCapture == null ? (
                    <BoxView>
                      {
                        load
                          ? <ActivityIndicator />
                          : (
                            <>
                              <MaterialCommunityIcons name="note-remove-outline" size={24} color={'#4E4B59'}/>

                              <BoxText>Nenhuma foto informada</BoxText>
                            </>
                          )
                        }
                    </BoxView>
                  ) : (
                    <BoxViewImage source={{ uri: uriCameraCapture }} />
                  )                
                }

                <ContainerFlex>
                  <ButtonSendImage onPress={() => setShowCameraModal(true)}>
                    <MaterialCommunityIcons
                      name="camera-plus-outline"
                      size={24}
                      color="#FFFFFF"
                    />
                    <ButtonCameraTitle>Enviar</ButtonCameraTitle>
                  </ButtonSendImage>

                  <ButtonCancel onPress={() => setUriCameraCapture(null)}>
                    <ButtonCancelTitle>Cancelar</ButtonCancelTitle>
                  </ButtonCancel>
                </ContainerFlex>
              </>
            )}

            {
              descricaoExame
                ? (
                  <>
                    <Linha />
                    <InputLarge 
                      // editable={profile.role === "Paciente"}
                      editable={false}
                      value={ descricaoExame }
                      placeholder="Descrição do exame"
                    />
                  </>
                ) : (
                  null
                )
            }

            <Button onPress={() => setStatusEdicao && AlterarProntuario()}>
              <ButtonTitle>Salvar</ButtonTitle>
            </Button>

            
            <Button onPress={() => setStatusEdicao(!statusEdicao)}>
              <ButtonTitle>
                {statusEdicao ? "Cancelar" : "Editar"}
              </ButtonTitle>
            </Button>

            <ButtonSecondary onPress={() => navigation.replace("Main")}>
              <ButtonSecondaryTitle>Voltar</ButtonSecondaryTitle>
            </ButtonSecondary>
          </ContentContainer>
        ) : (
          <ActivityIndicator />
        )
      }

      <CameraModal
        visible={showCameraModal}
        setUriCameraCapture={setUriCameraCapture}
        setShowCameraModal={setShowCameraModal}
      />
    </ContainerScroll>
  );
};

export default Prontuario;
