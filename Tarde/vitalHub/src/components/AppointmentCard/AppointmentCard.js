import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  CardDasConsulta,
  NomePerfil,
  ImagePerfil,
  ConteudoCard,
  DadosPerfilCard,
  DadosPerfil,
  TextoSimples,
  TextoNegrito,
  ClockCard,
  ViewRow,
  ButtonCard,
  ButtonText,
} from "./styles";

import moment from "moment";
import { userDecodeToken } from "../../utils/Auth";

const AppointmentCard = ({
  navigation,
  consulta,
  situacao,
  roleUsuario,
  prioridade,
  dataConsulta,
  usuarioConsulta,
  onConnectCancelar,
  onConnectAppointment,
}) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function profileLoad() {
      setProfile( await userDecodeToken() );
    }

    profileLoad();
  }, []);

  return (
    <CardDasConsulta
      onPress={situacao == "Pendentes" ? onConnectAppointment : null}
    >
      {/* <ImagePerfil source={require("../../../assets/nicolle.png")} /> */}
      <ImagePerfil source={{ uri : `${usuarioConsulta.idNavigation.foto}` }} />

      <ConteudoCard>
        <DadosPerfilCard>
          <NomePerfil>{usuarioConsulta.idNavigation.nome}</NomePerfil>

          <DadosPerfil>
            {roleUsuario == "Medico" ? (
              <>
                <TextoSimples>
                  {moment(moment()).diff(
                    usuarioConsulta.dataNascimento,
                    "years"
                  )}{" "}
                  anos
                </TextoSimples>
              </>
            ) : (
              <>
                <TextoSimples>CRM {usuarioConsulta.crm}</TextoSimples>
              </>
            )}

            <TextoNegrito>
              {
                prioridade == 0
                  ? "Rotina"
                  : prioridade == 1
                      ? "Exame"
                      : "Urgência"}
            </TextoNegrito>
          </DadosPerfil>
        </DadosPerfilCard>

        <ViewRow>
          <ClockCard situacao={situacao}>
            <AntDesign
              name="clockcircle"
              size={14}
              color={situacao == "Pendentes" ? "#49B3BA" : "#8C8A97"}
            />
            <TextoNegrito situacao={situacao} color={"#49B3BA"}>
              {moment(dataConsulta).format("HH:mm")}
            </TextoNegrito>
          </ClockCard>

          {situacao == "Cancelados" ? (
            <></>
          ) : situacao == "Pendentes" ? (
            <ButtonCard onPress={onConnectCancelar}>
              <ButtonText situacao={situacao}>Cancelar</ButtonText>
            </ButtonCard>
          ) : (
            // <ButtonCard onPress={() => profile !== "Paciente" ? onConnectAppointment : navigation.replace("Paciente Prontuario") }>
            <ButtonCard
              onPress={() => navigation.replace("Prontuario", { consultaId : consulta })
                  // : () => navigation.replace("Paciente Prontuario")
              }
            >
              <ButtonText situacao={situacao}>Ver prontuário</ButtonText>
            </ButtonCard>
          )}
        </ViewRow>
      </ConteudoCard>
    </CardDasConsulta>
  );
};

export default AppointmentCard;
