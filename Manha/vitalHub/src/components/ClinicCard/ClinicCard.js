import { ClinicCards, LocationClinic, Rating,
          NameClinic, TimeText, TimeView,
          ViewColumn, ViewRow  } from './style'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'

const ClinicCard = ({ nomeClinica, localClinica, avaliacao, horarioAtendimento}) => {
  return (
    <ClinicCards>
      <ViewColumn>
        <NameClinic>{nomeClinica}</NameClinic>

        <LocationClinic>{localClinica}</LocationClinic>
      </ViewColumn>

      <ViewColumn alignItems='flex-end'>
        <ViewRow>
          <FontAwesomeIcon icon={faStar} color='#F9A620' size={20}/>

          <Rating>{avaliacao}</Rating>
        </ViewRow>

        <TimeView>
          <FontAwesomeIcon icon={faCalendar} size={14} color='#49B3BA'/>

          <TimeText>{horarioAtendimento}</TimeText>
        </TimeView>

      </ViewColumn>
    </ClinicCards>
  );
};

export default ClinicCard;