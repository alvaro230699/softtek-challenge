import { ddb } from './dynamodb.client';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import {DYNAMODB_CACHE_TABLE} from '../config/env'


export const getFromCache = async (key: string): Promise<any | null> => {
  const command = new GetCommand({
    TableName: DYNAMODB_CACHE_TABLE,
    Key: { PK: key }
  });
  const result = await ddb.send(command);
  return result.Item?.data || null;
};

export const setToCache = async (key: string, data: any, ttlMinutes: number): Promise<void> => {
  const ttl = Math.floor(Date.now() / 1000) + ttlMinutes * 60;
  const command = new PutCommand({
    TableName: DYNAMODB_CACHE_TABLE,
    Item: {
      PK: key,
      data,
      ttl
    }
  });
  await ddb.send(command);
};