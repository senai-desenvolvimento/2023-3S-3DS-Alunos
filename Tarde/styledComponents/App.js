import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from './src/components/Container/Container';
import { BtnDecrement, BtnIncrement } from './src/components/Button/Button';
import { Title, TitleBtnDecrement, TitleBtnIncrement } from './src/components/Title/Title';

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

  const decrement = () => {
    if(count > 0)
    {
      setCount(count - 1)
    }
    else{
      Alert.alert('Contador não pode ser menor que zero!')
    }
  }

  useEffect(() => {
    console.warn(`Contador atualizado: ${count}`)
  }, [count])

  return (
    <Container>

      {/* Title */}
      <Title>Contador: {count}</Title>

      {/* BtnIncrement */}
      <BtnIncrement onPress={increment}>
        
        {/* TitleBtnIcrement */}
        <TitleBtnIncrement>Incrementar</TitleBtnIncrement>

      </BtnIncrement>

      {/* BtnDecrement */}
      <BtnDecrement onPress={decrement}>
        
        {/* TitleBtnDecrement */}
        <TitleBtnDecrement>Decrementar</TitleBtnDecrement>

      </BtnDecrement>

      <StatusBar style="auto" />
    </Container>
  );
}