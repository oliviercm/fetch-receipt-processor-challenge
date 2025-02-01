const Joi = require("joi");

const schema = Joi.object({
    shortDescription: Joi
        .string()
        .pattern(new RegExp("^[\\w\\s\\-]+$"))
        .required(),
    
    price: Joi
        .string()
        .pattern(new RegExp("^\\d+\\.\\d{2}$"))
        .required(),
});

module.exports = schema;