import styled from 'styled-components/native'
import { FlatList } from 'react-native'

export const ListComponent = styled(FlatList)`
  margin: 10px;
  width: 100%;

  align-self: center;
`

export const ListComponentEmpty = styled.Text`
  width: 80%;
  color: #ACABB7;  
  font-size: 16px;
  margin-top: 15px;

  align-self: center;
  text-align: center;
 
  font-family: "Quicksand_500Medium";
`