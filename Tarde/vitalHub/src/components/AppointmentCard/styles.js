import styled from 'styled-components/native'
import { Title } from '../Title/Style'

export const CardDasConsulta = styled.TouchableOpacity`
  width: 340px;
  margin: 0px auto;
  margin-bottom: 12px;
  padding: 10px 11px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08);

  gap: 10px;
  flex-direction: row;
`

export const ViewColumn = styled.View`
  flex-direction: column;
`

export const DadosPerfilCard = styled(ViewColumn)`
  gap: 6px;
`

export const DadosPerfil = styled.View`
  gap: 15px;
  flex-direction: row;
`

export const ConteudoCard = styled(ViewColumn)`
  width: 70%;
  gap: 11px;
`

export const ImagePerfil = styled.Image`
  width: 77px;
  height: 80px;
  border-radius: 5px;
`

export const NomePerfil = styled(Title)`
  align-self: flex-start;
  font-size: 16px;
  margin-top: 0px;
`

export const TextoSimples = styled.Text`
  font-size: 14px;
  color: ${ (props) => props.situacao == 'pendente' ? '#49B3BA' : '#8C8A97'};
`

export const TextoNegrito = styled(TextoSimples)`
  font-weight: bold;
`

export const ClockCard = styled.View`
  gap: 6px;
  flex-direction: row;
  
  padding : 4px 23px;
  border-radius: 5px;
  background-color: ${ (props) => props.situacao == 'pendente' ?  '#E8FCFD' : '#F1F0F5'};
`

export const ViewRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const ButtonCard = styled.TouchableOpacity`
  font-size: 12px;
  font-family: 'MontserratAlternates_500Medium';
`

export const ButtonText = styled.Text`
  color : ${ (props) => props.situacao == 'pendente' ? '#C81D25' : '#344F8F' }
`