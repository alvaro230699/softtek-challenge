import { getHistorialService } from "./service";

export const getHistorialController = async (limit: number,nextKey?:{ PK: string; SK: string }) => {
  return await getHistorialService(limit,nextKey);
};