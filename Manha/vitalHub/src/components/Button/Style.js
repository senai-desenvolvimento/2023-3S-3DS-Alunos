import styled from "styled-components";

export const Button = styled.TouchableOpacity`
    width: 90% ;
    height: 44px ;

    background-color: #496bba ;
    border-radius: 5px ;
    border: 1px solid #496bba ;

    margin-top: 15px ;
    padding: 12px 8px 12px 8px ;

    align-items: center ;
    justify-content:center ;
`

export const ButtonGoogle = styled(Button)`
    background-color: #FAFAFA ;
    flex-direction: row ;
    gap: 10px;
`