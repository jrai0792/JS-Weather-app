import 'bootstrap';
import Weather from './modules/weather';

const defaultData = () => {
  Weather.getWeather('Bangalore');
};

defaultData();
