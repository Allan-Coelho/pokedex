/* eslint-disable @typescript-eslint/no-misused-promises */
import { authentication, validateBody, validateParams } from '@/middlewares';
import { Router } from 'express';
import { poketeamSchema } from '@/schemas';
import { createPoketeam, deletePoketeam, getPoketeams } from '@/controllers';

const poketeamRouter = Router();

poketeamRouter
  .all('/*', authentication)
  .post('/', validateBody(poketeamSchema), createPoketeam)
  .get('/', getPoketeams)
  .delete('/:title', validateParams(poketeamSchema), deletePoketeam);

export { poketeamRouter };
