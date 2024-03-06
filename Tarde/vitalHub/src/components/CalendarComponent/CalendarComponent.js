import { useEffect, useState } from "react";
import moment from 'moment-timezone';
import { Calendar, LocaleConfig } from "react-native-calendars";

const CalendarComponent = () => {
  const [selected, setSelected] = useState("");

  const currentDate = new Date();
  const startingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

  // Configura o fuso horário padrão para UTC-3
  moment.tz.setDefault('America/Sao_Paulo');

  LocaleConfig.locales["pt-br"] = {
    monthNames: [
      "Janeiro", "Fevereiro", "Março", "Abril",
      "Maio", "Junho", "Julho", "Agosto",
      "Setembro", "Outubro", "Novembro", "Dezembro",
    ],
    monthNamesShort: [
      "Jan", "Fev", "Mar", "Abr", "Mai",
      "Jun", "Jul", "Ago", "Set", "Out",
      "Nov", "Dez",
    ],
    dayNames: [
      "Domingo", "Segunda", "Terça", "Quarta",
      "Quinta", "Sexta", "Sábado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  };
  LocaleConfig.defaultLocale = "pt-br";

  return (
    <Calendar
      style={{
        width : 360,
        alignSelf : 'center',
        backgroundColor : '#FAFAFA',
      }}
    
      onDayPress={(day) => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {
          selected: true,
          disableTouchEvent: true
        },
      }}

      minDate={ moment(startingDate).format('YYYY-MM-DD') }

      theme={{
        calendarBackground : '#FAFAFA',
        arrowColor : '#49B3BA',
        textDisabledColor : '#C6C5CE',     
        todayTextColor : '#5F5C6B',   
        selectedDayTextColor: '#FAFAFA',
        selectedDayBackgroundColor: '#60BFC5',

        textDayFontSize : 16,
        textMonthFontSize : 20,
        textDayHeaderFontSize : 12,

        textDayStyle : { "color" : '#5F5C6B'},

        textDayFontFamily: "Quicksand_600SemiBold",
        textDayHeaderFontFamily: "Quicksand_600SemiBold",
        textMonthFontFamily: "MontserratAlternates_600SemiBold",
      }}
    />
  );
};

export default CalendarComponent;