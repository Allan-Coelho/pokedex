import { PokemonParams } from '@/protocols';
import Joi from 'joi';

export const pokemonSchema = Joi.object<PokemonParams>({
  pokemonId: Joi.number().integer().required(),
  pokeTeamId: Joi.number().integer().required(),
});
