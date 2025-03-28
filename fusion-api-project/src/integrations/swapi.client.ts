import axios, { AxiosResponse } from 'axios';
import { GetAllCharacters, Planet} from './types/swapi.interface';
import swapiCharacterMockData from '../../tests/mockData/swapiCharacters.json'
import swapiPlanetMockData from '../../tests/mockData/swapiPlanet1.json'
import { IS_OFFLINE } from '../config/env';

export const fetchSWAPICharacters = async ():Promise<GetAllCharacters> => {
  if (IS_OFFLINE === 'true') return swapiCharacterMockData;
  const response = await axios.get('https://swapi.dev/api/people');
  return response.data;
};
export const fetchSWAPIPlanet = async (homeworldUrl:string):Promise<Planet> => {
  if (IS_OFFLINE === 'true') return swapiPlanetMockData;
  const resPlanet:AxiosResponse= await axios.get(homeworldUrl);
  const planet=resPlanet.data;
  return planet;
};