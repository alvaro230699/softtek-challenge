import { APIGatewayProxyHandler } from 'aws-lambda';
import { saveCustomDataController } from './controller';
import { buildResponse,buildErrorResponse } from '../../utils/formatter';
import { withLogger } from '../../middlewares/withLogger.middleware';
// import { verifyToken } from '../../../middlewares/auth.middleware';

export const handler: APIGatewayProxyHandler = withLogger(async (event,context,logger) => {
  try {
    const token = event.headers?.authorization || event.headers?.Authorization;
    // verifyToken(token);
    logger.info("initialization...")
    const body = JSON.parse(event.body || '{}');
    const result = await saveCustomDataController(body);

    return buildResponse(201, result,context);
  } catch (err: any) {
    return buildErrorResponse(err,context);
  }
});