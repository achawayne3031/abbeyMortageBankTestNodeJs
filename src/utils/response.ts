export class CustomResponse {
  message: string;
  statusCode: number;
  data: any;
  token: string;

  constructor(message: string, statusCode: number, data: any, token: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.token = token;
  }
}
