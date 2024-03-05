import { ContainerFlex, ContainerImage, ContainerScroll } from "../../components/Container/Style";
import { ProfileImageLarge } from "../../components/ProfileImage/Style";
import { Title, Subtitle } from "../../components/Title/Style";
import { Button, ButtonEdit, ButtonLogout } from "../../components/Button/Style";
import { ButtonTitle } from "../../components/ButtonTitle/Style";
import { Label, LabelSmall } from "../../components/Label/Style";
import { Input, InputSmall } from "../../components/Input/Style";
import { ContentInputSmall } from "./Style";
import { Content } from "../MedicoProntuario/Style";


const PerfilPaciente = () => {
  return ( 
    <ContainerScroll>
      <Content>
        <ContainerImage>
          <ProfileImageLarge
            source={require("../../../assets/profileLargePatient.png")}
          />
        </ContainerImage>
        

        <Title>Richard Kosta</Title>

        <Subtitle>22 anos richard.kosta@gmail.com</Subtitle>

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

        <ButtonEdit>
          <ButtonTitle>Editar</ButtonTitle>
        </ButtonEdit>

        <ButtonLogout onPress={() => {}} >
          <ButtonTitle>Sair do app</ButtonTitle>
        </ButtonLogout>

      </Content>
    </ContainerScroll>
  );
};

export default PerfilPaciente;
