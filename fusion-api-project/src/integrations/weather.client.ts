import axios from 'axios';
import * as dotenv from 'dotenv';
import { Weather } from './types/weather.interface';
dotenv.config()
const OPENWEATHER_API= process.env.OPENWEATHER_API
export const fetchWeatherData = async (location): Promise<Weather> => {
  const response = await axios.get(`https://api.weatherapi.com/v1/current.json?q=${location}&key=${OPENWEATHER_API}`);
  return response.data;
};
// if (require.main === module) {
//   fetchWeatherData('london').then(data => {
//     console.log(data);
//   }).catch(error => {
//     console.error('Error fetching country data:', error);
//   });
// }