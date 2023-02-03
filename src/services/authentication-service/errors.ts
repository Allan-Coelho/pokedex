import { ApplicationError } from '@/protocols';

export function invalidCredentialsError(): ApplicationError {
  return {
    name: 'InvalidCredentialsError',
    message: 'nickname or password are incorrect',
  };
}

export function conflictError(): ApplicationError {
  return {
    name: 'ConflictError',
    message: 'This nickname already exists',
  };
}
