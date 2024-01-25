import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      {/* imagem */}
      <Image
       style={styles.image}
       source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
       />

      {/* texto */}
      <Text style={styles.text}>Hello, World!</Text>

      {/* input */}
      <TextInput
        style={styles.input}
        defaultValue='exemplo de input'
      />

      {/* botão */}
      <TouchableOpacity style={styles.btn}>
        <Text>exemplo de botão</Text>
      </TouchableOpacity>
      

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 50,
    fontWeight: '500'
  },
  input: {
    width:'90%',
    height:40,
    borderWidth:1,
    borderColor:'grey',
    padding:10
  },
  image: {
    width:100,
    height:100
  },
  btn: {
    borderColor:'black',
    width:'60%',
    height:40,
    borderWidth:1,
    marginTop:10,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 5
  }


});
