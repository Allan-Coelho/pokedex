import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

import { prisma } from '@/configuration';
import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';

export async function cleanDb() {
  await prisma.session.deleteMany({});
  await prisma.pokeTeam.deleteMany({});
  await prisma.pokemon.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || '';
  const token = jwt.sign({ userId: incomingUser.id }, JWT_SECRET);

  await createSession(token);

  return token;
}
