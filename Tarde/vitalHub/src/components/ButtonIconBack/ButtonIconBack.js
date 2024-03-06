import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const ButtonIconBack = ({ navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.replace("Login");
      }}
    >
      <AntDesign name="arrowleft" size={30} color="#34898F"/>
    </TouchableOpacity>
  );
};
