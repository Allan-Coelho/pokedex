import { invalidDataError } from '@/errors';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi, { ObjectSchema } from 'joi';

function validate(schema: ObjectSchema, type: 'body' | 'params') {
  console.log('validation start');
  const showDetails = (d: Joi.ValidationErrorItem) => d.message;
  return (request: Request, response: Response, next: NextFunction) => {
    const { error } = schema.validate(request[type], {
      abortEarly: false,
    });

    if (!error) {
      next();
    } else {
      const errorWithDetails = invalidDataError(error.details.map(showDetails));
      return response.status(httpStatus.BAD_REQUEST).send(errorWithDetails);
    }
    console.log('validation end');
    return undefined;
  };
}

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'body');
}

export function validateParams<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'params');
}

type ValidationMiddleware = (request: Request, response: Response, next: NextFunction) => void;
