import React from "react";
import { Container, ContainerFlex } from "../../components/Container/Style";

import { Title, Subtitle } from "../../components/Title/Style";
import { Label, LabelSmall } from "../../components/Label/Style";
import { Input, InputSmall } from "../../components/Input/Style";
import { ContentInputSmall } from "../PerfilPaciente/Style";

import { ContentImage, ContentLocale, MapImage } from "./Style";
import { ButtonSecondary } from "../../components/Button/Style";
import { ButtonSecondaryTitle } from "../../components/ButtonTitle/Style";

const LocalConsulta = ({ navigation }) => {
  return (
    <Container>
      <ContentImage>
        <MapImage source={require("../../../assets/map.png")} />
      </ContentImage>

      <ContentLocale>
        <Title>Clínica Natureh</Title>
        <Subtitle>São Paulo, SP</Subtitle>

        <Label>Endereço</Label>
        <Input editable={false} placeholder="Rua Vicenzo Silva, 987" />

        <ContainerFlex>
          <ContentInputSmall>
            <LabelSmall>Número</LabelSmall>
            <InputSmall editable={false} placeholder="578" />
          </ContentInputSmall>

          <ContentInputSmall>
            <LabelSmall>Bairro</LabelSmall>
            <InputSmall editable={false} placeholder="Moema-SP" />
          </ContentInputSmall>
        </ContainerFlex>
        <ButtonSecondary onPress={ () => navigation.replace("Main") } >
          <ButtonSecondaryTitle>Voltar</ButtonSecondaryTitle>
        </ButtonSecondary>
      </ContentLocale>
    </Container>
  );
};

export default LocalConsulta;
