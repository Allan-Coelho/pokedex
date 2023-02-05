import { prisma } from '@/configuration';
import { PoketeamParams } from '@/protocols';
import { PokeTeam } from '@prisma/client';

async function create(data: PoketeamParams): Promise<PokeTeam> {
  return prisma.pokeTeam.create({
    data,
  });
}

async function find(title: string): Promise<PokeTeam | null> {
  return prisma.pokeTeam.findFirst({
    where: {
      title,
    },
  });
}

async function exclude(title: string): Promise<PokeTeam> {
  return prisma.pokeTeam.delete({
    where: {
      title,
    },
  });
}

const poketeamRepository = {
  create,
  find,
  exclude,
};

export default poketeamRepository;
