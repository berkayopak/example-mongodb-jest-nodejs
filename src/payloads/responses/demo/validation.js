const Joi = require('joi');

const recordSchema = Joi.object().keys({
  key: Joi.string()
    .required(),

  createdAt: Joi.date()
    .required(),

  totalCount: Joi.number()
    .integer()
    .required()
});

const demoResponseSchema = Joi.object({
  code: Joi.number()
    .integer()
    .required(),

  msg: Joi.string()
    .required(),

  records: Joi.array()
    .items(recordSchema)
});

exports.validate = (demoResponse) => {
  return demoResponseSchema.validate(demoResponse, {convert: false});
}
