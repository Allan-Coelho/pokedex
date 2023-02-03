/* eslint-disable @typescript-eslint/no-misused-promises */
import { singInPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { Router } from 'express';
import { signInSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost);

export { authenticationRouter };
