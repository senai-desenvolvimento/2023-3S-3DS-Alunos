import styled from "styled-components/native";

export const ButtonTitle = styled.Text`
  text-align: center;

  font-size: 14px;
  color: #ffffff;
  text-transform: uppercase;
  font-family: "MontserratAlternates_700Bold";
`;

export const ButtonSecondaryTitle = styled(ButtonTitle)`
  text-transform: capitalize;
  text-decoration: underline;
  color: #344f8f;
`;

export const ButtonCameraTitle = styled(ButtonTitle)`
  text-align: center;

  color: #ffffff;
  text-transform: capitalize;
`;

export const ButtonCancelTitle = styled.Text`
  color: #c81d25;
`;
