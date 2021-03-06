import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  passwordConfirm: Joi.string().required(),
  company: Joi.string().required(),
  wage: Joi.number().required(),
});

const updateUserSchema = Joi.object({
  company: Joi.string(),
  wage: Joi.number(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const Validators = {
  createUser: createUserSchema,
  updateUser: updateUserSchema,
  loginUser: loginUserSchema,
};

export default function validator(validator: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (error) {
      next(error);
    }
  };
}
