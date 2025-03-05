import Joi from "joi";

export const schemaInvocation = Joi.object({
  text: Joi.string().required(),
  theme: Joi.string().required(),
});
