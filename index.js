console.log('Loading "working_hours" function');

var options = {
    'timeZone': 'America/Sao_Paulo',
    'weekDays': {
        'beginHour': 8,
        'beginMinute': 0,
        'endHour': 18,
        'endMinute': 0
    },
    'saturday': {
        'beginHour': 8,
        'beginMinute': 0,
        'endHour': 18,
        'endMinute': 0
    }
}

function offsetTime(location) {
    console.log('Loading "offsetTime" method for ' + location);
    var localTime = new Date().toLocaleString("en-US", {
        timeZone: location
    });
    var result = new Date(localTime);
    console.log('timestamp: ' + result);
    return result;
}

function currentStatus(date, options) {
    console.log('Loading "currentStatus" method')
    var day = date.getDay();
    var hour = date.getHours();
    var minute = date.getMinutes();
    
    if (day == 0){
      return false;
    }
    if (day == 6) {
        if (hour >= options.saturday.beginHour && hour <= options.saturday.endHour) {
            if (hour == options.saturday.beginHour) {
                if (minute >= options.saturday.beginMinute) {
                    return true;
                } else {
                    return false;
                }
            } else if (hour == options.saturday.endHour) {
                if (minute <= options.saturday.endMinute) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    } else { 
        if (hour >= options.weekDays.beginHour && hour <= options.weekDays.endHour) {
            if (hour == options.weekDays.beginHour) {
                if (minute >= options.weekDays.beginMinute) {
                    return true;
                } else {
                    return false;
                }
            } else if (hour == options.weekDays.endHour) {
                if (minute <= options.weekDays.endMinute) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}

function copa (now){
  //Configura????o das horas
  var beginHour1 = new Date(2022, 10, 24, 14, 30, 00, 00);
  var endHour1 = new Date(2022, 10, 24, 18, 00, 00, 00);
  var beginHour2 = new Date(2022, 10, 28, 12, 00, 00, 00);
  var endHour2 = new Date(2022, 10, 28, 15, 00, 00, 00);
  var beginHour3 = new Date(2022, 11, 2, 14, 30, 00, 00);
  var endHour3 = new Date(2022, 11, 2, 18, 00, 00, 00);

  if(beginHour1 < now && endHour1 > now){
    return false;
  } else if(beginHour2 < now && endHour2 > now){
    return false;
  } else if(beginHour3 < now && endHour3 > now){
    return false;
  } else {
    return true;
  }
}

//Sempre usar M??s-1
//Ex: Dezembro = 11, Novembro = 10
//Sim, javascript faz essa desgra??a com datas
//Att, Vinicius Petratti. 14.11.2022 <- aqui ?? novembro mesmo
function feriados(now){
  var feriados = [
    "15/10/2022"
  ]

  parsedNow = now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear()

  if(feriados.includes(parsedNow)){
    return true
  } else {
    return false
  }
}

function trigger() {
  var currentdate = offsetTime(options.timeZone);
  var rescopa = copa(currentdate);
  var feriado = feriados(currentdate);
  if(feriado){
    return false
  } else if (rescopa){
    return currentStatus(currentdate, options);
  } else {
    attributeApi.set('horarioCopa', true)
    return false;  
  } 
}

var dataPayload = trigger();
console.log(dataPayload);
attributeApi.set('result',dataPayload);
attributeApi.set('date',new Date);
