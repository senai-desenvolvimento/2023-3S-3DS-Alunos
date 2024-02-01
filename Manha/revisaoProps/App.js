import { FlatList, SafeAreaView, StatusBar } from "react-native";
import Person from "./src/components/Person/Person";

import {useFonts, Poppins_100Thin} from '@expo-google-fonts/poppins';
import{SingleDay_400Regular} from '@expo-google-fonts/single-day';

export default function App() {

  let [fontsLoaded, fontError] = useFonts({
    Poppins_100Thin,
    SingleDay_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  //simulando uma lista de pessoas
  const peopleList = [
    {id: '1', name: 'Carlos', age: 37},
    {id: '2', name: 'Eduardo', age: 47},
    {id: '3', name: 'Enzo', age: 27},
    {id: '4', name: 'Lucas', age: 22}
  ]

  return (
    <SafeAreaView>
      
      {/* para android */}
      {/* <StatusBar/> */}

      <FlatList
        data={peopleList}
        keyExtractor={(item) => item.id}

        //leitura da lista
        renderItem={({item}) =>(

          //exibir cada item da lista
          <Person name={item.name} age={item.age}/>
        )}
        />
    </SafeAreaView>
  );
}