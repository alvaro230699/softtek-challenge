import {Character} from '../../integrations/types/swapi.interface'
export interface EnrichedCharacter extends Character {
  earth_location: string;
  weather: {
    temperature: string;
    description: string;
  };
}