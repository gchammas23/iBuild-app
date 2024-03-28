function checkUpperCase(password) {
    for (c of password) {
        if (c === c.toUpperCase()) {
            return true;
        }
    }
    return false;
}

function checkForDigit(password) {
    for (c of password) {
        if (c >= '0' && c <= '9') {
            return true;
        }
    }
    return false;
}

exports.checkPassword = (password) => {
    return checkForDigit(password) && checkUpperCase(password) && password.length >= 8;
}

exports.validateEmail = (email) => {

    var validator = require("validator");

    return validator.default.isEmail(email) ? true : false;
}

exports.validateExtension = (phone) => {
    return phone.slice(0, 4) !== '+961';
}

exports.validatePhoneNumber = (phone) => {

    return phone.length != 12;
}