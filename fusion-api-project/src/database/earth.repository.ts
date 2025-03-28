import { ddb } from "./dynamodb.client";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { EarthLocation, SavedEarthLocation } from "./types/earth.interface";
import { DYNAMODB_EARTH_TABLE } from "../config/env";

export async function saveEarthLocations(
  data: EarthLocation
): Promise<SavedEarthLocation> {
  const savedData = {
    ID: uuidv4(),
    content: data,
    createdAt: new Date().toISOString(),
  };
  const command = new PutCommand({
    TableName: DYNAMODB_EARTH_TABLE,
    Item: savedData,
  });
  await ddb.send(command);
  return savedData;
}

export async function getEarthLocations(): Promise<EarthLocation[]> {
  const command = new ScanCommand({
    TableName: DYNAMODB_EARTH_TABLE,
  });
  const test=await ddb.config.endpoint;

  const result = await ddb.send(command);
  debugger;
  console.log(`Client db is \n\n\n ${JSON.stringify(result)}`);
  // Extraer y devolver solo los datos "limpios"
  const items = result.Items ?? [];

  return items.map((item: any) => item.content as EarthLocation);
}
