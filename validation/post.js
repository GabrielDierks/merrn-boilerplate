const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.text =!isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { max: 300})) {
    errors.text = 'Post can only have 300 characters';
    }
    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};