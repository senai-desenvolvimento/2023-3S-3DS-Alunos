import { useEffect, useState } from "react";
import moment from 'moment'

import CalendarComponent from "../../components/CalendarComponent/CalendarComponent";
import { Container } from "../../components/Container/Style";
import { TitleSelect } from "../../components/Title/Style";
import { Label } from "../../components/Label/Style";
import { Button } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { ButtonSecondary } from "../../components/Button/Style";
import { ButtonSecondaryTitle } from "../../components/ButtonTitle/Style";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import SelectInput from "../../components/SelectInput/SelectInput";

const SelecionarData = ({ navigation, route }) => {
  const [agendamento, setAgendamento] = useState(null);
  const [horaSelecionada, setHoraSelecionada] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [showModalConfirmation, setShowModalConfirmation] = useState(false);

  function handleContinue(){
    setAgendamento({
      ...route.params.agendamento,
      dataConsulta : `${dataSelecionada} ${horaSelecionada}`
    });

    setShowModalConfirmation(true)
  }

  return (
    <Container>
      <TitleSelect>Selecionar data</TitleSelect>
      <CalendarComponent
        setDataSelecionada={setDataSelecionada}
        dataSelecionada={dataSelecionada}
      />

      <Label>Selecione um horário disponível</Label>
      <SelectInput
        setHoraSelecionada={setHoraSelecionada}
      />

      <Button onPress={() => handleContinue()}>
        <ButtonTitle>
          Confirmar
        </ButtonTitle>
      </Button>

      <ButtonSecondary onPress={ () => navigation.replace("Main")}>
        <ButtonSecondaryTitle>
          Cancelar
        </ButtonSecondaryTitle>
      </ButtonSecondary>

      <ConfirmationModal
        navigation={navigation} //fazer posteriormente junto com a navegação
        agendamento={agendamento}

        visible={showModalConfirmation}
        setShowModalConfirmation={setShowModalConfirmation}
      />
    </Container>
  );
};

export default SelecionarData;