import axios from 'axios';
import * as dotenv from 'dotenv';
import { Weather } from './types/weather.interface';
import { OPENWEATHER_API } from '../config/env';
dotenv.config()

export const fetchWeatherData = async (location:String): Promise<Weather> => {
  const response = await axios.get(`https://api.weatherapi.com/v1/current.json?q=${location}&key=${OPENWEATHER_API}`);
  return response.data;
};