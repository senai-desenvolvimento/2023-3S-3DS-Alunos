import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>

      {/* imagem */}
      <Image
        style={styles.image}
        source={{
          uri: "https://disneyplusbrasil.com.br/wp-content/uploads/2023/07/Vingadores-MCU.jpg",
        }}
      />

      {/* título */}
      <Text style={styles.text}>Hello, World!</Text>

      {/* input */}
      <TextInput style={styles.input} defaultValue="Exemplo de input" />

      {/* botão */}
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.textButton}>exemplo de botão</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    fontSize: 24,
  },
  input: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: '50%'
  },
  btn : {
    width:'90%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black'
  },
  textButton : {
    color: 'white',
    textTransform: 'capitalize',
    fontWeight: "500",
    fontSize: 18
  }
});
