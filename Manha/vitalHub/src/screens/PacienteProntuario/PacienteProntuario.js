import { ContainerFlex, ContainerImage, ContainerScroll } from "../../components/Container/Style";
import { ProfileImageLarge } from "../../components/ProfileImage/Style";
import { Title, Subtitle } from "../../components/Title/Style";
import { Label } from "../../components/Label/Style";
import { Input, InputLarge } from "../../components/Input/Style";
import { ButtonCancel, ButtonSecondary, ButtonSendImage } from "../../components/Button/Style";
import { ButtonCameraTitle, ButtonCancelTitle, ButtonSecondaryTitle } from "../../components/ButtonTitle/Style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Linha } from "./Style";
import { Content } from "../MedicoProntuario/Style";

const PacienteProntuario = () => {
  return (
    <ContainerScroll>
      <Content>
        <ContainerImage>
          <ProfileImageLarge
            source={require("../../../assets/profileLargeDoctor.png")}
          />
        </ContainerImage>

        <Title>Dr. Cláudio</Title>

        <Subtitle>Clínico Geral CRM-15286</Subtitle>

        <Label>Descrição da consulta</Label>
        <InputLarge placeholder="Descrição da consulta" />

        <Label>Diagnóstico do paciente</Label>
        <Input placeholder="Diagnóstico do paciente" />

        <Label>Prescrição médica</Label>
        <InputLarge placeholder="Prescrição médica" />

        {/* implementar a captura de câmera - npm install react-native-camera ??? */}
        <Label>Exames médicos</Label>
        <InputLarge placeholder="Nenhuma foto informada" />

        <ContainerFlex>
          <ButtonSendImage>
            <MaterialCommunityIcons
              name="camera-plus-outline"
              size={24}
              color="#FFFFFF"
            />
            <ButtonCameraTitle>Enviar</ButtonCameraTitle>
          </ButtonSendImage>

          <ButtonCancel>
            <ButtonCancelTitle>Cancelar</ButtonCancelTitle>
          </ButtonCancel>
        </ContainerFlex>

        <Linha />

        <InputLarge placeholder="Descrição do exame" />

        <ButtonSecondary>
          <ButtonSecondaryTitle>Voltar</ButtonSecondaryTitle>
        </ButtonSecondary>
      </Content>
    </ContainerScroll>
  );
};

export default PacienteProntuario;
