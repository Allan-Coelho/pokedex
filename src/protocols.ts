import { PokeTeam, Pokemon, User } from '@prisma/client';
import { Request } from 'express';

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

export type PokemonService = {
  id: number;
};

export type PokemonParams = Pick<Pokemon, 'pokeTeamId' | 'pokemonId'>;

export type PoketeamParams = Pick<PokeTeam, 'userId' | 'title'>;

export type PoketeamResponse = Pick<PokeTeam, 'id' | 'title' | 'userId'>;

export type JWTRequest = Request & JWTPayload;

export type AuthenticationParams = Pick<User, 'nickname' | 'password'>;

export type AuthenticationResponse = {
  user: Pick<User, 'id' | 'nickname'>;
  token: string;
};

export type JWTPayload = {
  userId: number;
};

export type FindUserOrFailResult = Pick<User, 'id' | 'nickname' | 'password'>;

export enum Enums {
  WITHOUT_ITEMS = 0,
}
