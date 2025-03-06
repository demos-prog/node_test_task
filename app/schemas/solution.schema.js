import Joi from "joi";

export const schemaSolution = Joi.object({
  solution: Joi.string().required(),
});
