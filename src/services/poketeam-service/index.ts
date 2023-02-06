import { PoketeamParams, PoketeamResponse } from '@/protocols';
import poketeamRepository from '@/repositories/poketeam-repository';
import { PokeTeam } from '@prisma/client';
import { conflictError, notFoundError, unauthorizedError } from './errors';

async function findAndFail(title: string) {
  const poketeam = await poketeamRepository.find(title);
  if (poketeam !== null) throw conflictError();
}

async function findOrFail(title: string): Promise<PokeTeam> {
  const poketeam = await poketeamRepository.find(title);
  if (poketeam === null) throw notFoundError();

  return poketeam;
}

async function create(params: PoketeamParams): Promise<PoketeamResponse> {
  const { title, userId } = params;

  await findAndFail(title);

  const poketeam = await poketeamRepository.create({ title, userId });

  return poketeam;
}

async function exclude(params: PoketeamParams): Promise<void> {
  const { title, userId } = params;
  const poketeam = await findOrFail(title);
  const isUnauthorized = poketeam.userId !== userId;

  if (isUnauthorized) throw unauthorizedError();

  await poketeamRepository.exclude(title);
}

async function getAll(userId: number): Promise<PokeTeam[]> {
  const poketeams = await poketeamRepository.findMany(userId);

  return poketeams;
}

export const poketeamService = {
  create,
  exclude,
  getAll,
};
