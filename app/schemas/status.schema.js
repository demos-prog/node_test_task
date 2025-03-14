import Joi from "joi";

export const schemaStatus = Joi.object({
  status: Joi.string()
    .valid("NEW", "IN_PROGRESS", "COMPLETE", "CANCELLED")
    .required()
    .error(
      new Error("status must be one of NEW, IN_PROGRESS, COMPLETE, or CANCELLED")
    ),
});
