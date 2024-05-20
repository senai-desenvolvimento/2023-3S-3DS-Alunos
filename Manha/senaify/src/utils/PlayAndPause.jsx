import { Audio } from "expo-av";
import Toast from 'react-native-toast-message';

export const playSound = async ( audioUri, atual, setAtual, audio, setAudio ) => {
  try {
    if( audioUri == null ){
      Toast.show({ type:"error", text1 : "Não foi possível reproduzir a música." });

    }else if( audio != null && atual === audioUri ){
      // Pausando um audio existente
      await stopSound(setAtual, audio, setAudio);

    }else{
      // Parando a musica caso outra tenha sido selecionada
      if( atual !== audioUri && atual != ""){
        await stopSound(setAtual, audio, setAudio);
      }

      // Aplicando a configuração de reprodução do áudio
      const { sound } = await Audio.Sound.createAsync({
        uri: audioUri, shouldPlay: true, isLooping: false,
        volume: 1.0, isMuted: false
      });

      //audio = sound; 
      setAudio( sound );
      setAtual( audioUri );

      // Iniciando a reprodução
      await sound.playAsync();
    }
  } catch (error) {
    console.error(error);
  }
}

export const stopSound = async (setAtual, audio, setAudio) => {
  try {
    await audio.stopAsync();
    
    // audio = null;
    setAudio( null );
    setAtual("");

  } catch (error) {
    console.error(error);
  }
}