import { APIGatewayProxyHandler } from "aws-lambda";
import { getFusionadosController } from "./controller";
import { buildErrorResponse, buildResponse } from "../../utils/formatter";
import { withLogger } from "../../middlewares/withLogger.middleware";
// import { verifyToken } from '../../../middlewares/auth.middleware';

export const handler: APIGatewayProxyHandler = withLogger(async (event,context,logger) => {
  try {
    const token = event.headers?.Authorization || event.headers?.authorization;
    // verifyToken(token); // Lanza error si no es válido
    logger.info("initialization...")
    const data = await getFusionadosController();
    return buildResponse(200, {data},context);
  } catch (err: any) {
    return buildErrorResponse(err, context);
  }
});
