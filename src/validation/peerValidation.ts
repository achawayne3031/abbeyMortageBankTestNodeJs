const Joi = require("joi");

require("dotenv").config();

export const validateAddPeerPayload = (data: any) => {
  const schema = Joi.object().keys({
    peerId: Joi.string().required().messages({
      "any.required": "peer ID field is required",
      "string.empty": "peer ID should not be empty",
    }),
  });

  return schema.validate(data);
};

export const validateRemovePeerPayload = (data: any) => {
  const schema = Joi.object().keys({
    peerId: Joi.string().required().messages({
      "any.required": "peer ID field is required",
      "string.empty": "peer ID should not be empty",
    }),
  });

  return schema.validate(data);
};
