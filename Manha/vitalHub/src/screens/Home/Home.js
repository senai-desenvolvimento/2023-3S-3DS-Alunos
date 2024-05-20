import React, { useEffect, useState } from "react";

import { FilterAppointment } from "./styles";
import { ListComponent, ListComponentEmpty } from "../../components/List/List";

import Header from "../../components/Header/Header";
import AgendarConsulta from "../AgendarConsulta/AgendarConsulta"
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import CancellationModal from "../../components/CancellationModal/CancellationModal";
import AppointmentModal from "../../components/AppointmentModal/AppointmentModal";
import { ContainerHome } from "../../components/Container/Style";
import CalendarList from "../../components/CalendarList/CalendarList";
import AbsListAppointment from "../../components/AbsListAppointment/AbsListAppointment";
import { ConteinerScheduleImage, ImageScheduleAppointment } from "../../components/ScheduleAppointment/Style";

import { userDecodeToken } from "../../utils/Auth";
import api from '../../service/service'
import moment from "moment";

const Home = ({ navigation, route }) => {
  const [profile, setProfile] = useState({});
  const [consultas, setConsultas] = useState([]);
  const [dataConsulta, setDataConsulta] = useState('');
  const [statusLista, setStatusLista] = useState("Pendentes");
  const [consultaSelecionada, setConsultaSelecionada] = useState(null)

  // criando as constantes de exibição do modal
  const [showModalAgendamento, setShowModalAgendamento] = useState(false);
  const [showModalCancelar, setShowModalCancelar] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);

  async function ListarConsultas(){
    const url = (profile.role == 'Medico' ? "Medicos" : "Pacientes")

    await api.get(`/${url}/BuscarPorData?data=${ moment(dataConsulta).format('YYYY-MM-DD') }&id=${profile.user}`)
    .then( response => {
      setConsultas(response.data);
    }).catch( error => {
      console.log(error);
    })
  }

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token !== null) {
      setProfile(token);

      setDataConsulta( moment().format('YYYY-MM-DD') )
    }
  }

  useEffect(() => {
    profileLoad();
  }, []);

  function MostrarModal(modal, consulta){
    setConsultaSelecionada( consulta )

    if(modal == 'cancelar'){
      setShowModalCancelar(true)
    }else if(modal == 'prontuario'){
      setShowModalAppointment(true)
    }else{
      setShowModalAgendamento(true)
    }
  }

  useEffect(() => {
    if(dataConsulta != '' ){
      ListarConsultas();
    }
  }, [dataConsulta]);

  return (
    <ContainerHome>
      {/* component Header */}
      <Header navigation={navigation} />

      {/* component Calendar */}
      <CalendarList
        dataConsulta={ dataConsulta }
        setDataConsulta={ setDataConsulta }
      />

      {/* component buttons - status */}
      {/* container */}
      <FilterAppointment>
        {/* button */}
        <AbsListAppointment
          textButton={"Agendadas"}
          clickButton={statusLista === "Pendentes"}
          onPress={() => setStatusLista("Pendentes")}
        />
        {/* button */}
        <AbsListAppointment
          textButton={"Realizadas"}
          clickButton={statusLista === "Realizados"}
          onPress={() => setStatusLista("Realizados")}
        />
        {/* button */}
        <AbsListAppointment
          textButton={"Canceladas"}
          clickButton={statusLista == "Cancelados"}
          onPress={() => setStatusLista("Cancelados")}
        />
      </FilterAppointment>

      {/* component card list */}
      <ListComponent
        data={consultas}
        keyExtractor={(item) => item.id}
        renderItem={ ({ item }) =>
          statusLista == item.situacao.situacao && (
            <AppointmentCard
              situacao={item.situacao.situacao}
              navigation={navigation}

              consulta={ item.id }
              roleUsuario={ profile.role }
              dataConsulta={ item.dataConsulta }
              prioridade={ item.prioridade.prioridade }
              usuarioConsulta={ profile.role == "Medico" ? item.paciente : item.medicoClinica.medico }

              onConnectCancelar={() => MostrarModal('cancelar', item)}
              onConnectAppointment={() => MostrarModal('prontuario', item)}
            />
          )
        }
        showsVerticalScrollIndicator={false}

        ListEmptyComponent={() => (
          <ListComponentEmpty>
            Nenhuma consulta encontrada...
          </ListComponentEmpty>
        )}
      />

      {profile.role === "Paciente" && (
        <ConteinerScheduleImage
          onPress={() => {
            // alert("agendar");
            setShowModalAgendamento(true)
          }}
        >
          <ImageScheduleAppointment
            source={require("../../../assets/agendar.png")}
          />
        </ConteinerScheduleImage>
      )}

      {/* Passando direto a propriedade para exibicao do modal */}
      <CancellationModal
        consulta={ consultaSelecionada }
        setDataConsulta={ setDataConsulta }

        visible={showModalCancelar} //será exibido se state estiver em true
        setShowModalCancelar={setShowModalCancelar} //cancelar do modal - sair X
        navigation={navigation} //fazer posteriormente junto com a navegação
      />

      <AppointmentModal
        consulta={consultaSelecionada}
        setDataConsulta={setDataConsulta}

        visible={showModalAppointment}
        setShowModalAppointment={setShowModalAppointment}
        navigation={navigation} //fazer posteriormente junto com a navegação
      />

      {/* Modal de agendamento de consulta */}
      <AgendarConsulta
        visible={showModalAgendamento}
        setShowModalAgendamento={setShowModalAgendamento}  
        navigation={navigation} //fazer posteriormente junto com a navegação
      />
    </ContainerHome>
  );
};

export default Home;