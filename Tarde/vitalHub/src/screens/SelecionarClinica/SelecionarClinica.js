import ClinicCards from "../../components/ClinicCard/ClinicCard";
import { Container } from "../../components/Container/Style";
import { TitleSelect } from "../../components/Title/Style";

import { ListComponent } from '../../components/List/List'
import { Button, ButtonSecondary } from "../../components/Button/Style";
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/Style";

const clinicas = [
  {
    id: 1,
    nome: "Clinica Natureh",
    avaliacao: 5,
    localizacao: "São Paulo, SP",
    inicioAtividade: "Seg",
    fimAtividade: "Sex",
  },
  {
    id: 2,
    nome: "Diamond pró mulher",
    avaliacao: 4.8,
    localizacao: "São Paulo, SP",
    inicioAtividade: "Seg",
    fimAtividade: "Sex",
  },
  {
    id: 3,
    nome: "Clinica Villa Lobos",
    avaliacao: 4.2,
    localizacao: "Taboão, SP",
    inicioAtividade: "Seg",
    fimAtividade: "Sab",
  },
];

const SelecionarClinica = () => {
  return (
    // <Container enabled behavior={ Platform.OS === 'ios'? 'padding': null}>
    <Container>
      <TitleSelect>Selecionar clínica</TitleSelect>

      <ListComponent
        data={clinicas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClinicCards
            nomeClinica={item.nome}
            localClinica={item.localizacao}
            avaliacao={item.avaliacao}
            horarioAtendimento={`${item.inicioAtividade}-${item.fimAtividade}`}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button>
        <ButtonTitle>Continuar</ButtonTitle>
      </Button>

      <ButtonSecondary>
        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
      </ButtonSecondary>
    </Container>
  );
};

export default SelecionarClinica;
