import { useEffect } from "react";

import { Text } from "react-native";
import { ContentIcon, TextIcon } from "./Style";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../Home/Home";
import PerfilPaciente from "../PerfilPaciente/PerfilPaciente";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Instânciando a função de definição do bottom navigation
const bottomTab = createBottomTabNavigator();

export const Main = ({ navigation, route }) => {
  const routeParams = route.params;
  // const paramsNavigationCreate = (route.params != undefined ? route.params.createUser : false)

  return (
    <bottomTab.Navigator
      // Definindo a rota inicial
      initialRouteName={ routeParams != undefined ? routeParams.screen : "Home"}

      // Definindo as opções dentro do bottom tabs
      screenOptions={ ({ route }) => ({
        tabBarStyle: { backgroundColor: "#FFFFFF", height: 80, paddingTop: 10 },
        tabBarActiveBackgroundColor: "transparent",
        tabBarShowLabel: false,
        headerShown: false,

        // Aplicando o efeito do Icone clicado
        tabBarIcon: ({ focused }) => {
          if (route.name === "Home") {
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
                }
              >
                <FontAwesome name="calendar" size={18} color={focused ? "#607EC5" : "#4E4B59"} />
                {focused && <TextIcon color={focused ? "#607EC5" : "#4E4B59"}>Agenda</TextIcon>}
              </ContentIcon>
            );
          
          // }else if(route.name === "Perfil"){
          }else{
            return (
              <ContentIcon tabBarActiveBackgroundColor={
                  focused ? "#ECF2FF" : "transparent"
              }>
                <FontAwesome5 name="user-circle" size={22} color={focused ? "#607EC5" : "#4E4B59"} />
                {focused && <TextIcon color={focused ? "#607EC5" : "#4E4B59"}>Perfil</TextIcon>}
              </ContentIcon>
            );
          };
        }
      })}
    >

      {/* Definindo as rotas de acesso das telas */}
      <bottomTab.Screen name="Home" component={Home}/>

      <bottomTab.Screen name="Perfil">
        { (props) => <PerfilPaciente navigation={navigation} route={route} /> }
      </bottomTab.Screen>
  
    </bottomTab.Navigator>
  );
};
