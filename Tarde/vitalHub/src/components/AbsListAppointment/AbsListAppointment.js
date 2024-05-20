import { ButtonTabsStyle, ButtonTextStyle } from "./style";

// componente conjunto do botão recebendo as props
const AbsListAppointment = ({ textButton, clickButton = false, onPress }) => {
  return (
    <ButtonTabsStyle clickButton={clickButton} onPress={onPress}>
      <ButtonTextStyle clickButton={clickButton}>{textButton}</ButtonTextStyle>
    </ButtonTabsStyle>
  );
};

export default AbsListAppointment;
