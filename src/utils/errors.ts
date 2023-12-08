export type HttpErrorResponseBody = { message: string; kind?: string };

export class HttpErrorResponse<
  T extends HttpErrorResponseBody = HttpErrorResponseBody
> extends Error {
  constructor(readonly statusCode: number, readonly body: T) {
    super(body.message);
    Object.setPrototypeOf(this, HttpErrorResponse.prototype);
  }
}
