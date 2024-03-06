
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const BottomTab = createBottomTabNavigator();

// Importando as telas
import Home from '../Home/Home';
import PerfilPaciente from '../PerfilPaciente/PerfilPaciente';

// Chamando os elementos do Style
import {ContentIcon, TextIcon} from './Style'

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

export const Main = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"

      screenOptions={ ({ route }) => ({
        tabBarStyle : { backgroundColor: "#FFFFFF", height: 80, paddingTop: 10 },
        tabBarActiveBackgroundColor : "transparent",
        tabBarShowLabel : false,
        headerShown : false,

        tabBarIcon : ({ focused }) => {
          if( route.name === "Home" ){
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={ focused ? "#ECF2FF" : "transparent" }
              >
                <FontAwesome name="calendar" size={18} color="#4E4B59"/>
                { focused && <TextIcon>Agenda</TextIcon> }
              </ContentIcon>
            )

          }else{
            // FontAwesome5 -> user-circle
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={ focused ? "#ECF2FF" : "transparent" }
              >
                <FontAwesome5 name="user-circle" size={18} color="#4E4B59"/>
                { focused && <TextIcon>Perfil</TextIcon> }
              </ContentIcon>
            )

          }
        }
      })}
    >

      <BottomTab.Screen 
        name="Home"
        component={Home}
      />

      <BottomTab.Screen 
        name="Perfil"
        component={PerfilPaciente}
      />

    </BottomTab.Navigator>
  )
}