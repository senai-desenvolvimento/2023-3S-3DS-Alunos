import { FlatList, SafeAreaView, StatusBar } from "react-native";

//import dos components
import Person from "./src/components/Person/Person";

// import das fonts
import {
  useFonts,
  Poppins_300Light,
  Poppins_500Medium_Italic,
} from "@expo-google-fonts/poppins";

import { SingleDay_400Regular } from "@expo-google-fonts/single-day";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_500Medium_Italic,
    SingleDay_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const peopleList = [
    { id: "1", name: "Carlos", age: 37 },
    { id: "2", name: "Edu", age: 38 },
    { id: "3", name: "Jucelino", age: 25 },
  ];

  return (
    <SafeAreaView>
      <StatusBar />
      <FlatList
        data={peopleList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Person name={item.name} age={item.age} />}
      />
    </SafeAreaView>
  );
}