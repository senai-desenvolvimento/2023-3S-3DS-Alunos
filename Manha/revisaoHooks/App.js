import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {

  //hook
  const[count, setCount] = useState(0);

  //função de incremento
  const increment = () => {
    setCount(count + 1)
  }

  //função de decremento
  const decrement = () => {
    setCount(count - 1)
  }

  //effect
  useEffect(() => {
    console.warn(`Contador atualizado: ${count}`)
  }, [count])

  return (
    <View style={styles.container}>
      
      <Text style={styles.text}>Contador: {count} </Text>

      <TouchableOpacity style={styles.button} onPress={increment}>
        <Text style={styles.buttonText}>Incrementar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={decrement}>
        <Text style={styles.buttonText}>Decrementar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  
});
