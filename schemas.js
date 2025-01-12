const Joi = require('joi');

module.exports.firearmSchema = Joi.object({
    firearm: Joi.object({
        socialsecurity: Joi.number().required().min(0),
        firstname: Joi.string().required(),
        middlename: Joi.string().required(),
        lastname: Joi.string().required(),
        gunname: Joi.string().required(),
        serialnumber: Joi.string().required(),
        locationbought: Joi.string().required(),
        dealername: Joi.string().required()
    }).required()
});
