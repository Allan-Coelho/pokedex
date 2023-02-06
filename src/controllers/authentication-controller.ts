import { authenticationService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApplicationError, AuthenticationParams } from '@/protocols';

export async function singIn(request: Request, response: Response) {
  const { nickname, password } = request.body as AuthenticationParams;

  try {
    const result = await authenticationService.signIn({ nickname, password });

    return response.status(httpStatus.OK).send(result);
  } catch (err) {
    const error = err as ApplicationError;

    if (error.name === 'InvalidCredentialsError') {
      return response.sendStatus(httpStatus.UNAUTHORIZED);
    }

    return response.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function singUp(request: Request, response: Response) {
  const { nickname, password } = request.body as AuthenticationParams;

  try {
    const result = await authenticationService.signUp({ nickname, password });

    return response.status(httpStatus.CREATED).send(result);
  } catch (err) {
    const error = err as ApplicationError;
    if (error.name === 'ConflictError') {
      return response.sendStatus(httpStatus.CONFLICT);
    }

    return response.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
