import { APIGatewayProxyHandler } from 'aws-lambda';
import { getHistorialController } from './controller';
// import { verifyToken } from '../auth/verifyToken';
import { buildErrorResponse, buildResponse } from '../../utils/formatter';
import { withLogger } from '../../middlewares/withLogger.middleware';

export const handler: APIGatewayProxyHandler = withLogger(async (event,context,logger) => {
  try {
    // 🔐 Verificación del token
    const token = event.headers?.authorization || event.headers?.Authorization;
    // verifyToken(token);
    logger.info("initialization...")
    // 📥 Parámetros
    const limit = parseInt(event.queryStringParameters?.limit || '10', 10);
    const cursor = event.queryStringParameters?.cursor;

    let lastKey;
    if (cursor) {
      try {
        const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
        lastKey = JSON.parse(decoded);
      } catch (err) {
        return buildResponse(400, { error: 'Cursor inválido' },context);
      }
    }

    // 📄 Obtener historial con paginación real
    const { items, nextKey } = await getHistorialController(limit, lastKey);
    logger.info('Historial de fusiones obtenido', { items: items.length });

    return buildResponse(200, {
      data: items,
      nextCursor: nextKey ? Buffer.from(JSON.stringify(nextKey)).toString('base64') : null
    },context);

  } catch (err: any) {
    logger.error('Error en handler de historial', err);
    return buildErrorResponse(err, context);
  }
});
