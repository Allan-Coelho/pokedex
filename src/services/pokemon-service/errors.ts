import { ApplicationError } from '@/protocols';

export function conflictError(): ApplicationError {
  return {
    name: 'ConflictError',
    message: 'This pokemon already is on the team',
  };
}

export function notFoundError(): ApplicationError {
  return {
    name: 'NotFoundError',
    message: 'Poketeam or pokemon not found',
  };
}
