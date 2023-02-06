import { PokeTeam } from '@prisma/client';
import Joi from 'joi';

export const poketeamSchema = Joi.object<Pick<PokeTeam, 'title'>>({
  title: Joi.string()
    .min(6)
    .max(32)
    .regex(/^[a-z]+$/)
    .required(),
});
