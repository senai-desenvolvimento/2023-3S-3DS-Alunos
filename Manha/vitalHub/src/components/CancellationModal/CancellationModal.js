import { useEffect, useState } from 'react'
import { ButtonModal, ButtonSecondary } from '../Button/Style'
import { ButtonTitle, ButtonSecondaryTitle } from '../ButtonTitle/Style'
import { Title } from '../Title/Style'

import { PatientModal, ModalContent, ModalText } from './style'
import { Modal } from 'react-native'

const CancellationModal = ({visible, setShowModalCancelar, ...rest}) => {  
  return (
    <Modal {...rest} visible={visible} transparent={true} animationType='fade'>
      <PatientModal>
        <ModalContent>
          <Title>Cancelar consulta</Title>

          <ModalText>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário,
            deseja mesmo cancelar essa consulta?</ModalText>

            <ButtonModal>
              <ButtonTitle>Confirmar</ButtonTitle>
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