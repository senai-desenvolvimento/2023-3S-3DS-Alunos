import styled from "styled-components/native";

export const ContentInputSmall = styled.View`
  width: 144px;

  flex-direction: column;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

export const ButtonCamera = styled.TouchableOpacity.attrs({
  activeOpacity : 0.8
})`
  padding : 12px;
  border-radius : 10px;
  border : 1px solid #fbfbfb;
  background-color : #496bba;

  position : absolute;
  right : 15px;
  bottom : -20px;
`

export const ContainerLoad = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`