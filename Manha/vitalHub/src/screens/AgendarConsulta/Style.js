import styled from "styled-components/native";

export const ModalContent = styled.View`
  flex: 1;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ViewContainer = styled.View`
  height: 70%;
  width: 100%;
  bottom: 0px;
  z-index: 99;
  border-radius: 10px 10px 0px;
  padding-top: 30px;
  position: absolute;
  background-color: #fbfbfb;

  align-items: center;
`;

export const ViewOption = styled.View`
  margin-top: 10px;
  width: 80%;
  gap: 15px;

  flex-direction: row;
  justify-content: center;
`;
