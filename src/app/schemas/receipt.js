const Joi = require("joi").extend(require("@joi/date"));
const Item = require("./item");

const schema = Joi.object({
    retailer: Joi
        .string()
        .pattern(new RegExp("^[\\w\\s\\-&]+$"))
        .required()
        .raw(),
    
    purchaseDate: Joi
        .date()
        .format("YYYY-MM-DD")
        .required()
        .raw(),
    
    purchaseTime: Joi
        .date()
        .format("HH:mm")
        .required()
        .raw(),
    
    items: Joi
        .array()
        .min(1)
        .items(Item)
        .required()
        .raw(),
    
    total: Joi
        .string()
        .pattern(new RegExp("^\\d+\\.\\d{2}$"))
        .required()
        .raw(),
});

module.exports = schema;