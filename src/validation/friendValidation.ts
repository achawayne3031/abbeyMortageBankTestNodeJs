const Joi = require("joi");

require("dotenv").config();

export const validateFriendUserPayload = (data: any) => {
  const schema = Joi.object().keys({
    userId: Joi.string().required().messages({
      "any.required": "user ID field is required",
      "string.empty": "user ID should not be empty",
    }),
  });

  return schema.validate(data);
};

export const validateUnFriendUserPayload = (data: any) => {
  const schema = Joi.object().keys({
    friendId: Joi.string().required().messages({
      "any.required": "friend ID field is required",
      "string.empty": "friend ID should not be empty",
    }),
  });

  return schema.validate(data);
};
