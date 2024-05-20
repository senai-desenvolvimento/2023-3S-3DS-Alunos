import { useEffect, useState } from 'react';
import { Modal } from 'react-native'
import moment from 'moment'
import api from '../../service/service';
import { ActivityIndicator } from 'react-native';
import { userDecodeToken } from '../../utils/Auth';

import { AppointmentContent, ModalContent, TextModal,
          ModalImage, RowTextModal } from './style'

import { Title } from '../Title/Style';
import { ButtonTitle, ButtonSecondaryTitle } from '../ButtonTitle/Style';
import { ButtonModal, ButtonCancel } from '../Button/Style';


const AppointmentModal = ({consulta, roleUsuario, setDataConsulta, navigation, visible, setShowModalAppointment, ...rest}) => {
  const [load, setLoad] = useState(false)
  const [profile, setProfile] = useState(null)

  const [fotoUsuario, setFotoUsuario] = useState('')
  const [nomeUsuario, setNomeUsuario] = useState('')
  const [complementoUmUsuario, setComplementoUmUsuario] = useState('')
  const [complementoDoisUsuario, setComplementoDoisUsuario] = useState('')

  async function handleClose(stack){
    setLoad(true)

    await setShowModalAppointment(false)

    if( stack == "Local consulta" ){
      navigation.replace(stack, { clinica : consulta.medicoClinica.clinicaId })

    }else{
      // await api.put(`/Consultas/Status?consulta=${consulta.id}&status=D15FFCE2-6078-4F64-96F6-B80E7AC05012`)
      await api.put(`/Consultas/Status?consulta=${consulta.id}&status=Realizados`)
      .then( async () => {
        await setDataConsulta( moment() )

        navigation.replace(stack, { consultaId : consulta.id })
      }).catch( error => {
        console.log( error )
      })
    }
    
    setLoad(false)
  }

  async function profileLoad(){
    const token = await userDecodeToken()

    if( token ){
      if( token.role === "Paciente"){
        setFotoUsuario( consulta.medicoClinica.medico.idNavigation.foto );
        setNomeUsuario( consulta.medicoClinica.medico.idNavigation.nome );
        setComplementoUmUsuario( consulta.medicoClinica.medico.especialidade.especialidade1 );
        setComplementoDoisUsuario( `CRM-${consulta.medicoClinica.medico.crm}` );
        
      }else{
        setFotoUsuario( consulta.paciente.idNavigation.foto );
        setNomeUsuario( consulta.paciente.idNavigation.nome );
        setComplementoUmUsuario( `${moment(moment() ).diff(consulta.paciente.dataNascimento, 'years')} anos` );
        setComplementoDoisUsuario( consulta.paciente.idNavigation.email );
      }

      await setProfile( token )
    }
  }

  useEffect(() => {    
    if( visible ){
      profileLoad()
    }
  }, [visible])

  return ( 
    <Modal {...rest} visible={visible} transparent={true} animationType='fade' animationOutTiming={0}>
      <AppointmentContent>
        <ModalContent>
          {
            profile
              ? (<>
                  <ModalImage source={{ uri: fotoUsuario }} />
                  {/* <ModalImage source={require("../../../assets/nicolle.png")} /> */}

                  <Title>{nomeUsuario}</Title>

                  <RowTextModal>
                    <TextModal>{complementoUmUsuario}</TextModal>

                    <TextModal>{complementoDoisUsuario}</TextModal>
                  </RowTextModal>

                  {
                    profile.role === 'Medico'
                    ? (
                      <ButtonModal
                        disabled={load}
                        onPress={() => handleClose("Prontuario")}
                        // onPress={() => handleClose("Medico Prontuario")}
                      >
                        {
                          load
                            ? <ActivityIndicator color={'#fbfbfb'} />
                            : <ButtonTitle >Inserir Prontuário</ButtonTitle>
                        }
                      </ButtonModal>
                    ) : (
                      <ButtonModal
                        disabled={load}
                        onPress={() => handleClose("Local consulta")}
                      >
                        {
                          load
                            ? <ActivityIndicator color={'#fbfbfb'} />
                            : <ButtonTitle >Ver local da consulta</ButtonTitle>
                        }
                      </ButtonModal>
                    )
                  }

                  <ButtonCancel onPress={() => setShowModalAppointment(false)}>
                    <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                  </ButtonCancel>
                </>
              ) : (
                <ActivityIndicator />
              )
          }
        </ModalContent>                                                     
      </AppointmentContent>
    </Modal>
  );
};

export default AppointmentModal