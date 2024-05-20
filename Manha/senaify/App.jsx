  import { useState, useEffect, useRef } from 'react';

  // Importando recursos
  import axios from 'axios';
  import { encode } from 'base-64';
  import queryString from 'query-string';
  import Toast from 'react-native-toast-message';
  import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";

  import { ContentIcon, TextIcon } from './AppStyle';
  import { FontAwesome6, MaterialIcons, AntDesign  } from '@expo/vector-icons';

  // Importando os recursos de navegacao
  import { NavigationContainer } from '@react-navigation/native';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  const BottomTab = createBottomTabNavigator();

  // Importândo as telas
  import Home from './src/screens/Home'
  import Loading from './src/screens/Loading'
  import Search from './src/screens/Search'
  import Favorites from './src/screens/Favorites'

  // Importando fonts
  import {
    useFonts,
    MontserratAlternates_700Bold,
  } from "@expo-google-fonts/montserrat-alternates";

  import {
    Lato_900Black,
    Lato_700Bold,
    Lato_400Regular,
  } from '@expo-google-fonts/lato'

  import { LogBox } from 'react-native';

  export default function App() {
    const toastRef = useRef();
    
    const [atual, setAtual] = useState("");
    const [audio, setAudio] = useState(null);
    const [token, setToken] = useState(null);
    
    const [fontsLoaded, fontsError] = useFonts({
      MontserratAlternates_700Bold, Lato_400Regular,
      Lato_700Bold, Lato_900Black
    });

    // Capturar o token da aplicação
    const _getApiSpotifyToken = async () => {
      // configurando a decodificacao do base-64
      if(!global.btoa){
        global.btoa = encode;
      }

      // Informando as chaves de validacao
      const _clientId = "21dd09b258ef4dc1be290af1d61ae474";
      const _clientSecret = "28dc0c4d90bd438e91ef0770f35745ed";

      // Criando o parametro de captura de acesso
      const formUrl = queryString.stringify({
        "grant_type" : "client_credentials"
      });

      await axios.post("https://accounts.spotify.com/api/token", formUrl, {
        headers : {
          "Content-Type" : "application/x-www-form-urlencoded",
          "Authorization" : `Basic ${ btoa( _clientId + ':' + _clientSecret) }`
        }
      }).then( response => {
        setToken(response.data.access_token)
        
      }).catch(error => {
        console.log(error.request.status)
        console.log(error.request)
      })
    }

    // Chamando a funcao de captura do token
    useEffect(() => {
      _getApiSpotifyToken();

      Audio.requestPermissionsAsync();

      LogBox.ignoreAllLogs();
    }, []);

    useEffect(() => {
      if(token){
        // Configurando as formatações de audio
        Audio.setAudioModeAsync({
          interruptionModeIOS: InterruptionModeIOS.DuckOthers,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
          playThroughEarpieceAndroid: false,
        });
      }
    }, [token])

    if ( (!fontsLoaded && !fontsError) || token == null) {
      return <Loading />;
      
    } else {
      return (
        <NavigationContainer>
          <BottomTab.Navigator
            initialRouteName='Home'
            screenOptions={ ({route}) => ({
              tabBarStyle : {
                height : 80,
                paddingTop: 10,
                backgroundColor : "#121212"
              },

              headerShown: false,
              tabBarShowLabel: false,
              tabBarActiveBackgroundColor: "transparent",

              tabBarIcon : ({ focused }) => {
                return(
                  <ContentIcon
                    tabBarActiveBackgroundColor={"transparent"}
                  >
                    {
                      route.name == "Home" ? <FontAwesome6 name="house" size={20} color={focused ? "#fbfbfb" : "#ACABB7"} /> :
                      route.name == "Search" ? <MaterialIcons name="search" size={25} color={focused ? "#fbfbfb" : "#ACABB7"} /> : 
                      route.name == "Favorites" ? <AntDesign  name="like1" size={25} color={focused ? "#fbfbfb" : "#ACABB7"} /> :
                      null
                    }
                    <TextIcon isFocused={focused}>{route.name}</TextIcon>
                  </ContentIcon>
                )
              }
            })}
          >
            <BottomTab.Screen name="Home">
              {(props) => <Home {...props} token={token} setAtual={setAtual} atual={atual} audio={audio} setAudio={setAudio}/>}
            </BottomTab.Screen>

            <BottomTab.Screen name="Search">
              {(props) => <Search {...props} token={token} setAtual={setAtual} atual={atual} audio={audio} setAudio={setAudio}/>}
            </BottomTab.Screen>

            <BottomTab.Screen name="Favorites">
              {(props) => <Favorites {...props} token={token} setAtual={setAtual} atual={atual} audio={audio} setAudio={setAudio}/>}
            </BottomTab.Screen>
          </BottomTab.Navigator>

          <Toast ref={toastRef} position="bottom"/>
        </NavigationContainer>
      )
    }
  }