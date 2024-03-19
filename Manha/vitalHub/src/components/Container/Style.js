import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #FBFBFB;
`;

export const ContainerHome = styled.View`
  flex: 1;
  align-items: center;
  background-color: #FBFBFB;
`;

export const ContainerScroll = styled.ScrollView`
  flex: 1;
`

export const ContainerImage = styled.View`
    width: 100%;
    height: 280px;
    margin-bottom: 20px;

    align-Items: center;
    justify-Content: flex-start; 
`;

export const ContainerFlex = styled.View`
  width: 90%;

  flex-direction: row;
  align-self: center;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerLogo = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: flex-start;
  gap: 30px;
`;