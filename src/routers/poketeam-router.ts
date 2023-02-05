/* eslint-disable @typescript-eslint/no-misused-promises */
import { authentication, validateBody } from '@/middlewares';
import { Router } from 'express';
import { poketeamSchema } from '@/schemas';
import { createPoketeam } from '@/controllers/poketeam-controller';

const poketeamRouter = Router();

poketeamRouter.post('/', authentication, validateBody(poketeamSchema), createPoketeam);

export { poketeamRouter };
