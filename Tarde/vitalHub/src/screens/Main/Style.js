import styled from 'styled-components/native'

export const ContentIcon = styled.View.attrs({
  focus : true
})`
  border-radius : 18px;
  padding: 9px 12px;
  background-color: ${ props => `${props.tabBarActiveBackgroundColor}`};

  gap : 5px;
  flex-direction: row;
  align-items: center;
  justify-content : center;
`

export const TextIcon = styled.Text`
  font-size: 14px;
  font-family: 'Quicksand_500Medium';
`