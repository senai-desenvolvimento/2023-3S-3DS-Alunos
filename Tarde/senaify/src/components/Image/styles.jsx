import styled from "styled-components/native"

export const ImageLogo = styled.Image`
  width: 250px;
`

export const ImageProfile = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`

export const ImageAlbum = styled.Image`
  width: 140px;
  height: 135px;
  border-radius: 5px;
`

export const ImagePlaylist = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 5px;
  margin-bottom: 10px;
`

export const ImageMusic = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 5px;

  opacity: ${ props => props.playSound == true ? 0.4 : 1 };
`