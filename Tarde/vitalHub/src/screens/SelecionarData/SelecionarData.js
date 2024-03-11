import CalendarComponent from "../../components/CalendarComponent/CalendarComponent";
import { Container } from "../../components/Container/Style";
import { TitleSelect } from "../../components/Title/Style";
import { Label } from "../../components/Label/Style";
import { Button } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { ButtonSecondary } from "../../components/Button/Style";
import { ButtonSecondaryTitle } from "../../components/ButtonTitle/Style";
import SelectInput from "../../components/SelectInput/SelectInput";

const SelecionarData = ({ navigation }) => {
  return (
    <Container>
      <TitleSelect>Selecionar data</TitleSelect>

      <CalendarComponent />

      <Label>Selecione um horário disponível</Label>

      <SelectInput />

      <Button>
        <ButtonTitle>
          Confirmar
        </ButtonTitle>
      </Button>

      <ButtonSecondary onPress={ () => navigation.replace("Main")}>
        <ButtonSecondaryTitle>
          Cancelar
        </ButtonSecondaryTitle>
      </ButtonSecondary>
    </Container>
  );
};

export default SelecionarData;
