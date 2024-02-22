import { AntDesign } from "@expo/vector-icons";
import {
  ButtonCard,
  ButtonText,
  ClockCard,
  ContainerCardsList,
  ContentCard,
  DataProfileCard,
  ProfileData,
  ProfileImage,
  ProfileName,
  TextAge,
  TextBold,
  ViewRow,
} from "./Style";

export const AppointmentCard = ({
  situacao = "pendente",
  onPressCancel,
  onPressAppointment,
}) => {
  return (
    // container principal
    <ContainerCardsList>
      {/* imagem de perfil */}
      <ProfileImage source={{ uri: "https://github.com/ojuaum1.png" }} />

      {/* conteúdo ao lado da imagem de perfil */}
      <ContentCard>
        <DataProfileCard>
          <ProfileName>João</ProfileName>

          <ProfileData>
            <TextAge>45 anos</TextAge>
            <TextBold>Rotina</TextBold>
          </ProfileData>
        </DataProfileCard>

        <ViewRow>
          <ClockCard situacao={situacao}>
            <AntDesign
              name="clockcircle"
              size={14}
              color={situacao == "pendente" ? "#49B3BA" : "#8C8A97"}
            />

            <TextBold situacao={situacao} color={"#49B3BA"}>
              14:00
            </TextBold>
          </ClockCard>

            {/* valida e mostra o tipo de botão conforme a situação */}

            {
                situacao == "cancelado" ? (
                    <>
                    </>
                ) : situacao == "pendente" ? (
                    <ButtonCard onPress={onPressCancel}>
                        <ButtonText situacao={situacao}>Cancelar</ButtonText>
                    </ButtonCard>
                ) : (
                    <ButtonCard onPress={onPressAppointment}>
                        <ButtonText situacao={situacao}>Ver Prontuário</ButtonText>
                    </ButtonCard>
                )
            }

          
        </ViewRow>
      </ContentCard>
    </ContainerCardsList>
  );
};
