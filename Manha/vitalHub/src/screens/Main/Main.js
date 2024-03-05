

// Importar o recurso do bottom tabs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const BottomTab = createBottomTabNavigator()

// Importando as telas
import Home from '../Home/Home'
import PerfilPaciente from '../PerfilPaciente/PerfilPaciente'

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

export const Main = () => {
  return (
    <BottomTab.Navigator
      // Definir a rota inicial
      initialRouteName="Home"

      screenOptions={ ({ route }) => ({
        tabBarStyle: { backgroundColor: "#FFFFFF", height : 80, paddingTop: 10 },
        tabBarActiveBackgroundColor : "transparent",
        tabBarShowLabel : false,
        headerShown: false,

        tabBarIcon : ({ focused }) => {

          if( route.name === "Home" )
          {
            return (
              <>
              </>
            )
          }else{

          }

        }
      }) }
    >
      
      <BottomTab.Screen 
        name="Home"
        component={ Home }
      />


      <BottomTab.Screen 
        name="Perfil"
        component={ PerfilPaciente }
      />
    </BottomTab.Navigator>
  )
}