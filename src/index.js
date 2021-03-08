import 'bootstrap';
import Weather from './modules/weather';

const defaultData = function () {
  Weather.getWeather('Bangalore');
};

defaultData();
