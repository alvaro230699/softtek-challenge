import { ddb } from './dynamodb.client';
import { PutCommand,ScanCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { EarthLocation, SavedEarthLocation } from './types/earth.interface';
import {DYNAMODB_EARTH_TABLE} from '../config/env'


export const saveEarthLocations = async (data: EarthLocation): Promise<SavedEarthLocation> => {
  const savedData={
    ID: uuidv4(),
    content:data,
    createdAt: new Date().toISOString()
  }
  const command = new PutCommand({
    TableName: DYNAMODB_EARTH_TABLE,
    Item: savedData
  });
  await ddb.send(command);
  return savedData;
};

export const getEarthLocations=async ():Promise<EarthLocation[]>=>{
  const command = new ScanCommand({
    TableName: DYNAMODB_EARTH_TABLE
  });

  const result = await ddb.send(command);
  // Extraer y devolver solo los datos "limpios"
  const items = result.Items ?? [];

  return items.map((item: any) => item.content as EarthLocation);
};

const earthLocations: EarthLocation[] = [
  {
    name: "Cairo",
    rotation_period: 24,
    orbital_period: 365,
    diameter: 12742,
    climate: "arid",
    terrain: "desert"
  },
  {
    name: "Reykjavik",
    rotation_period: 24,
    orbital_period: 365,
    diameter: 12742,
    climate: "frozen",
    terrain: "volcanoes"
  },
  {
    name: "Amazon Rainforest",
    rotation_period: 24,
    orbital_period: 365,
    diameter: 12742,
    climate: "tropical",
    terrain: "jungle"
  },
  {
    name: "Geneva",
    rotation_period: 24,
    orbital_period: 365,
    diameter: 12742,
    climate: "temperate",
    terrain: "mountains"
  }
];