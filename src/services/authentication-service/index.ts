import sessionRepository from '@/repositories/session-repository';
import userRepository from '@/repositories/user-repository';
import { FindUserOrFailResult, AuthenticationParams, AuthenticationResponse } from '@/protocols';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import exclude from '@/utilities/prisma-utils';
import { invalidCredentialsError, conflictError } from './errors';

async function findUserOrFail(nickname: string): Promise<FindUserOrFailResult> {
  const user = await userRepository.findByNickname(nickname);

  if (user === null) throw invalidCredentialsError();

  return user;
}

async function findUserAndFail(nickname: string) {
  const user = await userRepository.findByNickname(nickname);

  if (user !== null) throw conflictError();
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

async function createSession(userId: number): Promise<string> {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function signIn(params: AuthenticationParams): Promise<AuthenticationResponse> {
  const { nickname, password } = params;

  const user = await findUserOrFail(nickname);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);
  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function signUp(params: AuthenticationParams): Promise<AuthenticationResponse> {
  const { nickname, password } = params;

  await findUserAndFail(nickname);

  const hashedPassword = await bcrypt.hash(password, 6);

  const user = await userRepository.create({ password: hashedPassword, nickname });
  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

export const authenticationService = {
  signIn,
  signUp,
};
