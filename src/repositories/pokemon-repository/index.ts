import { prisma } from '@/configuration';
import { JWTPayload, PokemonParams } from '@/protocols';
import { Pokemon } from '@prisma/client';

async function create(data: PokemonParams): Promise<Pokemon> {
  return prisma.pokemon.create({
    data,
  });
}

const pokemonRepository = {
  create,
};

export default pokemonRepository;
