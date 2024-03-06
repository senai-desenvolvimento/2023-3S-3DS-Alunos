import { StyleSheet } from 'react-native';
import { StyledCalendarStrip } from './style'

import moment from 'moment-timezone';

const CalendarList = () => {
  // Configura o fuso horário padrão para UTC-3
  moment.tz.setDefault('America/Sao_Paulo');

  moment.updateLocale("pt-br", {
    months:
      "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
        "_"
      ),
    monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
    weekdays:
      "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split(
        "_"
      ),
    weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
    weekdaysMin : 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
  });
  
  const currentDate = new Date();
  const startingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endingDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  return (
    <StyledCalendarStrip 
      calendarAnimation={{ type: "sequence", duration: 30 }}
      daySelectionAnimation={ styles.selectedAnimationStyle }

      iconLeftStyle={styles.iconsStyle}
      iconRightStyle={styles.iconsStyle}

      selectedDate={currentDate}
      startingDate={moment()}

      minDate={startingDate}
      maxDate={endingDate}
      
      calendarHeaderStyle={ styles.calendarHeaderStyle }
      dateNumberStyle={ styles.numberDateStyle }
      dateNameStyle={ styles.nameDateStyle }

      highlightDateNameStyle={ styles.selectedDateNameStyle }
      highlightDateNumberStyle={ styles.selectedDateNumberStyle }
      highlightDateContainerStyle={ styles.selectedContainerStyle }

      iconContainer={{ flex: 0.1 }}
      // innerStyle={{ backgroundColor: 'green', flex:1, width : '100%'}}
      scrollable={true}
    />
  );
};

const styles = StyleSheet.create({
  iconsStyle : {
    display : 'none'
  },
  calendarHeaderStyle : {
    fontSize: 22,
    textAlign: "center",
    alignSelf : 'flex-start',
    color : '#4E4B59',
    fontFamily: "MontserratAlternates_600SemiBold",
    paddingHorizontal: 16
  },
  nameDateStyle : {
    color: "#ACABB7",
    fontSize: 12,
    textTransform : 'capitalize'
  },
  numberDateStyle : {
    color: "#5F5C6B",
    fontSize: 16
  },
  selectedDateNameStyle : {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textTransform : 'capitalize'
  },
  selectedDateNumberStyle : {
    color: "white",
    fontSize: 14
  },
  selectedContainerStyle : {
    backgroundColor: `#60BFC5`
  },
  selectedAnimationStyle : {
    type: "border",
    duration: 200,
    borderWidth: 2,
    borderHighlightColor: "#49B3BA"
  }
})

export default CalendarList;