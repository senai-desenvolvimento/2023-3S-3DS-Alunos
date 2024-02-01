import { ContainerForm, ScrollForm } from "./style";
import { BoxInput } from "../../components/BoxInput";

export function Home(){

    //hooks - states

    //hooks - effect
        //chamada da API

    return(

        //ScrollForm
        //ContainerForm
        //BoxInput
            //Label
            //Input

        <ScrollForm>
            <ContainerForm>
                <BoxInput
                    textLabel= "informe o CEP"
                    placeholder="Cep..."
                    KeyType='numeric'
                    maxLenght={9}
                />
            </ContainerForm>
        </ScrollForm>

    )
}