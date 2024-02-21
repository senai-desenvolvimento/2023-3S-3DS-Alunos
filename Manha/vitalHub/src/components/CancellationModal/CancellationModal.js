import { Modal } from "react-native";
import { Title } from "../Title/Style";
import { ButtonSecondary, ButtonSecondaryTitle } from "../Button/Style";

const CancellationModal = ({visible, setShowModalCancel, ...rest}) => {
    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <Title>Cancelar consulta</Title>

            <ButtonSecondary onPress={() => setShowModalCancel(false)}>
                <ButtonSecondaryTitle>
                    Cancelar
                </ButtonSecondaryTitle>
            </ButtonSecondary>
        </Modal>
    );
};

export default CancellationModal;