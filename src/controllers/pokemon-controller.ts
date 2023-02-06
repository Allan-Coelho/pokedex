import { Response } from 'express';
import httpStatus from 'http-status';
import { ApplicationError, JWTRequest, PokemonParams } from '@/protocols';
import { pokemonService } from '@/services';

export async function createPokemon(request: JWTRequest, response: Response) {
  const { pokeTeamId, pokemonId } = request.body as PokemonParams;
  const { userId } = request;

  try {
    const pokemon = await pokemonService.create({ pokeTeamId, pokemonId, userId });

    return response.status(httpStatus.CREATED).send(pokemon);
  } catch (err) {
    const error = err as ApplicationError;

    if (error.name === 'ConflictError') {
      return response.status(httpStatus.CONFLICT).send(error);
    }

    if (error.name === 'NotFoundError') {
      return response.status(httpStatus.NOT_FOUND).send(error);
    }

    return response.sendStatus(httpStatus.NOT_FOUND);
  }
}
