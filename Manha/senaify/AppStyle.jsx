import styled from 'styled-components/native'

export const ContentIcon = styled.View`
  padding : 5px;

  gap: 5px;
  align-items: center;
  flex-direction: column;
`

export const TextIcon = styled.Text`
  font-size: 14px;
  color: ${ (props) => props.isFocused == true ? "#fbfbfb" : "#ACABB7"};
`