import styled from 'styled-components/native'

export const AppointmentContent = styled.View`
  flex: 1;
  /* width: 415px; */
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.60);
`

export const ModalContent = styled.View`
  padding: 30px 30px 10px;

  width: 335px;
  border-radius: 10px;
  background-color: #fff;

  align-items: center;
`

export const ModalImage = styled.Image`
  width: 285px;
  height: 180px;
  border-radius: 5px;

  margin-bottom: 20px;
`

export const RowTextModal = styled.View`
  gap: 20px;
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
`

export const TextModal = styled.Text`
  font-size: 14px;
  color : #5F5C6B;
`