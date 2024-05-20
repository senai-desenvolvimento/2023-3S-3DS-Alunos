import styled, { css } from "styled-components/native";

export const Input = styled.TextInput.attrs({
  placeholderTextColor : '#34898F'
})`
  width: 90%;
  height: 55px;
  padding: 16px;
  margin-top: 15px;
  border-radius: 5px;
  
  ${ (props) => props.editable === false
    ? css`
      color : #5F5C6B;
      background-color: #F5F3F3;
      border: 2px solid #D9D9D9;
    `
    : css`
      color: #34898f;
      background-color: #FAFAFA;
      border: 2px solid #49b3ba;
  `}

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