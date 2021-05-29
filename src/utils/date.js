import moment from 'moment';

function calendarFormat(dateTime) {
  return moment(dateTime).calendar(null, {
    sameDay: '[Today from] h A',
    nextDay: '[Tomorrow] [from] h A',
    nextWeek: 'dddd DD MMMM [from] h A',
    sameElse: 'dddd DD MMMM [from] h A',
  });
}

export default {calendarFormat};
