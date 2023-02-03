import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import { unauthorizedError } from '@/errors';
import { prisma } from '@/configuration';

function generateUnauthorizedResponse(response: Response) {
  response.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

function isValidRequestOrFail(request: Request, response: Response) {
  const authHeader = request.header('Authorization');
  const TOKEN_POSITION = 1;

  if (authHeader === undefined) return generateUnauthorizedResponse(response);

  const token = authHeader.split(' ')[TOKEN_POSITION];

  if (token === undefined) return generateUnauthorizedResponse(response);

  return undefined;
}

export async function authentication(request: JWTRequest, response: Response, next: NextFunction) {
  isValidRequestOrFail(request, response);

  const authHeader = request.header('Authorization') as string;
  const TOKEN_POSITION = 1;
  const token = authHeader.split(' ')[TOKEN_POSITION];

  try {
    const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;
    const { userId } = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const session = await prisma.session.findFirst({
      where: {
        token,
      },
    });

    if (!session) return generateUnauthorizedResponse(response);

    request.userId = userId;

    return next();
  } catch (err) {
    return generateUnauthorizedResponse(response);
  }
}

export type JWTRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
