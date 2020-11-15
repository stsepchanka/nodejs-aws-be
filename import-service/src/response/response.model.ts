export interface Response {
  statusCode: number;
  headers: Headers;
  body: string;
}

export interface Headers {
  [header: string]: string;
}
