import axios from 'axios';
import * as dotenv from 'dotenv';
import { Weather } from './types/weather.interface';
import { IS_OFFLINE, OPENWEATHER_API } from '../config/env';
import weatherMockData from '../../tests/mockData/weather.json'

export const fetchWeatherData = async (location:String): Promise<Weather> => {
  if (IS_OFFLINE === 'true') return weatherMockData;
  const response = await axios.get(`https://api.weatherapi.com/v1/current.json?q=${location}&key=${OPENWEATHER_API}`);
  return response.data;
};