const Joi = require('joi');

const demoRequestSchema = Joi.object({
  //yyyy-mm-dd regex validation
  startDate: Joi.string()
    .pattern(new RegExp('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')).required(),

  //yyyy-mm-dd regex validation
  endDate: Joi.string()
    .pattern(new RegExp('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')).required(),

  minCount: Joi.number()
    .integer().required(),

  maxCount: Joi.number()
    .integer().required()
});

exports.validate = (demoRequest) => {
  return demoRequestSchema.validate(demoRequest, {convert: false});
};
