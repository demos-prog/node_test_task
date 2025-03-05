import Joi from "joi";

export const schemaInvocation = Joi.object({
  id: Joi.string(),
  status: Joi.string()
    .valid("NEW", "IN_PROGRESS", "COMPLETE", "CANCEL")
    .required()
    .error(
      new Error("status must be one of NEW, IN_PROGRESS, COMPLETE, or CANCEL")
    ),
  text: Joi.string().required(),
  theme: Joi.string().required(),
});
