import { headers } from "./headers";
import { Response } from "./response.model";

export function response(code: number, data: any): Response {
  return {
    statusCode: code,
    headers,
    body: JSON.stringify(data),
  };
}
