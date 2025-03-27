import { getFusionHistorial } from '../../database/fusion.repository';

export const getHistorialService = async (limit: number,nextKey?:{ PK: string; SK: string }) => {
  return await getFusionHistorial(limit,nextKey);
};
