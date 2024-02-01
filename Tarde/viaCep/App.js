import { StatusBar } from 'react-native';
import { ContainerApp } from './style';
import { Header } from './src/components/Header';

import { useFonts, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Home } from './src/screens/Home';

export default function App() {

  const[fontsLoaded, fontError] = useFonts({
    Roboto_500Medium,
    Roboto_700Bold
  });

  if(!fontsLoaded && !fontError){
    return null;
  }

  return (
    <ContainerApp>
      <StatusBar
        barStyle='default'
        backgroundColor='transparent'
        translucent
      />

      {/* HEADER */}
      <Header/>

      {/* HOMESCREEN */}
      <Home/>

    </ContainerApp>
  );
}