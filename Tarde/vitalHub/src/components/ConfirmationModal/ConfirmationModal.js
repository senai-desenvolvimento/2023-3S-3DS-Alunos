import { useState, useEffect } from "react";
import { ActivityIndicator, Modal } from "react-native";

import moment from "moment";
import api from "../../service/service";

import {
  ConfirmationContent,
  ModalContent,
  ModalText,
  LabelModal,
  ValueModal,
} from "./Style";
import { Title } from "../Title/Style";
import { userDecodeToken } from '../../utils/Auth';
import { ButtonModal, ButtonSecondary } from "../Button/Style";
import { ButtonTitle, ButtonSecondaryTitle } from "../ButtonTitle/Style";

const ConfirmationModal = ({
  visible,
  navigation,
  setShowModalConfirmation,
  agendamento,
  ...rest
}) => {
  const [profile, setProfile] = useState(null)

  async function profileLoad(){
    const token = await userDecodeToken();
    console.log(token)

    if(token){
      setProfile(token)
    }
  }

  async function handleConfirm(){
    await api.post('/Consultas/Cadastrar', {
      ...agendamento,
      pacienteId : profile.user,
      situacaoId : 'FADB5B94-5EBE-4692-8DC2-14957A389AB0'
    }).then( async () => {
      await setShowModalConfirmation(false);

      navigation.replace("Main");

    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    profileLoad();
  }, [visible])

  return (
    <Modal
      {...rest}
      visible={visible}
      transparent={true}
      animationType="fade"
      animationOutTiming={0}
    >
      <ConfirmationContent onPress={() => setShowModalConfirmation(false)}>
        {
          agendamento
            ? (
              <ModalContent>
                <Title>Agendar consulta</Title>

                <ModalText>
                  Consulte os dados selecionados para a sua consulta
                </ModalText>

                <LabelModal>Data da consulta</LabelModal>
                <ValueModal>{ moment(agendamento.dataConsulta).format("DD/MM/YYYY HH:mm") }</ValueModal>

                <LabelModal>Médica(o) da consulta</LabelModal>
                <ValueModal>{ agendamento.medicoLabel }</ValueModal>
                <ValueModal>{ agendamento.medicoEspecialidade }</ValueModal>

                <LabelModal>Clínica da consulta</LabelModal>
                <ValueModal>{ agendamento.clinicaLabel }</ValueModal>

                <LabelModal>Local da consulta</LabelModal>
                <ValueModal>{ agendamento.localizacao }</ValueModal>

                <LabelModal>Tipo da consulta</LabelModal>
                <ValueModal>{ agendamento.prioridadeLabel }</ValueModal>

                <ButtonModal onPress={() => handleConfirm()}>
                  <ButtonTitle>Confirmar</ButtonTitle>
                </ButtonModal>

                <ButtonSecondary onPress={() => setShowModalConfirmation(false)}>
                  <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                </ButtonSecondary>
              </ModalContent>
            ) : (
              <ActivityIndicator />
            )
        }
        
      </ConfirmationContent>
    </Modal>
  );
};

export default ConfirmationModal;
