import {Character} from '../../integrations/types/swapi'
export interface EnrichedCharacter extends Character {
  matched_earth_location: string;
  weather: {
    temperature: string;
    description: string;
  };
}