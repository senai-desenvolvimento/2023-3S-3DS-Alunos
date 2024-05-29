import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
`;

export const ContainerHeader = styled.View`
  width: 100%;
  padding: 20px 0px;

  gap: 25px;
  flex-direction: row;
  align-items: center;
`

// export const ContainerBody = styled.View`
export const ContainerBody = styled.ScrollView`
  padding: 10px 30px;
`

export const ContainerList = styled.FlatList`
  width: 100%;
  height: 100%;
  margin: 10px 0px;
`

export const ContainerPlaylist = styled.View`
  gap: 20px;
  flex-direction: row;
  align-items: flex-start;
`

export const ContainerPlaylistData = styled.View`
  margin-top: 20px;
  
  gap: 10px;
  flex-direction: column;
  align-items: center;
`

export const ContainerMusic = styled.View` 
  width: 100%;
  
  gap: 5px;
  flex-direction: column;
`

export const ContainerSound = styled.View`
  position: relative;
  
  align-items: center;
  justify-content: center;
`

export const ContainerInput = styled.View`
  margin-top: 20px;
  position: relative;
  
  flex-direction: row;
  align-items: center;
`