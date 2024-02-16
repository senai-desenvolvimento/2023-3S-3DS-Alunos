import { MaterialIcons } from '@expo/vector-icons';
import { ContainerHeader } from "../Container/Style"
import { BoxUser, DataUser, ImageUser, NameUser, TextDefault } from "./Style"

export const Header = () => {
    return(
        <ContainerHeader>
            <BoxUser>
                <ImageUser
                    source={{uri: "https://github.com/kauameloo.png"}}
                />
                <DataUser>
                    <TextDefault>Bem Vindo !</TextDefault>
                    <NameUser>Dr.Kauã</NameUser>
                </DataUser>
            </BoxUser>

            <MaterialIcons name="notifications" size={25} color="#fbfbfb" />

        </ContainerHeader>

    )
}