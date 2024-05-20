import styled from "styled-components";

export const ContentIcon = styled.View.attrs({
    focus:true
})`
    flex-direction: row;
    justify-content:center ;
    align-items:center ;
    gap: 5px;
    border-radius: 19px;

    /* background-color: #ECF2FF ; */
    background-color: ${props => `${props.tabBarActiveBackgroundColor}`} ;
    padding: 9px  12px;
`

export const TextIcon = styled.Text`
    color : ${ (props) => props.color };
    font-size:14px ;
    font-weight: 600;
    font-family: 'Quicksand_600SemiBold' ;
`