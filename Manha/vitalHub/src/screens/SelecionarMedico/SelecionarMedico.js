import React, { useState, useEffect } from "react";
import { Container } from "../../components/Container/Style";
import MedicalCard from "../../components/MedicalCard/MedicalCard";
import { TitleSelect } from "../../components/Title/Style";
import { Button, ButtonSecondary } from "../../components/Button/Style";
import {
  ButtonSecondaryTitle,
  ButtonTitle,
} from "../../components/ButtonTitle/Style";
import { ListComponent, ListComponentEmpty } from "../../components/List/List";

import api from "../../service/service";

const SelecionarMedico = ({ navigation, route }) => {
  const [medico, setMedico] = useState(null);
  const [medicos, setMedicos] = useState([]);

  async function ListarMedicos() {
    await api
      .get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`)
      .then((response) => {
        // Listar os médicos
        setMedicos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleContinue(){
    navigation.replace("Calendar", {
      agendamento : {
        ...route.params.agendamento,
        ...medico
      }
    })
  }

  useEffect(() => {
    ListarMedicos();
  }, []);

  return (
    <Container>
      <TitleSelect>Selecionar médico(a)</TitleSelect>

      <ListComponent
        data={medicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicalCard
            selected={medico && medico.medicoClinicaId == item.id}
            setMedico={setMedico}
            medico={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ListComponentEmpty>
            Nenhum(a) médico(a) encontrado(a)...
          </ListComponentEmpty>
        )}
      />

      <Button onPress={() => handleContinue()}>
        <ButtonTitle>Continuar</ButtonTitle>
      </Button>

      <ButtonSecondary onPress={() => navigation.replace("Main")}>
        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
      </ButtonSecondary>
    </Container>
  );
};

export default SelecionarMedico;
