import styled from "styled-components";

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#34898f'
})`
    width: 90% ;
    height: 53px ;
    padding: 16px;
    margin-top: 15px ;

    border: 2px solid #49b3ba ;
    border-radius: 5px;
    color: #34898f ;
    font-size:16px ;
    font-family: 'MontserratAlternates_600SemiBold';
`

export const InputCode = styled(Input)`
  width: 65px;
  height: 62px;

  text-align: center;
  border-color: #49B3BA;
  font-size: 40px;
  margin-top: 20px;
`;