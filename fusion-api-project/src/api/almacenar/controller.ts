import { EarthLocation } from '../../database/types/earth.interface';
import { saveCustomDataService } from './service';

export const saveCustomDataController = async (data: EarthLocation) => {
  return await saveCustomDataService(data);
};