import { ApplicationError } from '@/protocols';

export function conflictError(): ApplicationError {
  return {
    name: 'ConflictError',
    message: 'This title already exists',
  };
}

export function notFoundError(): ApplicationError {
  return {
    name: 'NotFoundError',
    message: 'Poketeam not found',
  };
}

export function unauthorizedError(): ApplicationError {
  return {
    name: 'UnauthorizedError',
    message: 'You can not do this operation',
  };
}
