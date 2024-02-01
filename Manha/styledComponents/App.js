import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from './src/components/Container/Container';
import { Title, TitleBtnDecrement, TitleBtnIncrement } from './src/components/Title/Title';
import { BtnDecrement, BtnIncrement } from './src/components/Button/Button';

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
    <Container>
      
      <Title>Contador: {count} </Title>

      <BtnIncrement onPress={increment}>
        <TitleBtnIncrement>Incrementar</TitleBtnIncrement>
      </BtnIncrement>

      <BtnDecrement  onPress={decrement}>
        <TitleBtnDecrement >Decrementar</TitleBtnDecrement>
      </BtnDecrement>

      <StatusBar style="auto" />
    </Container>
  );
}