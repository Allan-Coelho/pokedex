import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker/locale/de';
import { User } from '@prisma/client';
import { prisma } from '@/configuration';

export async function createUser(): Promise<User> {
  const incomingPassword = faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      nickname: faker.name.firstName(),
      password: hashedPassword,
    },
  });
}
