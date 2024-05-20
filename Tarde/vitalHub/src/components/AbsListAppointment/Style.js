import styled, { css } from 'styled-components/native'

// componente de botão
export const ButtonTabsStyle = styled.TouchableHighlight`
  padding: 12px 14px;
  border-radius: 5px;

  /* se for passado a props clickButton, aplica um css, senão o outro */
  ${ props => props.clickButton ? css`
    background-color: #496BBA;
  ` : css`
    background-color : transparent;
    border : 2px solid #607EC5;
  `}
`

// componente de texto do botão
export const ButtonTextStyle = styled.Text`
  font-size: 12px;
  font-family: 'MontserratAlternates_600SemiBold';

  /* se for passado a props clickButton, aplica um css, senão o outro */
  ${ props => props.clickButton ? css`
    color: #FBFBFB;
  ` : css`
    color : #607EC5;
  `}
`