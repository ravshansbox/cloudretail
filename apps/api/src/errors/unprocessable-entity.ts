import { HttpError } from './http-error';

export class UnprocessableEntity extends HttpError {
  constructor(message: string) {
    super(422, message);
  }
}
