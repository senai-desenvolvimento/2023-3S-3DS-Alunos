import {
  MedicalCards,
  ProfileDataCard,
  ProfileName,
  SimpleText,
} from "./Style";
import { ProfileImageCard } from "../ProfileImage/Style";
import { useEffect } from "react";

const MedicalCard = ({ selected = true, medico, setMedico }) => {
  return (
    <MedicalCards
      selected={selected}
      onPress={() =>
        setMedico({ 
          medicoClinicaId: medico.id, 
          medicoLabel: medico.idNavigation.nome,
          medicoEspecialidade : medico.especialidade.especialidade1
        })
      }
    >
      <ProfileImageCard source={{ uri: medico.idNavigation.foto }} />

      <ProfileDataCard>
        <ProfileName>{medico.idNavigation.nome}</ProfileName>
        <SimpleText>{medico.especialidade.especialidade1}</SimpleText>
      </ProfileDataCard>
    </MedicalCards>
  );
};

export default MedicalCard;
