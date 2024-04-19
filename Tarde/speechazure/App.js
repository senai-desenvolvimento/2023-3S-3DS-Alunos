import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { Audio } from "expo-av";
import axios from "axios";

export default function App() {
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const [sendText, setSendText] = useState("");
  const [recording, setRecording] = useState();
  const [recordingTime, setRecordingTime] = useState(0);

  const [messages, setMessages] = useState([
    { id : 0, user: "robot", type: "text", value: "Para funcionar, envie um texto ou um áudio para transcrição..." }
  ]);

  // Chamando o effect para configuração da permissão de uso de áudio
  useEffect(() => {
    (async () => {
      await requestPermission();

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: false, // Reproduzir através do alto-falante principal
        shouldDuckAndroid: false, // Evitar que outros sons reduzam o volume do áudio
      });
    })();
  }, []);

  async function startRecording() {
    setIsRecording(true);

    try {
      // Configurando a gravação dentro do IOS
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
      });

      // Instanciando a gravação do áudio
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HighQuality
      );

      // Salvando a referência da gravação
      setRecording(recording);

    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }
  
  async function stopRecording() {
    setIsRecording(false);
    setRecording(undefined);
    
    // Parando o processo de gravação
    await recording.stopAndUnloadAsync();

    // Gerando o arquivo da gravacao
    const uri = recording.getURI();

    // Chamando a funcao de conversao
    await SpeechToText(uri);
  }

  async function playSound( audio ) {
    try {
      // Parando a configuração de gravação do ios
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      // Aplicando a configuração de reprodução do áudio
      const { sound } = await Audio.Sound.createAsync(
        { uri: audio },
        { volume: 1.0, isMuted: false }
      );
  
      // Iniciando a reprodução
      await sound.playAsync();

    } catch (error) {
      console.error("Failed to play sound", error);
    }
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  async function TextToSpeech(){    
    await axios.post("http://192.168.21.109:4056/TextToSpeech", {
        Texto : sendText
      }, {
        'Content-Type': 'application/json'
      }).then( response => {
        setMessages([...messages,
          { id : messages.length, user : "voce", type : "text", value : sendText },
          { id : messages.length + 1, user : "robot", type : "audio", value : response.data.audioUrl },
        ]);

        setSendText("");
        setIsTyping(false);

      }).catch(error => {
        console.log(error);
      })
  }

  async function SpeechToText(uri){
    const form = new FormData()
    form.append("Arquivo", {
      uri: uri,
      name: `audio.m4a`,
      type: `audio/m4a`,
    });
    
    await axios.post("http://192.168.21.109:4056/SpeechToText", form, {
      headers : {
        "Content-Type" : "multipart/form-data"
      }
    }).then(response => {
      console.log(response.data);

      setMessages([ ...messages,
        { id : messages.length, user : "voce", type : "audio", value : uri },
        { id : messages.length + 1, user : "robot", type : 'text', value : response.data.texto }
      ])

    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    let interval;
    setRecordingTime(0);
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);

    } else {
      clearInterval(interval); // Limpa o intervalo se a gravação parar
    }
    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, [isRecording]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={require("./assets/robot.jpg")} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>Mrs. Robot</Text>
          <Text style={styles.statusRobot}>{ isTyping ? "Digitando..." : isRecording ? "Gravando..." : null}</Text>
        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.message,
                item.user == "robot" && styles.messageRobot,
              ]}
            >
              {
                item.type == "text"
                  ? <Text>{item.value}</Text>
                  : <TouchableOpacity onPress={() => playSound( item.value )}>
                    <MaterialIcons name="audiotrack" size={24} color="black" />
                  </TouchableOpacity>
              }
              
            </View>
          )}
          contentContainerStyle={styles.chatContainer}
        />

        <View style={styles.inputContainer}>
          {
            !recording
            ? <TextInput
                style={styles.input}
                placeholder="Digite sua mensagem..."

                value={sendText}
                onChangeText={ txt => {
                  setIsTyping( txt ?? false);
                  
                  setSendText(txt)
                }}
              />

            : <Text style={styles.recording}>Tempo de Gravação: { formatTime(recordingTime) }</Text>
          }

          {
            isTyping
              ? <TouchableOpacity
                  onPress={() => TextToSpeech()}
                  style={styles.buttonSend}
                >
                  <FontAwesome name="send" size={20} color="#fbfbfb" />
                </TouchableOpacity>

              : <TouchableOpacity
                  onPress={() => (recording ? stopRecording() : startRecording())}
                  style={styles.buttonSend}
                >
                  {
                    !isRecording
                      ? <MaterialIcons name="keyboard-voice" size={20} color="#fbfbfb" />
                      : <MaterialIcons name="stop" size={20} color="#fbfbfb" />
                  }
                </TouchableOpacity>
          }
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: 100,
    padding: "5%",
    elevation: 5,
    backgroundColor: "#496BBA",

    gap: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    color: "#fbfbfb",
    fontWeight: "bold",
  },
  statusRobot: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: 500,
    color: "#F9A620",
  },
  chatContainer: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  message: {
    width: "60%",
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#D9D9D9",

    alignSelf: "flex-end",
  },
  messageRobot: {
    alignSelf: "flex-start",
    backgroundColor: "#AAC5FF",
  },

  inputContainer: {
    gap: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 55,
    fontSize: 15,
    paddingHorizontal: 20,

    borderWidth: 2,
    borderRadius: 100,
    borderColor: "#D9D9D9",
    backgroundColor: "#F5F3F3",
  },
  buttonSend: {
    padding: 10,
    backgroundColor: "#60BFC5",
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "#49B3BA",
  },
  
  recording : {
    flex: 1,
    height: 55,
    padding: 20,
    fontSize: 15,
    borderRadius: 100,
    textAlign : 'center',
    backgroundColor: "#F5F3F3",
  }
});
