import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const ButtonIconCancel = ({ navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.replace("Login");
      }}
    >
      <Feather name="x" size={30} color="#34898F" />
    </TouchableOpacity>
  );
};
