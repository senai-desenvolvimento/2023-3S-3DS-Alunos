import { ContainerForm, RowContainer, ScrollForm } from "./style";
import { BoxInput } from "../../components/BoxInput";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  //hooks - states e variables
  const [cep, setCep] = useState("07181230");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [uf, setUf] = useState("");

  //hooks - effect e functions
  useEffect(async () => {
    //chamada da API
    try {
      if (cep != "" && cep.length === 8) {
        const endereco = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );

        if(endereco.error) {
            alert("Verifique o CEP");
            return;
        }


        setLogradouro(endereco.data.logradouro);
        setBairro(endereco.data.bairro);
        setCidade(endereco.data.localidade);
        setEstado(endereco.data.uf);
        setUf(endereco.data.uf);
      }
    } catch (error) {
      console.log("Erro ao buscar o CEP");
      console.log(error);
    }
  }, []);//array dependências



// ao carregar do componente
  useEffect(() => {

  }, []);//array dependências

// ao carregar do componente
// ao alterar do xpto
  useEffect(() => {

  }, [xpto]);//array dependências

  // ao carregar do componente
// ao alterar do xpto
// ao desmontar do componente
  useEffect(() => {
    return alert("fui desmontado,morri!!");
  }, [xpto]);//array dependências



  // ao carregar do componente
// loop infinito
  useEffect(() => {
    return alert("fui desmontado,morri!!");
  });//sem array dependências - programador esqueceu!





















  return (
    //ScrollForm
    //ContainerForm
    //BoxInput
    //Label
    //Input

    <ScrollForm>
      <ContainerForm>
        <BoxInput
          textLabel="Informar CEP:"
          placeholder="Cep..."
          KeyType="numeric"
          // maxLenght={9}
          editable={true}
          fieldValue={cep}
          onChangeText={(tx) => setCep(tx)}
        />
        <BoxInput
          textLabel="Logradouro:"
          placeholder="Logradouro..."
          fieldValue={logradouro}
        />
        <BoxInput
          textLabel="Bairro:"
          placeholder="Bairro..."
          fieldValue={bairro}
        />
        <BoxInput
          textLabel="Cidade:"
          placeholder="Cidade..."
          fieldValue={cidade}
        />

        <RowContainer>
          <BoxInput
            textLabel="Estado:"
            placeholder="Estado..."
            fieldWidth={70}
            fieldValue={estado}
          />
          <BoxInput
            textLabel="UF:"
            placeholder="UF..."
            fieldWidth={23}
            fieldValue={uf}
          />
        </RowContainer>
      </ContainerForm>
    </ScrollForm>
  );
}
