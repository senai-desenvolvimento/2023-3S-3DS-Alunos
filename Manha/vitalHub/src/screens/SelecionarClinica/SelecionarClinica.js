import { useEffect, useState } from "react";
import ClinicCards from "../../components/ClinicCard/ClinicCard";
import { Container } from "../../components/Container/Style";
import { TitleSelect } from "../../components/Title/Style";

import { ListComponent, ListComponentEmpty } from "../../components/List/List";
import { Button, ButtonSecondary } from "../../components/Button/Style";
import {
  ButtonSecondaryTitle,
  ButtonTitle,
} from "../../components/ButtonTitle/Style";
import api from "../../service/service";

const SelecionarClinica = ({ navigation, route }) => {
  const [clinica, setClinica] = useState(null);
  const [clinicas, setClinicas] = useState([]);

  async function ListarClinicas() {
    await api
      .get(
        `/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`
      )
      .then((response) => {
        setClinicas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleContinue(){
    navigation.replace("Selecionar medico", {
      agendamento : {
        ...route.params.agendamento, // Passando todas as informacoes contidas no route.params.agendamento
        ...clinica
      }
    });
  }
  
  useEffect(() => {
    ListarClinicas();
  }, []);

  return (
    // <Container enabled behavior={ Platform.OS === 'ios'? 'padding': null}>
    <Container>
      <TitleSelect>Selecionar clínica</TitleSelect>

      <ListComponent
        data={clinicas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClinicCards
            selected={clinica && clinica.clinicaId == item.id}

            clinica={item}
            setClinica={setClinica}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ListComponentEmpty>
            Nenhuma clínica encontrada...
          </ListComponentEmpty>
        )}
      />

      <Button onPress={() => handleContinue()}>
        <ButtonTitle>Continuar</ButtonTitle>
      </Button>

      <ButtonSecondary
        onPress={() => navigation.navigate("Main", { previousRoute: true })}
      >
        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
      </ButtonSecondary>
    </Container>
  );
};

export default SelecionarClinica;
