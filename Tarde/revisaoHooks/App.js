import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {

  //hook de state
  const [count, setCount] = useState(0)

  //função para incremento
  const increment = () => {
    setCount(count + 1)
  }

  //função para decremento
  //estilização : botão de incremento com cor 
  //diferente do decremento

  useEffect(() => {
    console.warn(`Contador atualizado: ${count}`)
  }, [count])

  return (
    <View style={styles.container}>

      <Text>Contador: {count}</Text>

      <TouchableOpacity onPress={increment}>
        <Text>Incrementar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
