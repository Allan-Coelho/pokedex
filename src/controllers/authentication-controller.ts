import authenticationService, { SignInParams } from '@/services/authentication-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function singInPost(request: Request, response: Response) {
  console.log('controller start');
  const { nickname, password } = request.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ nickname, password });

    return response.status(httpStatus.OK).send(result).end();
  } catch (err) {
    return response.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
