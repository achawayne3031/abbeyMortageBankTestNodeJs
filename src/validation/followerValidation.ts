const Joi = require("joi");

require("dotenv").config();

export const validateFollowUserPayload = (data: any) => {
  const schema = Joi.object().keys({
    userId: Joi.string().required().messages({
      "any.required": "user ID field is required",
      "string.empty": "user ID should not be empty",
    }),
  });

  return schema.validate(data);
};

export const validateUnFollowUserPayload = (data: any) => {
  const schema = Joi.object().keys({
    userId: Joi.string().required().messages({
      "any.required": "user ID field is required",
      "string.empty": "user ID should not be empty",
    }),
  });

  return schema.validate(data);
};
