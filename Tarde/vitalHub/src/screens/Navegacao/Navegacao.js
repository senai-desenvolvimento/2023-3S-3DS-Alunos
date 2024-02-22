import { Button, View } from "react-native";

export const Navegacao = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button title="Recuperar Senha" onPress={() => navigation.navigate("Recuperar Senha")} />
      <Button title="Verifique seu e-mail" onPress={() => navigation.navigate("Verifique seu e-mail")} />
      <Button title="Redefinir Senha" onPress={() => navigation.navigate("Redefinir Senha")} />
      <Button title="Cadastro" onPress={() => navigation.navigate("Cadastro")} />
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};
