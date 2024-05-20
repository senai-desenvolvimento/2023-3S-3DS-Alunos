import { useEffect, useState } from 'react'
import { ActivityIndicator, Modal } from 'react-native'

import moment from 'moment'
import api from '../../service/service'
import { handleCallNotifications } from '../../utils/Notifications'

import { PatientModal, ModalContent, ModalText } from './style'

import { Title } from '../Title/Style'
import { ButtonModal, ButtonSecondary } from '../Button/Style'
import { ButtonTitle, ButtonSecondaryTitle } from '../ButtonTitle/Style'


const CancellationModal = ({visible, setShowModalCancelar, consulta, setDataConsulta, navigation, ...rest}) => { 
  const [load, setLoad] = useState(false)

  async function CancelarConsulta(){
    setLoad(true);

    // Aplicando a alteracao
    // await api.put(`/Consultas/Status?consulta=${consulta.id}&status=975FBDD9-88FE-4382-AC69-495C267E1974`)
    await api.put(`/Consultas/Status?consulta=${consulta.id}&status=Cancelados`)
    .then( async () => {
      await handleCallNotifications

      setShowModalCancelar(false)

      setDataConsulta( moment() );

    }).catch( error => {
      console.log( error )
    });

    setLoad(false);
  }

  return (
    <Modal {...rest} visible={visible} transparent={true} animationType='fade'>
      <PatientModal>
        <ModalContent>
          <Title>Cancelar consulta</Title>

          <ModalText>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário,
            deseja mesmo cancelar essa consulta?</ModalText>

            {/* <ButtonModal onPress={handleCallNotifications} > */}
            <ButtonModal onPress={() => CancelarConsulta()} >
              {
                load
                  ? <ActivityIndicator color={'#fbfbfb'}/>
                  : <ButtonTitle>Confirmar</ButtonTitle>
              }
            </ButtonModal>

            <ButtonSecondary onPress={ () => setShowModalCancelar(false)}>
              <ButtonSecondaryTitle>
                Cancelar
              </ButtonSecondaryTitle>
            </ButtonSecondary>
        </ModalContent>
      </PatientModal>
    </Modal>
  )
}

export default CancellationModal