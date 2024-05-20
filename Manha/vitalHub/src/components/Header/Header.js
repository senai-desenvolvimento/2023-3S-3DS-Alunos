import { StatusBar } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import React, { useState, useEffect } from "react";
import {
  ContainerHeader,
  ImageUser,
  BoxUser,
  DataUser,
  NomeUser,
  TextDefault,
  HeaderContent,
} from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

import { userDecodeToken } from "../../utils/Auth";
import api from "../../service/service";

const Header = ({ navigation }) => {
  const [profile, setProfile] = useState("");

  async function BuscarPerfil( token ){
    await api.get(`/Usuario/BuscarPorId?id=${token.user}`)
    .then( response => {
      setProfile({
        ...token,
        foto : response.data.foto
      });

    }).catch(error => {
      console.log(error);
    });
  }

  async function profileLoad() {
    const token = await userDecodeToken(true);
    if (token !== null) {
      await BuscarPerfil(token);
    }
  }

  useEffect(() => {
    StatusBar.setBarStyle('light-content')
  }, []);

  useFocusEffect( // Usando uma ferramenta do react navigation para visualizar o focus na tela
    React.useCallback(() => { // Funcao de callBack das chamadas nas mudanças de component/pagina do react para que seja executada uma vez apenas
      // Define a cor da StatusBar para claro (branco) quando a tela é focada
      StatusBar.setBarStyle('light-content');

      profileLoad();

      // Função de limpeza para redefinir a cor da StatusBar quando a tela é desfocada
      return () => {
        StatusBar.setBarStyle('default'); // Pode ser 'dark-content' para escuro
      };
    }, [])
  );

  return (
    <ContainerHeader>
      <HeaderContent>
        <BoxUser onPress={() => navigation.navigate("Perfil")}>
          {
            profile.foto
              ? <ImageUser source={{ uri : profile.foto }} />
              : <ImageUser
                  source={
                    profile == "Medico"
                      ? require("../../../assets/profileLargeDoctor.png")
                      : require("../../../assets/nicolle.png")
                  }
                />
          }
          

          <DataUser>
            <TextDefault>Bem vindo</TextDefault>
            <NomeUser>
              {profile.role == "Medico" && "Dr."} {profile.name}
            </NomeUser>
          </DataUser>
        </BoxUser>

        <MaterialIcons name="notifications" size={25} color={"#fbfbfb"} />
      </HeaderContent>
    </ContainerHeader>
  );
};

export default Header;
