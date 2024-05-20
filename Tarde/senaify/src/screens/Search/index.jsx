import { useEffect, useState, forwardRef } from "react";
import { playSound } from "../../utils/PlayAndPause";
import { CheckMusic } from "../../utils/LikeAndDeslike";

// Importando os recursos
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

// Importando os components
import { Music } from "../../components/Card";
import { Input } from "../../components/Input/styles";
import { SubTitle } from "../../components/Text/Title/styles";
import { Container, ContainerBody, ContainerInput, ContainerList } from "../../components/Container/styles";

const Search = ({ token, atual, audio, setAtual, setAudio }) => {
  const [search, setSearch] = useState("");
  const [lista, setLista] = useState([]);

  async function ProcurarMusica(){
    await axios.get(`https://api.spotify.com/v1/search?q=${search}&type=track&locale=pt_BR&limit=10`, {
      headers : { 
        "Authorization" : `Bearer ${token}`
      }
    }).then( async response => {
        if(response.data){
          
          const filter = [];
          
          for (const item of response.data.tracks.items) {
            
            const checkMusic = await CheckMusic({ track : item });
            
            // Adiciona a propriedade isLiked com base no resultado da verificação
            filter.push({ ...item, isLiked: checkMusic });
          }

          setLista( filter );
          // setLista( response.data.tracks.items );
        }
        
      }).catch( error => {
        console.log(error.request.status);
        console.log(error.request);
      });
  }

  useEffect(() => {
    if( search.trim() != "" ){
      ProcurarMusica();
    }
  }, [search]);

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
          <SubTitle>Procure sua música favorita</SubTitle>

          <ContainerInput>
            <Input
              value={search}
              onChangeText={txt => setSearch(txt)}
            />

            <MaterialIcons
              name="search" size={30} color="black"
              style={{ position : 'absolute', right : 10}}
            />
          </ContainerInput>

          <ContainerList
            data={ lista }
            renderItem={ ({ item }) => (
              <Music
                play={ atual == item.preview_url }
                onPress={() => playSound(item.preview_url, atual, setAtual, audio, setAudio)}
                // onPress={() => playSound(item.preview_url) }

                like={{ track : item }}
                isLike={item.isLiked}
                name={ item.name }
                image={ item.album.images[0].url }
                artist={ item.artists.map(artist => artist.name).join(', ').substring(0, 25) + '...' }
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
}

export default Search;