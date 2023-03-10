import { Response } from 'express';
import httpStatus from 'http-status';
import { ApplicationError, JWTRequest } from '@/protocols';
import { poketeamService } from '@/services/poketeam-service';
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
      return response.status(httpStatus.CONFLICT).send(error);
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
      return response.status(httpStatus.CONFLICT).send(error);
    }

    if (error.name === 'UnauthorizedError') {
      return response.status(httpStatus.UNAUTHORIZED).send(error);
    }

    if (error.name === 'NotFoundError') {
      return response.status(httpStatus.NOT_FOUND).send(error);
    }

    return response.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getPoketeams(request: JWTRequest, response: Response) {
  const { userId } = request;

  try {
    const result = await poketeamService.getAll(userId);

    return response.status(httpStatus.OK).send(result);
  } catch (err) {
    return response.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
