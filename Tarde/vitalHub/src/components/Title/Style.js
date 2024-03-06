import styled from "styled-components/native";

// Titulo principal das páginas
export const Title = styled.Text`
  align-self: center;

  font-size: 20px; 
  color: #33303e;
  font-family: "MontserratAlternates_600SemiBold";
`;

export const TitleSelect = styled(Title)`
  margin-top: 30px;
  margin-bottom: 35px ;
`

// Texto principal do app
export const Subtitle = styled.Text`
  width: 80%;
  color: #5f5c6b;  
  font-size: 16px;
  margin-top: 15px;

  align-self: center;
  text-align: center;
 
  font-family: "Quicksand_500Medium";
`;