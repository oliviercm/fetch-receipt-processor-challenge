const Joi = require("joi").extend(require("@joi/date"));
const Item = require("./item");

const schema = Joi.object({
    retailer: Joi
        .string()
        .pattern(new RegExp("^[\\w\\s\\-&]+$"))
        .required(),
    
    purchaseDate: Joi
        .date()
        .required(),
    
    purchaseTime: Joi
        .date()
        .format("HH:mm")
        .required(),
    
    items: Joi
        .array()
        .min(1)
        .items(Item)
        .required(),
    
    total: Joi
        .string()
        .pattern(new RegExp("^\\d+\\.\\d{2}$"))
        .required(),
});

module.exports = schema;