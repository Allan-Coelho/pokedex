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

async function findById(params: Pick<PokeTeam, 'userId' | 'id'>) {
  const { id, userId } = params;

  return prisma.pokeTeam.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      Pokemon: true,
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

async function findMany(userId: number): Promise<PokeTeam[]> {
  return prisma.pokeTeam.findMany({
    where: {
      userId,
    },
    include: {
      Pokemon: true,
    },
  });
}

const poketeamRepository = {
  create,
  find,
  exclude,
  findMany,
  findById,
};

export default poketeamRepository;
