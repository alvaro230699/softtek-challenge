import { APIGatewayProxyHandler } from 'aws-lambda';
import { getFusionadosController } from './controller';
import { buildResponse } from '../../../utils/formatter';
import { verifyToken } from '../../../middlewares/auth.middleware';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const token = event.headers?.Authorization || event.headers?.authorization;
    verifyToken(token); // Lanza error si no es válido

    const data = await getFusionadosController();
    return buildResponse(200, data);
  } catch (err: any) {
    return buildResponse(err.statusCode || 500, { error: err.message });
  }
};
