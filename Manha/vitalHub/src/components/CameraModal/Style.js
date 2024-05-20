import styled from "styled-components/native";

export const CameraContent = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.60);
`;

export const ModalContent = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ViewOptions = styled.View`
  width: 100%;
  height: 16%;
  padding: 15px 20px;
  background-color: rgba(0, 0, 0, 0.30);

  gap: 50px;
  flex-direction: row;
  /* align-items: center; */
  justify-content: space-between;
`

export const Options = styled.TouchableOpacity`
  padding: 10px;
`

export const LastPhoto = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 5px;
`

export const CaptureView = styled.Image`
  width: 80%;
  height: 60%;
  border-radius: 10px;
`

export const CaptureOptions = styled.View`
  margin-top: 15px;
`

export const CancelButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  margin: 20px 30px;
  
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  
  border-radius: 50%;
  background-color: #bfe8eb;
`