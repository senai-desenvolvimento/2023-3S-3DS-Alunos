
import { StatusBar } from "react-native"
import { Container } from "../../components/Container/Style"
import { Header } from "../../components/Header/Header"
import { CalendarHome } from "../../components/CalendarHome/CalendarHome"

export const Home = () => {
    return(
        <Container>
            
            <StatusBar/>

            {/* Header */}
            <Header/>

            {/* Calendar */}
            <CalendarHome/>

            {/* Filtros (button) */}


            {/* Cards */}
            
        </Container>

    )
}