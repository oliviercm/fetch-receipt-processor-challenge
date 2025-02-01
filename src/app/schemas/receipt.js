const Joi = require("joi").extend(require("@joi/date"));
const Item = require("./item");

const schema = Joi.object({
    retailer: Joi
        .string()
        .pattern(new RegExp("^[\\w\\s\\-&]+$"))
        .required()
        .raw(),
    
    // FIXME: Doesn't catch cases where the purchase date is a number (not a string) which apparently still passes this validation?
    purchaseDate: Joi
        .date()
        .format("YYYY-MM-DD")
        .required()
        .raw(),
    
    // FIXME: Doesn't catch cases where the purchase time is a number (not a string) which apparently still passes this validation?
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