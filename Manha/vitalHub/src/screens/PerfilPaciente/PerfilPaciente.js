import {
  Container,
  ContainerFlex,
  ContainerImage,
  ContainerScroll,
} from "../../components/Container/Style";
import { ProfileImageLarge } from "../../components/ProfileImage/Style";
import { Title, Subtitle } from "../../components/Title/Style";
import { Button, ButtonLogout } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { Label, LabelSmall } from "../../components/Label/Style";
import { Input, InputSmall } from "../../components/Input/Style";
import { ContentInputSmall } from "./Style";

const PerfilPaciente = () => {

  return (
    <ContainerScroll>
      <Container>
        <ContainerImage>
          <ProfileImageLarge
            source={{ uri: "https://github.com/enzoquarelo.png" }}
          />
        </ContainerImage>

        <Title>Dr.Enzo Quarelo</Title>

        <Subtitle>22 anos enzo.quarelo@gmail.com</Subtitle>

        <Label>Data de nascimento</Label>
        <Input placeholder="dd/mm/aaaa" />

        <Label>CPF</Label>
        <Input placeholder="879********" />

        <Label>Endereço</Label>
        <Input placeholder="Rua Niterói,180" />

        <ContainerFlex>
          <ContentInputSmall>
            <LabelSmall>Cep</LabelSmall>
            <InputSmall placeholder="09330-098" />
          </ContentInputSmall>

          <ContentInputSmall>
            <LabelSmall>Cidade</LabelSmall>
            <InputSmall placeholder="SCS - SP" />
          </ContentInputSmall>
        </ContainerFlex>

        <Button>
          <ButtonTitle>Salvar</ButtonTitle>
        </Button>

        <Button>
          <ButtonTitle>Editar</ButtonTitle>
        </Button>

        <ButtonLogout onPress={() => {removerLogin()}}>
          <ButtonTitle>Sair do app</ButtonTitle>
        </ButtonLogout>
      </Container>
    </ContainerScroll>
  );
};

export default PerfilPaciente;
