/*
O jwt trabalha com o formato base64, uma string especial codificada.
para trabalhar com a codificação e decodificação desse formato, utilizamos o pacote jwt-decode 
na web e funcionava normalmente. Já no React Native tivemos problemas!!!

O que acontece por trás dos panos?

O jwt-decode utiliza funções globais para codificar e decodificar as strings base64 através das 
funções globais atob e btoa, que estão disponíveis nos navegadores modernos por padrão. Já no ambiente do 
React Native e no NodeJS, você deve instalar um complemento para adicionar essas funções globais e fazer
o decode funcionar!

https://github.com/auth0/jwt-decode?tab=readme-ov-file
*/
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { decode, encode } from "base-64";
import api from "../service/service";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

//função que decodifica o token obtido do async storage
export const userDecodeToken = async ( procurarFoto = false) => {

  //obtendo o token do async storage
  const token = JSON.parse( await AsyncStorage.getItem("token") ).token;

  //se não existir token returna nulo
  if (token === null) {
    return null;
  }

  //se existir token
  const decoded = jwtDecode(token);

  // Buscando os dados de perfil do usuário
  let fotoUsuario = '../../assets/nicolle.png';
  if( procurarFoto ){
    await api.get(`/Usuario/BuscarPorId?id=${decoded.jti}`)
    .then( response => {
      fotoUsuario = response.data.foto
    }).catch(error => {
      console.log(error);
    })
  }
  
  return {
    email: decoded.email,
    role: decoded.role,
    name: decoded.name,
    user: decoded.jti,
    foto: fotoUsuario,
    token: token,
    // token:  theToken
  };
};
