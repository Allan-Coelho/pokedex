import { prisma } from '@/configuration';
import { AuthenticationParams } from '@/protocols';

async function findByNickname(nickname: string) {
  return prisma.user.findFirst({
    where: {
      nickname,
    },
  });
}

async function create(data: AuthenticationParams) {
  return prisma.user.create({
    data,
  });
}

const userRepository = {
  findByNickname,
  create,
};

export default userRepository;
