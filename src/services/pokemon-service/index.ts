import { JWTPayload, PokemonParams, PokemonService } from '@/protocols';
import poketeamRepository from '@/repositories/poketeam-repository';
import { getPokemon } from '@/utilities/pokeAPI-service';
import { Pokemon } from '@prisma/client';
import pokemonRepository from '@/repositories/pokemon-repository';
import { conflictError, notFoundError } from './errors';

async function findOrFail(params: PokemonParams & JWTPayload) {
  const { pokeTeamId, pokemonId, userId } = params;

  const [poketeam, pokemonAPI] = await Promise.all([
    poketeamRepository.findById({ id: pokeTeamId, userId }),
    getPokemon(pokemonId),
  ]);
  const pokemonAPIResponse = pokemonAPI.data as PokemonService;

  if (poketeam === null || pokemonAPIResponse.id !== pokemonId) throw notFoundError();

  return poketeam;
}

async function create(params: PokemonParams & JWTPayload): Promise<Pokemon> {
  const { pokeTeamId, pokemonId, userId } = params;
  const poketeam = await findOrFail({ pokeTeamId, userId, pokemonId });
  const isRepeatedSpecies = poketeam.Pokemon.some((pokemon) => pokemon.pokemonId === pokemonId);

  if (isRepeatedSpecies) throw conflictError();

  const pokemon = pokemonRepository.create({ pokemonId, pokeTeamId });

  return pokemon;
}

export const pokemonService = {
  create,
};
