/* eslint-disable @typescript-eslint/no-misused-promises */
import { singIn, singUp } from '@/controllers';
import { validateBody } from '@/middlewares';
import { Router } from 'express';
import { authenticationSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter
  .post('/sign-in', validateBody(authenticationSchema), singIn)
  .post('/sign-up', validateBody(authenticationSchema), singUp);

export { authenticationRouter };
