import { prisma } from '@/configuration';
import { PoketeamParams } from '@/protocols';

async function create(data: PoketeamParams) {
  return prisma.pokeTeam.create({
    data,
  });
}

async function find(title: string) {
  return prisma.pokeTeam.findFirst({
    where: {
      title,
    },
  });
}

const poketeamRepository = {
  create,
  find,
};

export default poketeamRepository;
