import styled from "styled-components/native";

export const Button = styled.TouchableOpacity`
  width: 90%;
  height: 44px;

  margin-top: 30px;
  align-self: center;
  justify-content: center;

  background-color: #496bba;
  border-radius: 5px;
  border-color: #00bfa6;
`;

export const ButtonGoogle = styled(Button)`
  gap: 20px;

  margin-top: 15px;
  flex-direction: row;
  align-items: center;

  background-color: #fafafa;
  border-color: #496bba;
  border-width: 1px;
`;

export const ButtonSecondary = styled(Button)`
  background-color: transparent;
  border: none;
  margin-bottom: 30px ;
`;

export const ButtonModal = styled(Button)`
  width: 285px;
`;

export const ButtonSendImage = styled(Button)`
  width: 172px;

  margin-top: 10px;
  align-items: center;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  background-color: #49b3ba;
  border-color: none;
`;

export const ButtonCancel = styled.TouchableOpacity`
  width: 148px;
  height: 44px;

  margin-top: 10px;
  align-self: center;
  justify-content: center;
  align-items: center;

  font-size: 12px;
  font-family: "MontserratAlternates_500Medium";
`;

export const ButtonLogout = styled(Button)`
  background-color: #c1c1c1;
  width: 40%;
  margin-bottom: 30px;
`;

export const ButtonEdit = styled(Button)`
  background-color: #c1c1c1;
`