const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

require("dotenv").config();

export const validateLoginPayload = (data: any) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required().messages({
      "any.required": "email field is required",
      "string.empty": "email should not be empty",
      "string.email": "email field should be a valid email address",
    }),
    password: Joi.string().required().messages({
      "any.required": "password field is required",
      "string.empty": "password should not be empty",
    }),
  });

  return schema.validate(data);
};

export const validateRegisterPayload = (data: any) => {
  const schema = Joi.object({
    full_name: Joi.string().required().messages({
      "any.required": "full name field is required",
      "string.empty": "full name should not be empty",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "email field is required",
      "string.empty": "email should not be empty",
      "string.email": "email field should be a valid email address",
    }),
    password: joiPassword.string().required().messages({
      "any.required": "password field is required",
      "string.empty": "password should not be empty",
    }),
  });

  return schema.validate(data);
};
