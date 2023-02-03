import sessionRepository from '@/repositories/session-repository';
import userRepository from '@/repositories/user-repository';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import exclude from '@/utilities/prisma-utils';
import invalidCredentialsError from './errors';

async function findUserOrFail(nickname: string): Promise<FindUserOrFailResult> {
  console.log('find user start');
  const user = await userRepository.findByNickname(nickname);

  if (user === null) throw invalidCredentialsError();

  return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function signIn(params: SignInParams): Promise<SignInResult> {
  console.log('signin start');
  const { nickname, password } = params;

  const user = await findUserOrFail(nickname);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);
  return {
    user: exclude(user, 'password'),
    token,
  };
}

export type SignInParams = Pick<User, 'nickname' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'nickname'>;
  token: string;
};

type FindUserOrFailResult = Pick<User, 'id' | 'nickname' | 'password'>;

const authenticationService = {
  signIn,
};
export default authenticationService;
