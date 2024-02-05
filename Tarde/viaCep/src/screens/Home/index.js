// http://192.168.19.142:3000/cep
// http://192.168.21.105:3000/cep

import { BoxInput } from "../../components/BoxInput";
import { ContainerForm, ContainerInput, ScrollForm } from "./style";
import { useState } from "react";

export function Home() {
  // states - variáveis
  const [cep, setCep] = useState("07181230");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [uf, setUf] = useState("");

  // useEffect - funções
  return (
    <ScrollForm>
      <ContainerForm>
        <BoxInput
          textLabel="informar CEP"
          placeholder="Cep..."
          editable={true}
          keyType="numeric"
          maxLength={9}
          fieldValue={cep}
          onChangeText={(tx) => setCep(tx)}
        />
        <BoxInput
          textLabel="Logradouro"
          placeholder="Logradouro..."
          fieldValue={logradouro}
        />

        <BoxInput
          fieldValue={bairro}
          textLabel="Bairro"
          placeholder="Bairro..."
          editable={true}
        />
        <BoxInput
          fieldValue={cidade}
          textLabel="Cidade"
          placeholder="Cidade..."
          editable={true}
        />
        <ContainerInput>
          <BoxInput
            textLabel="Estado"
            placeholder="Estado..."
            fieldWidth={60}
            fieldValue={estado}
          />
          <BoxInput
            fieldValue={uf}
            textLabel="UF"
            placeholder="UF..."
            fieldWidth={20}
          />
        </ContainerInput>
      </ContainerForm>
    </ScrollForm>
  );
}
