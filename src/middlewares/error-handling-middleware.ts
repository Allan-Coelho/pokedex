import { ApplicationError } from '@/protocols';
import { Response } from 'express';
import httpStatus from 'http-status';

export function handleErrors(error: ApplicationError | Error, response: Response) {
  if (error.name === 'CannotEnrollBeforeStartDateError') {
    return response.status(httpStatus.BAD_REQUEST).send({
      message: error.message,
    });
  }

  if (error.name === 'ConflictError' || error.name === 'DuplicatedEmailError') {
    return response.status(httpStatus.CONFLICT).send({
      message: error.message,
    });
  }

  if (error.name === 'InvalidCredentialsError') {
    return response.status(httpStatus.UNAUTHORIZED).send({
      message: error.message,
    });
  }

  if (error.name === 'UnauthorizedError') {
    return response.status(httpStatus.UNAUTHORIZED).send({
      message: error.message,
    });
  }

  if (error.name === 'NotFoundError') {
    return response.status(httpStatus.NOT_FOUND).send({
      message: error.message,
    });
  }

  if (error.name) {
    return response.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'InternalServerError',
      message: 'Internal Server Error',
    });
  }

  return response.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
