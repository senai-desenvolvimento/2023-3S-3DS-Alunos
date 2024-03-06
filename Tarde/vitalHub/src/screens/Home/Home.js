import React, { useState } from "react";

import { FilterAppointment } from "./styles";
import { ListComponent } from "../../components/List/List";

import Header from "../../components/Header/Header";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import CancellationModal from "../../components/CancellationModal/CancellationModal";
import AppointmentModal from "../../components/AppointmentModal/AppointmentModal";
import AgendarConsulta from "../AgendarConsulta/AgendarConsulta";
import { Container, ContainerHome } from "../../components/Container/Style";
import CalendarList from "../../components/CalendarList/CalendarList";
import AbsListAppointment from "../../components/AbsListAppointment/AbsListAppointment";

import {
  ConteinerScheduleImage,
  ImageScheduleAppointment,
} from "../../components/ConteinerScheduleImage/Style";
import { StatusBar } from "expo-status-bar";

//lista de consultas
const Consultas = [
  { id: 1, nome: "Lucas", situacao: "pendente" },
  { id: 2, nome: "Lucas", situacao: "realizado" },
  { id: 3, nome: "Lucas", situacao: "cancelado" },
  { id: 4, nome: "Lucas", situacao: "realizado" },
  { id: 5, nome: "Lucas", situacao: "cancelado" },
];

//tela home
const Home = () => {

  //state para status da lista - inicia em "pendente"
  const [statusLista, setStatusLista] = useState("pendente");

  // criando a constante de exibição do modal
  const [showModalCancelar, setShowModalCancelar] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);
  const [showModalAgendamento, setShowModalAgendamento] = useState(false);

  // state perfil usuário
  const [profile, setProfile] = useState("Paciente");

  return (
    <ContainerHome>
      
      {/* cria o header */}
      <Header />

      {/* cria o calendário */}
      <CalendarList />

      {/* cria seção do filtro das consultas */}
      <FilterAppointment>
        {/* cria botão para filtrar consultas - pendente */}
        <AbsListAppointment
          textButton={"Agendadas"}
          clickButton={statusLista === "pendente"}
          onPress={(e) => setStatusLista("pendente")}
        />
        {/* cria botão para filtrar consultas - realizado */}
        <AbsListAppointment
          textButton={"Realizadas"}
          clickButton={statusLista === "realizado"}
          onPress={(e) => setStatusLista("realizado")}
        />
        {/* cria botão para filtrar consultas - cancelado */}
        <AbsListAppointment
          textButton={"Canceladas"}
          clickButton={statusLista == "cancelado"}
          onPress={(e) => setStatusLista("cancelado")}
        />
      </FilterAppointment>

      {/* cria o mapeamento da lista de consultas (cards) */}
      <ListComponent
        data={Consultas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          statusLista == item.situacao && (
            // cria card de consulta da tela home
            <AppointmentCard
              situacao={item.situacao}
              onConnectCancelar={() => setShowModalCancelar(true)}
              onConnectAppointment={() => setShowModalAppointment(true)}
            />
          )
        }
        showsVerticalScrollIndicator={false}
      />

      {profile === "Paciente" && (
        <ConteinerScheduleImage onPress={() => setShowModalAgendamento(true)}>
          <ImageScheduleAppointment
            source={require("../../../assets/agendar.png")}
          />
        </ConteinerScheduleImage>
      )}

      {/* Passando direto a propriedade para exibicao do modal - cancelar */}
      <CancellationModal
        visible={showModalCancelar}
        setShowModalCancelar={setShowModalCancelar}
      />
      {/* Passando direto a propriedade para exibicao do modal - prontuário */}
      <AppointmentModal
        situacao={statusLista}
        visible={showModalAppointment}
        setShowModalAppointment={setShowModalAppointment}
      />

      <AgendarConsulta
        visible={showModalAgendamento}
        setShowModalAgendamento={setShowModalAgendamento}
      />
    </ContainerHome>
  );
};

export default Home;
