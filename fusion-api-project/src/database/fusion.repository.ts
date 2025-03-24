import { ddb } from './dynamodb.client';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { Fusionado } from '../api/fusionados/model';

const TABLE_NAME = 'FusionHistorial';

export const saveFusionRecord = async (data: Fusionado[]): Promise<void> => {
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      id: Date.now().toString(),
      data,
      createdAt: new Date().toISOString()
    }
  });
  await ddb.send(command);
};

export const getEarthLocations=():EarthLocation[]=>{
  return earthLocations;
};

type EarthLocation = {
  name: string;
  rotation_period: number; // duración día promedio (en horas)
  orbital_period: number;  // días por año
  diameter: number;        // diámetro en km
  climate: string;
  terrain: string;
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