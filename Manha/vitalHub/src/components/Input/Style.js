import styled, { css } from "styled-components/native";

export const Input = styled.TextInput.attrs({
  placeholderTextColor : '#34898F'
})`
  width: 90%;
  height: 55px;
  padding: 16px;
  margin-top: 15px;
  
  /* align-self: center;
  /* flex-direction: row; */
  /* justify-content: center; */
  
  color: #34898f;
  border-radius: 5px;
  background-color: #FAFAFA;
  border: 2px solid #49b3ba;

  font-family: "MontserratAlternates_600SemiBold";
`;

export const InputSmall = styled(Input)`
  width: 144px;
`;

export const InputLarge = styled(Input).attrs({
  multiline : true
})`
  height: 121px;
  text-align: justify;
`;

export const InputCode = styled(Input)`
  width: 65px;
  height: 62px;

  text-align: center;
  border-color: #49B3BA;
  font-size: 40px;
  margin-top: 20px;
`;

// Criando o fake input na pagina de selecionar agenda
export const InputCheckbox = styled.TouchableOpacity`
  border-radius: 5px;
  padding: 10px 20px;

  ${ props => props.optionSelected
    ? css`
      background-color: #49b3ba;
      border: 2px solid #fafafa;
    `
    : css`
      background-color: #FAFAFA;
      border: 2px solid #49b3ba;
    `
  }
`

export const TextInputCheckbox = styled.Text`
  font-size: 14px;
  color : #49b3ba;
  font-family: "MontserratAlternates_700Bold";

  ${ props => props.optionSelected
    ? css`
      color: #FAFAFA;
    `
    : css`
      color: #49b3ba;
    `
  }
`