'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _devomainLibs = require('devomain-libs');

var _devomainConstants = require('devomain-constants');

function _asyncToGenerator(fn) {
    return function () {
        var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);var value = info.value;
                } catch (error) {
                    reject(error);return;
                }if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function (value) {
                        step("next", value);
                    }, function (err) {
                        step("throw", err);
                    });
                }
            }return step("next");
        });
    };
} /**
   * Created by devollove9 on 2017/10/26.
   */

exports.default = function (validation) {
    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
            var requestQuery, result, error;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            requestQuery = ctx.request.query;

                            if (ctx.method.toLowerCase() === 'get') {
                                requestQuery = ctx.request.query;
                            } else {
                                requestQuery = ctx.request.body;
                            }

                            if (!(requestQuery === undefined)) {
                                _context.next = 4;
                                break;
                            }

                            throw _devomainConstants.errors.HTTP['422'];

                        case 4:
                            result = _devomainLibs.joiValidate.validate(requestQuery, validation);

                            if (!result.error) {
                                _context.next = 13;
                                break;
                            }

                            error = {};

                            error.errorCode = 422;
                            error.errorMessage = _devomainConstants.errors.HTTP['422'].errorMessage;
                            if (ENV.DEBUG || ctx.headers['x-response-errordetail']) {
                                error.errorDetail = result.error;
                            }
                            throw error;

                        case 13:
                            ctx.params = result.value;

                        case 14:
                            _context.next = 16;
                            return next();

                        case 16:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};