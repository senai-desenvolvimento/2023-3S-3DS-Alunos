import styled, { css } from "styled-components";

// componente de botão - ButtonTabsStyle
export const ButtonTabsStyle = styled.TouchableHighlight`
    padding: 12px 14px ;
    border-radius: 5px ;

    /* se o botão estiver clicado, aplica-se o fundo azul,caso contrário, fundo transparente*/
    ${props => props.clickButton ? css`
        background-color: #496bba ;
    `: css`
        background-color: transparent;
        border: 2px solid #607EC5;
    `}
`

export const ButtonTextStyle = styled.Text`
    font-size: 12px ;
    font-family:'MontserratAlternates_600SemiBold' ;

    /* se o clickButton for true, a cor da fonte será branca, caso contrário azul */
    ${props => props.clickButton ? css`
        color: #fbfbfb
    `: css`
        color: #607EC5;
    `}
`