import { ApplicationError } from '@/protocols';

export function requestError(): ApplicationError {
  return {
    name: 'RequestError',
    message: 'Request has failed',
  };
}
