'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
    encrypt: function encrypt(val) {
        var secretSalt = ENV.SALT;
        var cipher = _crypto2.default.createCipher('aes-256-ctr', secretSalt);
        var data = cipher.update(String(val), 'utf8', 'hex');
        return data + cipher.final('hex');
    },
    decrypt: function decrypt(val) {
        var secretSalt = ENV.SALT;
        var decipher = _crypto2.default.createDecipher('aes-256-ctr', secretSalt);
        var data = decipher.update(val, 'hex', 'utf8');
        return data + decipher.final('utf8');
    }
}; /**
    * Created by devollove9 on 2017/10/26.
    */