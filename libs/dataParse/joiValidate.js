'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

_joi2.default.id = function () {
    return _joi2.default.string().hex().length(22);
}; /**
    * Created by devollove9 on 2017/10/26.
    */

_joi2.default.username = function () {
    return [_joi2.default.string().email().allow('').required()
    // joi.string().regex( /[0-9]{10}$/ ).allow( '' ).required()
    ];
};
_joi2.default.usernameRegister = function () {
    return [_joi2.default.string().email().required()
    // joi.string().regex( /[0-9]{10}$/ ).required()
    ];
};

exports.default = _joi2.default;