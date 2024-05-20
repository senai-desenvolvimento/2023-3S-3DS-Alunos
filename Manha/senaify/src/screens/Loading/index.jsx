import { ActivityIndicator } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { ImageLogo } from "../../components/Image/styles";
import { SubTitle } from "../../components/Text/Title/styles";

const Loading = () => {
  return (
    <LinearGradient
      style={{ flex : 1, alignItems : "center", justifyContent : "center", gap : 5 }}
      colors={['#2e0000', '#121212', '#121212', '#001b09']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.365, 0.7, 1]}
    >
      <ImageLogo
        resizeMode="contain"
        source={require("../../../assets/logo-light.png")}
      />

      <SubTitle>Leve suas playlists com você</SubTitle>

      <ActivityIndicator color="#fbfbfb" style={{marginTop : 80}}/>
    </LinearGradient>
  )
}

export default Loading;