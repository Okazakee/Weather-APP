import moment from 'moment';

// Date info from system
const currentDate = moment();
const formatDate = currentDate.format('dddd D,');
const formatMonth = currentDate.format('MMM');
const formatTime = currentDate.format('hh:mm A');

// Testing cities obj
export const cities = [{
  name: "London",
  date: formatDate,
  month: formatMonth,
  hour: formatTime,
  weatherType: "sunnyAndRainy",
  temperature: 18
},
{
  name: "Turin",
  date: formatDate,
  month: formatMonth,
  hour: formatTime,
  weatherType: "sunny",
  temperature: 22
},
{
  name: "Rome",
  date: formatDate,
  month: formatMonth,
  hour: formatTime,
  weatherType: "cloudy",
  temperature: 20
}];