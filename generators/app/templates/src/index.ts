import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

import logic from "./logic"

const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  const result = logic()

  return {
    isBase64Encoded: false,
    statusCode: 201,
    body: JSON.stringify(result)
  };
}

exports.handler = handler