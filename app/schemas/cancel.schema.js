import Joi from "joi";

export const schemaCancel = Joi.object({
  cancel: Joi.string().required(),
});
