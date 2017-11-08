'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _srcLoader = require('src-loader');

var _srcLoader2 = _interopRequireDefault(_srcLoader);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var errors = {
    HTTP: (0, _srcLoader2.default)('constants/errors/http'), // xxx
    AUTHENTICATION: (0, _srcLoader2.default)('constants/errors/authentication'), // 1xxx
    // "AUTHORIZATION":load('constants/errors/authorization'), //2xxx
    USER: (0, _srcLoader2.default)('constants/errors/user'), // 4xxx,
    USERPROFILE: (0, _srcLoader2.default)('constants/errors/user'), // 5xxx,
    SERVICES: (0, _srcLoader2.default)('constants/errors/authentication'), // 10xxx
    DEPENDENCY: (0, _srcLoader2.default)('constants/errors/authentication') // 99xxx
};

exports.default = errors;