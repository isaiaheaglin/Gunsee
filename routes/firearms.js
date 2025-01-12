const express = require('express');
const router = express.Router();
const firearms = require('../controllers/firearms');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Firearm = require('../models/firearm');
const {firearmSchema} = require('../schemas.js');
const { isLoggedIn } = require('../middleware');


const validatefirearm = (req, res, next) => {
    const {error} = firearmSchema.validate(req.body)
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(firearms.index));

router.get('/new', isLoggedIn, firearms.renderNewForm);

router.post('/', isLoggedIn, validatefirearm, catchAsync(firearms.createFirearm));

router.get('/:id', catchAsync(firearms.showFirearm));

router.get('/:id/edit', isLoggedIn, catchAsync(firearms.renderEditForm));

router.put('/:id', isLoggedIn, validatefirearm, catchAsync(firearms.upddateFirearms));

router.delete('/:id', isLoggedIn, catchAsync(firearms.deleteFirearm));

module.exports = router;