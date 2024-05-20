import * as Notifications from "expo-notifications";

Notifications.requestPermissionsAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const handleCallNotifications = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    alert("Você não deixou as notificações ativas");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "VitalHub",
      body: "Consulta cancelada!",
    },
    trigger: {
      seconds: 5,
    },
  });
};