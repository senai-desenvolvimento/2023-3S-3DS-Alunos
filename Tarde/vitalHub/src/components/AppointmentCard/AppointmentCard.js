import { AntDesign } from '@expo/vector-icons'

import { CardDasConsulta, NomePerfil, ImagePerfil,
          ConteudoCard, DadosPerfilCard, DadosPerfil,
          TextoSimples, TextoNegrito, ClockCard,
          ViewRow, ButtonCard, ButtonText } from './styles'

const AppointmentCard = ({ situacao = 'pendente', onConnectCancelar, onConnectAppointment }) => {
  return (
    <CardDasConsulta onPress={situacao == 'pendente' ? onConnectAppointment : null } >
      <ImagePerfil source={{ uri : "https://github.com/LucSilveira.png" }} />

      <ConteudoCard>
        <DadosPerfilCard>
          <NomePerfil>Niccole Sarga</NomePerfil>

          <DadosPerfil>
            <TextoSimples>22 anos</TextoSimples>
            <TextoNegrito>Rotina</TextoNegrito>
          </DadosPerfil>
        </DadosPerfilCard>

        <ViewRow>
          <ClockCard situacao={situacao}>
            <AntDesign name='clockcircle' size={14} color={situacao == 'pendente' ? '#49B3BA' : '#8C8A97'} />
            <TextoNegrito situacao={situacao} color={'#49B3BA'}>14:00</TextoNegrito>
          </ClockCard>

          { 
            situacao == 'cancelado'
              ? (
                <></>
              ) : situacao == 'pendente' ? (
                <ButtonCard onPress={onConnectCancelar}>
                  <ButtonText situacao={situacao}>Cancelar</ButtonText>
                </ButtonCard>
              ) : (
                <ButtonCard onPress={onConnectAppointment}>
                  <ButtonText situacao={situacao}>Ver prontuário</ButtonText>
                </ButtonCard>
              )
          }
        </ViewRow>
      </ConteudoCard>
    </CardDasConsulta>
  );
};

export default AppointmentCard