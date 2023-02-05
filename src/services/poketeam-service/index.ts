import { PoketeamParams, PoketeamResponse } from '@/protocols';
import poketeamRepository from '@/repositories/poketeam-repository';
import { conflictError } from './errors';

async function findAndFail(title: string) {
  const poketeam = await poketeamRepository.find(title);
  if (poketeam !== null) throw conflictError();
}

async function create(params: PoketeamParams): Promise<PoketeamResponse> {
  const { title, userId } = params;

  await findAndFail(title);

  const poketeam = await poketeamRepository.create({ title, userId });

  return poketeam;
}

const poketeamService = {
  create,
};

export default poketeamService;
