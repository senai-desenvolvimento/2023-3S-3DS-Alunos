import { ButtonTabsStyle, ButtonTextStyle } from './style'

const AbsListAppointment = ({ textButton, clickButton = false, onPress }) => {
  return (
    <ButtonTabsStyle clickButton={clickButton} onPress={onPress}>
      <ButtonTextStyle clickButton={clickButton}>{textButton}</ButtonTextStyle>
    </ButtonTabsStyle>
  );
};

export default AbsListAppointment;