import { BoxInput } from "../../components/BoxInput";
import { ContainerForm, ScrollForm } from "./style";

export function Home() {
  return (
    <ScrollForm>
      <ContainerForm>
        <BoxInput
            textLabel='informar CEP'
            placeholder='Cep...'
            keyType='numeric'
            maxLength={9}
        />
        <BoxInput
            textLabel='informar CEP'
            placeholder='Cep...'
            keyType='numeric'
            maxLength={9}
        />
      </ContainerForm>
    </ScrollForm>
  );
}