import {
  ClinicCards,
  LocationClinic,
  Rating,
  NameClinic,
  TimeText,
  TimeView,
  ViewColumn,
  ViewRow,
} from "./style";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const ClinicCard = ({ selected, clinica, setClinica }) => {
  return (
    <ClinicCards
      selected={selected}

      onPress={() => setClinica({
        clinicaId : clinica.id,
        clinicaLabel : clinica.nomeFantasia
      })}
    >
      <ViewColumn>
        <NameClinic>{clinica.nomeFantasia}</NameClinic>

        <ViewRow>
          <LocationClinic>{clinica.endereco.cidade}</LocationClinic>

          <TimeView>
            <FontAwesomeIcon icon={faCalendar} size={14} color="#49B3BA" />

            <TimeText>Seg-Sex</TimeText>
          </TimeView>
        </ViewRow>
      </ViewColumn>
    </ClinicCards>
  );
};

export default ClinicCard;
