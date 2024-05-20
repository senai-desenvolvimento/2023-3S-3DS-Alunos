import { useEffect, useState, useRef } from "react";
import { playSound } from "../../utils/PlayAndPause";
import { CheckMusic } from "../../utils/LikeAndDeslike";

// Importando as ferramentas
import axios from "axios";
import { ActivityIndicator } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

// Importando os components
import { ButtonIcon } from "../../components/Button/styles";
import { Album, Music } from "../../components/Card";
import { Title, SubTitle } from "../../components/Text/Title/styles";
import { ParagraphCenter } from "../../components/Text/Paragraph/styles";
import { ImageProfile, ImagePlaylist } from "../../components/Image/styles";
import { Container, ContainerHeader, ContainerBody, ContainerList, ContainerPlaylist, ContainerPlaylistData } from "../../components/Container/styles";

const Home = ({ token, atual, audio, setAtual, setAudio }) => {
  const [load, setLoad] = useState(false);
  const [playlist, setPlaylist] = useState(null);

  const [listaMusic, setListaMusic] = useState([]);
  const [listaPlaylist, setListaPlaylist] = useState([]);
  
  // Função para realizar as buscas das playlists e das músicas
  async function GetListApi(url, type){
    setLoad(true);

    await axios.get(`https://api.spotify.com/v1/${url}`, {
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    }).then( async response => {
      if(response.data){
        if(type == "playlist"){
          setListaPlaylist(response.data.playlists.items)

        }else{
          const filter = [];

          for (const item of response.data.items) {
            const checkMusic = await CheckMusic(item);
            
            // Adiciona a propriedade isLiked com base no resultado da verificação
            filter.push({ ...item, isLiked: checkMusic });
          }

          setListaMusic(filter);
        }
      }
    }).catch( error => {
      console.log(error.request.status)
      console.log(error.request)
    });

    setLoad(false);
  }

  useEffect(() => {
    // Função para listrar as playlist e albums
    GetListApi("browse/categories/0JQ5DAqbMKFKGQWi5egawY/playlists", "playlist");
  }, []);

  useEffect(() => {
    if(playlist){
      // Função para listar as musicas da playlist selecionada
      GetListApi(`playlists/${playlist.id}/tracks?limit=10`, "music")
    }
  }, [playlist]);

  return (
    <LinearGradient
      style={{flex : 1}}
      colors={['#2e0000', '#121212', '#121212', '#001b09']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0, 0.365, 0.7, 1]}
    >
      <Container>
        {
          load
            ? <ActivityIndicator color="#fbfbfb"/>
            : (
                <ContainerBody>
                  {
                    playlist == null
                    ? (<>
                        {/* Header da aplicação */}
                        <ContainerHeader>
                          <ImageProfile source={require("../../../assets/profile.jpg")}/>
                          <Title>Good morning</Title>
                        </ContainerHeader>
              
                        <SubTitle>Explore nossas playlists</SubTitle>

                        <ContainerList
                          key={"playlist"}
                          data={listaPlaylist}
                          numColumns={2}
                          renderItem={ ({ item }) => (
                            <Album
                              image={item.images[0].url}
                              name={item.name}
                              description={item.description.substring(0, 35) + '...'}

                              onPress={() => setPlaylist(item)}
                            />
                          )}
                          showsVerticalScrollIndicator={false}
                          keyExtractor={ (item, index) => `${item.id}-${index}`}
                          contentContainerStyle={{ marginTop: 15, paddingBottom : 120 }}
                        />
                      </>) 
                    : (<>
                        <ContainerPlaylist>
                          <ButtonIcon onPress={() => setPlaylist(null)}>
                            <FontAwesome5
                              name="angle-left" 
                              size={30} color="#fbfbfb"
                            />
                          </ButtonIcon>

                          <ImagePlaylist
                            source={{ uri : playlist.images[0].url }}
                          />
                        </ContainerPlaylist>

                        <ContainerPlaylistData>
                          <Title>{playlist.name}</Title>

                          <ParagraphCenter>{playlist.description}</ParagraphCenter>
                        </ContainerPlaylistData>

                        <ContainerList
                          key={"musics"}
                          data={ listaMusic }
                          numColumns={1}
                          renderItem={ ({ item }) => (
                            <Music
                              play={atual == item.track.preview_url}
                              onPress={() => playSound(item.track.preview_url, atual, setAtual, audio, setAudio)}
                              // onPress={() => playSound(item.track.preview_url)}

                              like={item}
                              isLike={item.isLiked}
                              name={item.track.name}
                              image={item.track.album.images[0].url}
                              artist={item.track.artists.map(artist => artist.name).join(', ').substring(0, 25) + '...'}
                            />
                          )}
                          showsVerticalScrollIndicator={ false }
                          keyExtractor={ (item, index) => `${item.track.id}-${index}` }
                          contentContainerStyle={{ marginTop: 15, paddingBottom : 350 }}
                        />
                      </>)
                  }
                </ContainerBody>
              )
        }
      </Container>
    </LinearGradient>
  )
}

export default Home;