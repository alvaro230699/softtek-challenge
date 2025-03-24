import axios from 'axios';
import { GetAllCharacters } from './types/swapi.interface';

export const fetchSWAPICharacters = async ():Promise<GetAllCharacters> => {
  const response = await axios.get('https://swapi.dev/api/people');
  return response.data.results;
};