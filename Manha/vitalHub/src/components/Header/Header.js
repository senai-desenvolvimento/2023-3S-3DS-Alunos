import { StatusBar } from "react-native";
import {
  ContainerHeader,
  ImageUser,
  BoxUser,
  DataUser,
  NomeUser,
  TextDefault,
  HeaderContent,
} from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

const Header = ({ navigation }) => {
  return (
    <ContainerHeader>
      <HeaderContent>
        <BoxUser onPress={ () => navigation.navigate("Paciente Perfil") } >
          <ImageUser source={{ uri: "https://github.com/LucSilveira.png" }} />

          <DataUser>
            <TextDefault>Bem vindo</TextDefault>
            <NomeUser>Dr. Claudio</NomeUser>
          </DataUser>
        </BoxUser>

        <MaterialIcons name="notifications" size={25} color={"#fbfbfb"} />
      </HeaderContent>
    </ContainerHeader>
  );
};

export default Header;
