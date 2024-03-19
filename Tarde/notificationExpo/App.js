import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//importar os recursos do expo-notifications
import * as Notifications from "expo-notifications";

//solicita permissões de notificação ao iniciar o app
Notifications.requestPermissionsAsync();

//define como as notificações devem ser tratadas quando recebidas
Notifications.setNotificationHandler({
  handleNotification: async () => ({

    //mostrar o alerta quando a notificação for recebida
    shouldShowAlert: true,

    //reproduz som ao receber notificação
    shouldPlaySound: false,

    //número de notificações no ícone do app
    shouldSetBadge: false
  })
})

export default function App() {

  //função para lidar com chamada de notificação
  const handleCallNotifications = async () => {

    //obtém o status da permissão
    const {status} = await Notifications.getPermissionsAsync();

    //verifica se o usuário concedeu permissão
    if (status !== "granted") {
      alert("você não deixou as notificações ativas")
      return;
    }

    //agenda uma notificação
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Bem vindo ao SENAI!",
        body: "Notificação recebida."
      },
      trigger:null
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCallNotifications}>
        <Text style={styles.text}>Clique aqui !</Text>
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
  button : {
    width: "80%",
    height:50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  text : {
    color: "#FFF",
    fontWeight: "bold",
    fontSize:24
  }
});
