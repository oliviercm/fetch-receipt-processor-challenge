const Joi = require("joi");

const schema = Joi.object({
    shortDescription: Joi
        .string()
        .pattern(new RegExp("^[\\w\\s\\-]+$"))
        .required()
        .raw(),
    
    price: Joi
        .string()
        .pattern(new RegExp("^\\d+\\.\\d{2}$"))
        .required()
        .raw(),
});

module.exports = schema;