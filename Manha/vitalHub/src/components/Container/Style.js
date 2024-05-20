import styled from "styled-components/native";

export const ContainerHome = styled.View`
  flex: 1;
`

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #fbfbfb;
`;

export const ContentContainer = styled.View`
  align-items: center;
`

export const ContainerScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator:false
})`
  background-color : #fbfbfb
  /* flex: 1; */
  /* height : 100%; */
`;

export const ContainerImage = styled.TouchableOpacity.attrs({
  activeOpacity : 1
})`
  width: 100%;
  /* height: 300px; */
  height: ${ (props) => props.viewFull ? 'auto' : '300px' };
  margin-bottom: 20px;

  position: relative;
  align-items: center;
  justify-content: center;
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
