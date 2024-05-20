import styled from 'styled-components/native'

export const ConfirmationContent = styled.TouchableOpacity.attrs({
  activeOpacity : 1
})`
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

export const ModalText = styled.Text`
  width: 270px;
  font-size: 16px;
  color: #5F5C6B ;
  line-height: 22px;

  text-align: center;
  margin-top: 10px;
`

export const LabelModal = styled.Text`
  font-size: 16px;
  color: #33303E;
  margin-top: 20px;
  align-self: flex-start;
  font-family: 'Quicksand_600SemiBold';
  `

export const ValueModal = styled.Text`
  font-size: 14px;
  color: #4E4B59;
  margin-top: 10px;
  align-self: flex-start;
  font-family: 'Quicksand_500Medium';
`