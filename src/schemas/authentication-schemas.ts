import { SignInParams } from '@/services';
import Joi from 'joi';

export const signInSchema = Joi.object<SignInParams>({
  nickname: Joi.string()
    .min(6)
    .max(32)
    .regex(/^[a-z]+$/)
    .required(),
  password: Joi.string().min(6).max(12).required(),
});
