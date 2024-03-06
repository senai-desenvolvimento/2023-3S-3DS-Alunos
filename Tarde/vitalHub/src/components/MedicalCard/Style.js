import styled from 'styled-components/native';
import { Title } from '../Title/Style'

export const MedicalCards = styled.View`
  width: 320px;
  height: 102px;
  
  flex-direction: row;

  align-self: center;
  margin-bottom: 12px;
  padding: 10px 11px;
  gap: 10px;

  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08);
  border-color: ${ (props) => props.selected ? '#496BBA' : 'black'};
`;

export const ViewColumn = styled.View`
  flex-direction: column;
`
export const ProfileName = styled(Title)`
  align-self: flex-start;
  font-size: 16px;
`
export const SimpleText = styled.Text`
  font-size: 14px;
  color: #8C8A97;
`
export const ProfileDataCard= styled(ViewColumn)`
  gap: 10px;
  margin-left: 10px;
`
export const ProfileImage = styled.Image`
  width: 77px;
  height: 80px;
  border-radius: 5px;
`