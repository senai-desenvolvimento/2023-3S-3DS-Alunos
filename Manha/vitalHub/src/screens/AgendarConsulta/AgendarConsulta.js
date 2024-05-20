import { useEffect, useState } from "react";
import { ViewContainer, ModalContent, ViewOption } from "./styles";
import { KeyboardAvoidingView, Modal } from "react-native";

import { Title } from "../../components/Title/Style";
import { Label } from "../../components/Label/Style";
import {
  Input,
  InputCheckbox,
  TextInputCheckbox,
} from "../../components/Input/Style";
import { Button, ButtonSecondary } from "../../components/Button/Style";
import {
  ButtonSecondaryTitle,
  ButtonTitle,
} from "../../components/ButtonTitle/Style";

const nivelConsulta = [
  { id: '162B1BD3-79D2-4181-B649-6E7034B5987C', tipo: "Rotina", },
  { id: 'E4CAE554-78FF-41BC-9DA1-E2E027030329', tipo: "Exame" },
  { id: '68053607-0081-4769-9C70-0FD5D6F93CCA', tipo: "Urgência" },
];

const AgendarConsulta = ({
  navigation,
  visible = true,
  setShowModalAgendamento,
  ...rest
}) => {
  const [agendamento, setAgendamento] = useState(null);

  async function handleContinue(){
    await setShowModalAgendamento(false);

    navigation.replace("Selecionar clinica", { agendamento : agendamento })
  }

  return (
    <Modal
      {...rest}
      visible={visible}
      transparent={true}
      animationType="fade"
      animationOutTiming={0}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={"padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 500}
      >
        <ModalContent>
          <ViewContainer>
            <Title>Agendar Consulta</Title>

            <Label>Qual o nível da consulta</Label>
            <ViewOption>
              {nivelConsulta.map( (item, index) => {
                return (
                  <InputCheckbox
                    key={item.id}

                    onPress={ () => setAgendamento({
                      ...agendamento, // manter todas as informacoes existentes nesse state

                      prioridadeId : item.id,
                      prioridadeLabel : item.tipo
                    })}

                    optionSelected={
                      agendamento
                        ? agendamento.prioridadeId == item.id
                        : false
                    }
                  >
                    <TextInputCheckbox
                      optionSelected={
                        agendamento
                          ? agendamento.prioridadeId == item.id
                          : false
                      }
                    >
                      {item.tipo}
                    </TextInputCheckbox>
                  </InputCheckbox>
                );
              })}
            </ViewOption>

            <Label>Qual a localização desejada</Label>
            <Input
              placeholder="Informe a localização"

              value={ agendamento ? agendamento.localizacao : null }
              onChangeText={ (txt) => setAgendamento({
                ...agendamento, // Mantendo as informacoes dentro de agendamento
                localizacao : txt
              })}
            />

            <Button onPress={() => handleContinue()}>
              <ButtonTitle>Continuar</ButtonTitle>
            </Button>

            <ButtonSecondary onPress={(e) => setShowModalAgendamento(false)}>
              <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
            </ButtonSecondary>
          </ViewContainer>
        </ModalContent>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AgendarConsulta;
