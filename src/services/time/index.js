import * as moment from 'moment';

const time = {
  toYear: (timestamp) => {
    return moment.unix(timestamp).year();
  },
  current: (format = 'DD.MM.YYYY') => {
    return moment().format(format);
  },
  to: (timestamp, format = 'DD.MM.YYYY') => {
    return moment.unix(timestamp).format(format);
  },
  toTv: (timestamp) => {
    return moment(timestamp, 'X').calendar(null, {
      sameDay: 'HH:mm',
      lastDay: '[Вчера], HH:mm',
      sameElse: 'DD.MM.YYYY'
    })
  },
  isNow: (startTime, endTime) => {

    const now = moment().unix();

    if(startTime < now && now < endTime){
      return 'сейчас в эфире'
    }
    if(endTime < now){
      return "efirda bo'lib o'tdi"
    }
    if(startTime > now){
      return 'скоро в эфире'
    }
  },
  isNowBool: (startTime, endTime) => {

    const now = moment().unix();

    if(startTime < now && now < endTime){
      return true
    }
  },
  isNextBool: (startTime, endTime) => {

    const now = moment().unix();

    if(startTime > now){
      return true
    }
  },
  getDay: (day, activeDate) => {
    const currDay = new Date().getDay();

    let dd = moment.unix(activeDate).format("YYYYMMDD");
    let ndd = moment(dd).startOf('day').add(6, 'hours');

    let ddStart = Number(moment(ndd).format("X"));
    let ddEnd = ddStart + 86399;

    return {
      start: ddStart - ((currDay - day) * 86400),
      end: ddEnd - ((currDay - day) * 86400)
    }

  }
};

export default time;
