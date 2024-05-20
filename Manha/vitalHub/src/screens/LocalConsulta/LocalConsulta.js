import React, { useEffect, useState } from "react";
import { Container, ContainerFlex } from "../../components/Container/Style";
import { Title, Subtitle } from "../../components/Title/Style";
import { Label, LabelSmall } from "../../components/Label/Style";
import { Input, InputSmall } from "../../components/Input/Style";
import { ContentInputSmall } from "../PerfilPaciente/Style";

import { ButtonSecondary} from "../../components/Button/Style";
import { ButtonSecondaryTitle } from "../../components/ButtonTitle/Style";

import LocationAppointment from "../../components/LocationAppointment/LocationAppointment";

import { ContentAdress, ContentImage, MapImage } from "./Style";
import api from "../../service/service";
import { UseMask } from "../../utils/Formater";

const LocalConsulta = ({ navigation, route }) => {
  const [clinica, setClinica] = useState(null)

  async function BuscarClinica(){
    await api.get(`/Clinica/BuscarPorId?id=${route.params.clinica}`)
    .then(response => {
      setClinica(response.data);
    }).catch(error => {
      console.log(error)
    })
  }
  
  useEffect(() => {
    if( clinica == null )
    {
      BuscarClinica();
    }
  }, [clinica])

  return (
    <Container>
      { clinica != null && (
        <>
          <LocationAppointment 
            latitude={clinica.endereco.latitude}
            longitude={clinica.endereco.longitude}
          />

          <ContentAdress>
            <Title>{clinica.nomeFantasia}</Title>
            <Subtitle>{clinica.endereco.cidade}</Subtitle>

            <Label>Endereço</Label>
            <Input editable={false} value={clinica.endereco.logradouro} />

            <ContainerFlex>
              <ContentInputSmall>
                <LabelSmall>Número</LabelSmall>
                <InputSmall editable={false} value={`${clinica.endereco.numero}`} />
              </ContentInputSmall>

              <ContentInputSmall>
                <LabelSmall>Cep</LabelSmall>
                <InputSmall editable={false} value={ UseMask("#####-###", clinica.endereco.cep) } />
              </ContentInputSmall>
            </ContainerFlex>

            <ButtonSecondary onPress={() => navigation.replace("Main") }>
              <ButtonSecondaryTitle>Voltar</ButtonSecondaryTitle>
            </ButtonSecondary>
          </ContentAdress>
        </>
      )}
      
    </Container>
  );
};

export default LocalConsulta;
