import { ContainerImage, ContainerScroll } from "../../components/Container/Style";
import { ProfileImageLarge } from "../../components/ProfileImage/Style";
import { Label } from "../../components/Label/Style";
import { Input, InputLarge } from "../../components/Input/Style";
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/Style";
import { Button, ButtonSecondary } from "../../components/Button/Style";
import { Title, Subtitle } from "../../components/Title/Style";
import { Content } from "./Style";

const MedicoProntuario = () => {
  return (
    <ContainerScroll>
      <Content>
        <ContainerImage>
          <ProfileImageLarge
            source={require("../../../assets/profileLargePatient.png")}
          />
        </ContainerImage>

        <Title>Richard Kosta</Title>

        <Subtitle>22 anos richard.kosta@gmail.com</Subtitle>

        <Label>Descrição da consulta</Label>
        <InputLarge placeholder="Descrição" />

        <Label>Diagnóstico do paciente</Label>
        <Input placeholder="Diagnóstico" />

        <Label>Prescrição médica</Label>
        <InputLarge placeholder="Prescrição médica" />

        <Button>
          <ButtonTitle>Salvar</ButtonTitle>
        </Button>

        <Button>
          <ButtonTitle>Editar</ButtonTitle>
        </Button>

        <ButtonSecondary>
          <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
        </ButtonSecondary>
      </Content>
    </ContainerScroll>
  );
};

export default MedicoProntuario;
