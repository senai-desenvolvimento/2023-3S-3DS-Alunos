import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { playSound } from "../../utils/PlayAndPause";


// Importando os recursos
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importando os components
import { Music } from "../../components/Card";
import { SubTitle } from "../../components/Text/Title/styles";
import { Container, ContainerBody, ContainerList, ContainerPlaylistData } from "../../components/Container/styles";
import { ParagraphCenter } from "../../components/Text/Paragraph/styles";

const Favorites = ({ token, atual, audio, setAtual, setAudio }) => {
  const [lista, setLista] = useState([]);
  // const [atual, setAtual] = useState("");

  async function ListFavorites(){
    const retorno = await AsyncStorage.getItem("list");

    if( retorno ){
      setLista( JSON.parse( retorno ) );
    }
  }

  useFocusEffect( // Usando uma ferramenta do react navigation para visualizar o focus na tela
    React.useCallback(() => {  // Funcao de callBack das chamadas nas mudanças de component/pagina do react para que seja executada uma vez apenas
      ListFavorites()
    }, [])
  );

  return (
    <LinearGradient
      style={{ flex : 1 }}
      colors={['#2e0000', '#121212', '#121212', '#001b09']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.365, 0.7, 1]}
    >
      <Container>
        <ContainerBody>
          <ContainerPlaylistData>
            <SubTitle>Procure sua música favorita</SubTitle>

            <ParagraphCenter>Personalize seu gosto musical do seu jeito!</ParagraphCenter>
          </ContainerPlaylistData>

          <ContainerList
            data={ lista }
            renderItem={ ({ item }) => (
              <Music
                play={atual == item.track.preview_url}
                onPress={() => playSound(item.track.preview_url, atual, setAtual, audio, setAudio)}

                name={item.track.name}
                image={item.track.album.images[0].url}
                artist={item.track.artists.map(artist => artist.name).join(', ').substring(0, 25) + '...'}
              />
            )}
            showsVerticalScrollIndicator={ false }
            keyExtractor={ (item, index) => `${item.id}-${index}`}
            contentContainerStyle={{ marginTop: 15, paddingBottom : 150 }}
          />
        </ContainerBody>
      </Container>
    </LinearGradient>
  )
};

export default Favorites;