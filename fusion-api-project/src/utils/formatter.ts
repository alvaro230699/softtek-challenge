import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { logError } from './logger';

export const buildResponse = (
  statusCode: number,
  body: Record<string, any>,
  context?: Context
): APIGatewayProxyResult => {
  const requestId = context?.awsRequestId || uuidv4();

  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      success: statusCode >= 200 && statusCode < 300,
      requestId,
      ...body
    })
  };
};

export const buildErrorResponse = (
  err: any,
  context?: Context,
  defaultStatus = 500
): APIGatewayProxyResult => {
  const requestId = context?.awsRequestId || uuidv4();

  logError('Ocurrió un error en la ejecución', err, requestId);

  const statusCode = err.statusCode || defaultStatus;
  const message = err.message || 'Error interno del servidor';

  return buildResponse(statusCode, { error: message }, context);
};
