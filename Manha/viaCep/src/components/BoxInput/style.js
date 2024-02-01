import styled from "styled-components";

//componente que contem a label + input
export const FieldContent = styled.View`

    margin-top:20px ;
    /* define o valor da largura como o valor da props.fieldWidth */
    width: ${props => `${props.fieldWidth}%`}
`