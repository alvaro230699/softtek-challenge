import { ddb } from "../../src/database/dynamodb.client";
import { PutCommand, DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import {
  DYNAMODB_EARTH_TABLE,
  DYNAMODB_FUSION_TABLE,
  DYNAMODB_CACHE_TABLE,
  DYNAMODB_FUSION_PARTITION,
} from "../../src/config/env";
import {saveEarthLocations} from '../../src/database/earth.repository'
import { EarthLocation } from "../../src/database/types/earth.interface";

export const verifySeed = async (table:string) => {
  console.log(`🔍 Verificando datos en la tabla: ${table}...`);

  try {
    const command = new ScanCommand({
      TableName: table
    });

    const result = await ddb.send(command);
    const items = result.Items ?? [];

    console.log(`✅ Se encontraron ${items.length} registros.`);
  } catch (err: any) {
    console.error('❌ Error al escanear la tabla:', err.message);
  }
};

export const seedEarthTestData = async () => {
  console.log('🌱 Iniciando Earth seeding...');

  const earthLocations: EarthLocation[] = [
    {
      name: "Cairo",
      rotation_period: 24,
      orbital_period: 365,
      diameter: 12742,
      climate: "arid",
      terrain: "desert",
    },
    {
      name: "Reykjavik",
      rotation_period: 24,
      orbital_period: 365,
      diameter: 12742,
      climate: "frozen",
      terrain: "volcanoes",
    },
    {
      name: "Amazon Rainforest",
      rotation_period: 24,
      orbital_period: 365,
      diameter: 12742,
      climate: "tropical",
      terrain: "jungle",
    },
    {
      name: "Geneva",
      rotation_period: 24,
      orbital_period: 365,
      diameter: 12742,
      climate: "temperate",
      terrain: "mountains",
    },
  ];

  for (const loc of earthLocations) {
    const result = await saveEarthLocations(loc);
    console.log(`✅ Insertado ${result.content.name} con ID ${result.ID}`);
  }
  await Promise.all(
    earthLocations.map(async(loc) =>{
      const result = await saveEarthLocations(loc);
      console.log(`✅ Insertado ${result.content.name} con ID ${result.ID}`);
    }
    )
  );
  

  console.log('🌎 EarthLocation seed completado.');
  console.log('🧪 Verificando datos insertados...\n');
  await verifySeed(DYNAMODB_EARTH_TABLE);}

  // // 💾 Cache
  // await ddb.send(
  //   new PutCommand({
  //     TableName: DYNAMODB_CACHE_TABLE,
  //     Item: {
  //       PK: "test-cache-key",
  //       data: { message: "cached" },
  //       ttl: Math.floor(Date.now() / 1000) + 3600,
  //     },
  //   })
  // );
  export const seedHistoryTestData = async () => {
  console.log('🌱 Iniciando History seeding...');
  const now = new Date();
  for (let i = 0; i < 24; i++) {
    const date = new Date(now.getTime() - i * 60000).toISOString(); // -1 min por ítem
    await ddb.send(
      new PutCommand({
        TableName: DYNAMODB_FUSION_TABLE,
        Item: {
          PK: DYNAMODB_FUSION_PARTITION,
          SK: date,
          data: [
            {
              name: `Character ${i}`,
              earth_location: `Testland`,
              weather: {
                temperature: `${20 + i} °C`,
                description: "Sunny",
              },
            },
          ],
        },
      })
    );
  }
  console.log('🧪 Verificando datos insertados...\n');
  await verifySeed(DYNAMODB_FUSION_TABLE);
};

export const cleanTestData = async () => {
  console.log("CLEANING DATABASE....")
  const deleteAllFromTable = async (tableName: string, keyFields: string[]) => {
    const scan = await ddb.send(new ScanCommand({ TableName: tableName }));
    const items = scan.Items || [];

    for (const item of items) {
      const key: any = {};
      for (const field of keyFields) {
        key[field] = item[field];
      }

      await ddb.send(
        new DeleteCommand({
          TableName: tableName,
          Key: key,
        })
      );
    }
  };

  await deleteAllFromTable(DYNAMODB_EARTH_TABLE, ["ID"]);
  await deleteAllFromTable(DYNAMODB_CACHE_TABLE, ["PK"]);
  await deleteAllFromTable(DYNAMODB_FUSION_TABLE, ["PK", "SK"]);
};


