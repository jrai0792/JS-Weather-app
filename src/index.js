import 'bootstrap';
import Weather from './modules/weather';
import getDate from './modules/date';

const defaultData = function() {
  Weather.getWeather("Bangalore");
}

defaultData();
