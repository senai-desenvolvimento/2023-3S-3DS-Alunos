import { MedicalCards, ProfileDataCard, ProfileName, SimpleText } from "./Style";
import { ProfileImageCard } from "../ProfileImage/Style";

const MedicalCard = ({selected = true}) => {
  return (
    <MedicalCards selected={selected}>
      <ProfileImageCard source={require("../../../assets/usman.jpg")} />

      <ProfileDataCard>
        <ProfileName>Dr Usman</ProfileName>
        <SimpleText>Cardiologista</SimpleText>
      </ProfileDataCard>
    </MedicalCards>
  );
};

export default MedicalCard;
