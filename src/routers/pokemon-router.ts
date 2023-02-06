/* eslint-disable @typescript-eslint/no-misused-promises */
import { authentication, validateBody } from '@/middlewares';
import { Router } from 'express';
import { pokemonSchema } from '@/schemas';
import { createPokemon } from '@/controllers/pokemon-controller';

const pokemonRouter = Router();

pokemonRouter.all('/*', authentication).post('/', validateBody(pokemonSchema), createPokemon);

export { pokemonRouter };
