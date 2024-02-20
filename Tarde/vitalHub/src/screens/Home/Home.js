import { useState } from "react"
import { BtnListAppointment } from "../../components/BtnListAppointment/BtnListAppointment"
import { CalendarHome } from "../../components/CalendarHome/CalendarHome"
import { Container } from "../../components/Container/Style"
import { Header } from "../../components/Header/Header"
import { FilterAppointment } from "./Style"
import { ListComponent } from "../../components/List/List"
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard"

const Consultas = [
    { id: 1, nome: "Carlos", situacao: "pendente" },
    { id: 2, nome: "Carlos", situacao: "realizado" },
    { id: 3, nome: "Carlos", situacao: "cancelado" },
    { id: 4, nome: "Carlos", situacao: "realizado" },
    { id: 5, nome: "Carlos", situacao: "cancelado" },
];

export const Home = () => {

    const [statusLista, setStatusLista] = useState("pendente")

    return(
        <Container>

            {/* Header */}
            <Header/>

            {/* Calendário */}
            <CalendarHome/>

            {/* Filtros (botões) */}
            {/* Container */}
            <FilterAppointment>

                {/* botão para agendadas */}
                <BtnListAppointment
                textButton={"Agendadas"}
                clickButton={statusLista === "pendente"}
                onPress={() => setStatusLista("pendente")}
                />

                {/* botão para realizadas */}
                <BtnListAppointment
                textButton={"Realizadas"}
                clickButton={statusLista === "realizado"}
                onPress={() => setStatusLista("realizado")}
                />

                {/* botão para canceladas */}
                <BtnListAppointment
                textButton={"Canceladas"}
                clickButton={statusLista === "cancelado"}
                onPress={() => setStatusLista("cancelado")}
                />

            </FilterAppointment>


            {/* Seção de Cards */}

            

            {/* Lista */}
            <ListComponent
                data={Consultas}
                keyExtractor={(item) => item.id}

                renderItem={({item}) =>
                    statusLista == item.situacao && (
                        
                        <AppointmentCard
                            situacao={item.situacao}
                        />
                    )
                }
            />




        </Container>

    )
}

//<FontAwesome name="calendar"
//FontAwesome5 name="user-circle"
