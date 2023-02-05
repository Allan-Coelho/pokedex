import { Response } from 'express';
import httpStatus from 'http-status';
import { ApplicationError, JWTRequest } from '@/protocols';
import poketeamService from '@/services/poketeam-service';
import { PokeTeam } from '@prisma/client';

export async function createPoketeam(request: JWTRequest, response: Response) {
  const { title } = request.body as Pick<PokeTeam, 'title'>;
  const { userId } = request;

  try {
    const result = await poketeamService.create({ userId, title });

    return response.status(httpStatus.CREATED).send(result);
  } catch (err) {
    const error = err as ApplicationError;

    if (error.name === 'ConflictError') {
      return response.sendStatus(httpStatus.CONFLICT);
    }

    return response.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function deletePoketeam(request: JWTRequest, response: Response) {
  const { title } = request.params as Pick<PokeTeam, 'title'>;
  const { userId } = request;

  try {
    const result = await poketeamService.exclude({ userId, title });

    return response.status(httpStatus.NO_CONTENT).send(result);
  } catch (err) {
    const error = err as ApplicationError;

    if (error.name === 'ConflictError') {
      return response.sendStatus(httpStatus.CONFLICT);
    }

    if (error.name === 'UnauthorizedError') {
      return response.sendStatus(httpStatus.UNAUTHORIZED);
    }

    if (error.name === 'NotFoundError') {
      return response.sendStatus(httpStatus.NOT_FOUND);
    }

    return response.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
