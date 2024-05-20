import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import moment from 'moment'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const InputSelect = ({ setHoraSelecionada }) => {
  const dataAtual = moment().format('YYYY-MM-DD');
  const [arrayOptions, setArrayOptions] = useState(null);

  function LoadOptions(){
    // Conferir quantas horas faltam até as 24h
    const horasRestantes = moment(dataAtual).add(24, 'hours').diff( moment(), 'hours' );

    // Criar uma laço que rode a quantidade de horas que faltam
    const options = Array.from({ length : horasRestantes }, (_, index) => {
      let valor = new Date().getHours() + ( index  + 1 );

      return {
        label : `${valor}:00`, value : `${valor}:00`
      }
    })

    // Devolver para cada hora, uma nova opção no select
    setArrayOptions( options )
  }

  useEffect(() => {
    LoadOptions();
  }, [])

  return (
    <View style={{ width : '90%', marginTop: 15 }}>
      {
        arrayOptions != null
          ? (
            <RNPickerSelect
              // Marcacao para ignorar as configuracoes
              useNativeAndroidPickerStyle={false}
              style={selectStyle}
              Icon={() => {
                return <FontAwesomeIcon icon={faCaretDown} color='#34898F' size={22}/>
              }}
              placeholder={{
                label : "Selecione um horário",
                value : null,
                color : '#34898F'
              }}
              onValueChange={(value) => setHoraSelecionada(value)}
              items={ arrayOptions }
              itemStyle={{ // Estilo das opções
                fontSize: 16,
                color: 'pink', // Cor do texto rosa
                backgroundColor: 'black' // Cor de fundo preta
              }}
            />
          ) : (
            <ActivityIndicator />
          )
      }
    </View>
  )
}

const selectStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding : 16,
    borderWidth: 2,
    borderColor: '#60BFC5',
    borderRadius: 5,
    color: '#34898F',
    // alignContent: 'center',
    alignItems : 'center',
    justifyContent : 'center',
    fontFamily : 'MontserratAlternates_600SemiBold'
  },
  inputAndroid: {
    fontSize: 16,
    padding : 16,
    borderWidth: 2,
    borderColor: '#60BFC5',
    borderRadius: 5,
    color: '#34898F',
    alignItems: 'center',
    justifyContent : 'center',
    
    fontFamily : 'MontserratAlternates_600SemiBold'
  },
  iconContainer : {
    top : '25%',
    marginRight : 10
  },
  placeholder : {
    color: '#34898F',
  }
})

export default InputSelect