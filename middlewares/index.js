'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.queryValidator = exports.permissionFilter = exports.errorHandler = undefined;

var _errorHandler = require('./errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _permissionFilter = require('./permissionFilter');

var _permissionFilter2 = _interopRequireDefault(_permissionFilter);

var _queryValidator = require('./queryValidator');

var _queryValidator2 = _interopRequireDefault(_queryValidator);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var middleware = {
    errorHandler: _errorHandler2.default,
    permissionFilter: _permissionFilter2.default,
    queryValidator: _queryValidator2.default
}; /**
    * Created by devollove9 on 2017/10/26.
    */
exports.errorHandler = _errorHandler2.default;
exports.permissionFilter = _permissionFilter2.default;
exports.queryValidator = _queryValidator2.default;
exports.default = middleware;