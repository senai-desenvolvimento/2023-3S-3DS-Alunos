import styled, { css } from 'styled-components/native'

export const ClinicCards = styled.View`
  width: 320px;
  height: 84px;
  padding: 18px;
  border-radius: 5px;
  margin-bottom: 12px;
  background-color: #FFFFFF;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08);

  align-self: center;
  flex-direction: row;
  justify-content: space-between;
  /* align-content: space-between; */
 ${ (props) => props.selected ?  css`border: 2px solid #496BBA;` : ``};
`

export const ViewRow = styled.View`
  gap: 2px;
  align-items: center;
  flex-direction: row;
`

export const ViewColumn = styled.View`
  flex-direction: column;
  gap: 10px;
`

export const NameClinic = styled.Text`
  color: #33303E;
  font-size: 16px;
  font-family: 'MontserratAlternates_600SemiBold';
`

export const LocationClinic = styled.Text`
  font-size: 14px;
  color: #4E4B59;
`

export const Rating = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: #F9A620;
`

export const TimeView = styled(ViewRow)`
  width: 100px;
  height: 26px;

  border-radius: 5px;
  background-color: #E8FCFD;

  justify-content: center;
  align-items: center;
`

export const TimeText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #49B3BA;
`