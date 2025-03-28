import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import {IS_OFFLINE,DYNAMODB_LOCAL_ENDPOINT} from '../config/env';


const client = new DynamoDBClient({...(IS_OFFLINE=='true' && {
  endpoint: DYNAMODB_LOCAL_ENDPOINT
})});
export const ddb = DynamoDBDocumentClient.from(client);