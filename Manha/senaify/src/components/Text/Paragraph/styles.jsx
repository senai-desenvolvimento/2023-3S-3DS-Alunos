import styled from "styled-components/native"

export const Paragraph = styled.Text`
  width: 70%;
  
  font-size: 16px;
  color: #fbfbfb;
  font-family: "Lato_700Bold";
  line-height: ${(16 * 130) / 100}px;
`

export const SubParagraph = styled.Text`
  font-size: 14px;
  color: #E1E0E7;
  line-height: ${(14 * 130) / 100}px;
  font-family: "Lato_400Regular";
`

export const ParagraphCenter = styled.Text`
  font-size: 16px;
  color: #E1E0E7;
  line-height: ${(16 * 130) / 100}px;
  font-family: "Lato_400Regular";
  text-align: center;
`