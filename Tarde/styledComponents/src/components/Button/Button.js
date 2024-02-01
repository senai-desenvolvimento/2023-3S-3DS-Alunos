import styled from "styled-components";

export const BtnIncrement = styled.TouchableOpacity`
    border-width: 1px ;
    border-radius:5px ;
    width: 100px ;
    height: 30px ;
    justify-content:center ;
    align-items: center ;
    background-color: blue ;
    margin-bottom: 5px ;
`
export const BtnDecrement = styled(BtnIncrement)`
        background-color: red ;
`
