import React from "react";

import { Button, Text, View } from "react-native";

const Navegacao = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      
      <Button title="Login" onPress={() => navigation.navigate("Login")} />

      <Button
        title="Medico-Prontuario"
        onPress={() => navigation.navigate("Medico Prontuario")}
      />

      <Button
        title="Paciente-Prontuario"
        onPress={() => navigation.navigate("Paciente Prontuario")}
      />

      <Button
        title="Selecionar Medico"
        onPress={() => navigation.navigate("Selecionar Medico")}
      />

      <Button
        title="Paciente Perfil"
        onPress={() => navigation.navigate("Paciente Perfil")}
      />

      <Button
        title="Local Consulta"
        onPress={() => navigation.navigate("Local Consulta")}
      />

      <Button
        title="Criar Conta"
        onPress={() => navigation.navigate("Cadastro")}
      />

      <Button
        title="Esqueci a senha"
        onPress={() => navigation.navigate("Recuperar Senha")}
      />

      <Button
        title="Redefinir a senha"
        onPress={() => navigation.navigate("Redefinir Senha")}
      />

      <Button
        title="Verifique seu email"
        onPress={() => navigation.navigate("Verifique seu e-mail")}
      />

      <Button
        title="Selecionar Clinica"
        onPress={() => navigation.navigate("Selecionar clinica")}
      />

      <Button
        title="Recuperar Senha"
        onPress={() => navigation.navigate("Recuperar Senha")}
      />

      <Button
        title="Home"
        onPress={() => navigation.navigate("Home")}
      />

      <Button
        title="Calendar"
        onPress={() => navigation.navigate("Calendar")}
      />
    </View>
  );
};

export default Navegacao;
