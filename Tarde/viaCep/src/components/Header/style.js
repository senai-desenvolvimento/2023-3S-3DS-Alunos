import styled from "styled-components";

export const HeaderContainer = styled.View`
    background-color: #FECC2B ;
    height: 20% ;
    flex-direction:row ;
    align-items:center ;
    justify-content:center ;
    border-radius: 0px 0px 15px 15px ;
    box-shadow:0px 0px 10px #00000030 ;

    /* box-shadow para android */
    /* shadow-color: 'black';
    shadow-opacity: 0.26;
    shadow-offset:20px 20px;
    shadow-radius: 10px;
    elevation: 1; */
`;
export const HeaderContent = styled.SafeAreaView`
  margin-top: 30px;
`;
export const TextHeader = styled.Text`
  font-size: 24px;
  color: #333e33;
  font-family: "Roboto_500Medium";
`;
