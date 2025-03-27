import { ddb } from './dynamodb.client';
import { PutCommand,QueryCommand } from '@aws-sdk/lib-dynamodb';
import { EnrichedCharacter } from '../api/fusionados/model';
import {DYNAMODB_FUSION_TABLE,DYNAMODB_FUSION_PARTITION} from '../config/env'


export const saveFusionRecord = async (data: EnrichedCharacter[]): Promise<void> => {
  const timestamp = new Date().toISOString();

  const command = new PutCommand({
    TableName: DYNAMODB_FUSION_TABLE,
    Item: {
      PK: DYNAMODB_FUSION_PARTITION,
      SK: timestamp,
      data
    }
  });

  await ddb.send(command);
};

export const getFusionHistorial = async (limit = 10, lastKey?: { PK: string; SK: string }) => {
  const command = new QueryCommand({
    TableName: DYNAMODB_FUSION_TABLE,
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': DYNAMODB_FUSION_PARTITION
    },
    ScanIndexForward: false, // orden cronológico descendente
    Limit: limit,
    ExclusiveStartKey: lastKey
  });

  const result = await ddb.send(command);

  return {
    items: result.Items || [],
    nextKey: result.LastEvaluatedKey || null
  };
};