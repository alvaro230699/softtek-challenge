import { saveEarthLocations } from '../../database/earth.repository';
import { EarthLocation, SavedEarthLocation } from '../../database/types/earth.interface';

export const saveCustomDataService = async (data: EarthLocation):Promise<SavedEarthLocation> => {
  return await saveEarthLocations(data);
};