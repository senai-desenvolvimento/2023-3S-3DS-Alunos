import { Modal } from "react-native";
import { AppointmentContent, ModalContent, ModalImage, RowTextModal, TextModal } from "./Style";
import { Title } from "../Title/Style";
import { ButtonCancel, ButtonModal, ButtonSecondaryTitle, ButtonTitle } from "../Button/Style";

export const AppointmentModal = ({navigation, visible, setShowModalAppointment,typeProfile = 'paciente', ...rest}) => {
    return ( 
      <Modal {...rest} visible={visible} transparent={true} animationType='fade'>
        <AppointmentContent>
          <ModalContent>
            <ModalImage source={{ uri: "https://github.com/ojuaum1.png" }} />
  
            <Title>João</Title>
  
            <RowTextModal>
              <TextModal>45 anos</TextModal>
  
              <TextModal>joão.oliveira@gmail.com</TextModal>
            </RowTextModal>
  
            <ButtonModal onPress={() => {
              setShowModalAppointment(false)
            }}>
              <ButtonTitle>Prontuário </ButtonTitle>
            </ButtonModal>
  
            <ButtonCancel onPress={() => setShowModalAppointment(false)}>
              <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
            </ButtonCancel>
          </ModalContent>
        </AppointmentContent>
      </Modal>
    );
  };