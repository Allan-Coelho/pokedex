import { User } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type AuthenticationParams = Pick<User, 'nickname' | 'password'>;

export type AuthenticationResponse = {
  user: Pick<User, 'id' | 'nickname'>;
  token: string;
};

export type FindUserOrFailResult = Pick<User, 'id' | 'nickname' | 'password'>;
