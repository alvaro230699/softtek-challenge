import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { logInfo, logError } from '../utils/logger';

type HandlerFunction = (event: APIGatewayEvent, context: Context, logger: typeof injectedLogger) => Promise<APIGatewayProxyResult>;

const injectedLogger = {
  info: (message: string, data: any = {}) => {},
  error: (message: string, error: any) => {}
};

export const withLogger = (handler: HandlerFunction) => {
  return async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const requestId = context.awsRequestId;

    const logger = {
      info: (message: string, data: any = {}) => logInfo(message, data, requestId),
      error: (message: string, error: any) => logError(message, error, requestId)
    };

    return handler(event, context, logger);
  };
};
