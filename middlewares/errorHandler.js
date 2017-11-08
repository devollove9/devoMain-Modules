'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sprintf = require('sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

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

var sprintf = _sprintf2.default.sprintf;
var errorHanlder = function errorHanlder() {
    var errorHandler = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
            var error, start, logger, stack, cerr, i, a, status;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            error = void 0, start = void 0;
                            logger = Logger.get('logstash');

                            ctx.errorCode = 200;
                            _context.prev = 3;

                            start = new Date();
                            _context.next = 7;
                            return next();

                        case 7:
                            _context.next = 17;
                            break;

                        case 9:
                            _context.prev = 9;
                            _context.t0 = _context['catch'](3);

                            error = _context.t0;
                            if (_context.t0.status === 408) {
                                ctx.errorCode = 408;
                                error = {
                                    errorCode: 408,
                                    errorMessage: 'You request has timed out'
                                };
                            }

                            if (_context.t0.errorCode === undefined || _context.t0.errorMessage === undefined) {
                                if (_context.t0.status === 400 && !_context.t0.moreInfo) {
                                    ctx.errorCode = 422;
                                    error = {
                                        errorCode: 422,
                                        errorMessage: 'The requested parameters are not processable',
                                        errorDetail: 'JSON malformated'
                                    };
                                } else {
                                    ctx.errorCode = 500;
                                    if (!ENV.DEBUG) {
                                        // NR.noticeError(err)
                                        error = {
                                            errorCode: 500,
                                            errorMessage: 'Internal error'
                                        };
                                    } else {
                                        logger.error(error);
                                        if (error.stack) {
                                            stack = _context.t0.stack.split('\n');
                                            cerr = {};

                                            cerr[error.message] = {};
                                            cerr[error.message][stack[0]] = {};
                                            for (i = 1; i < stack.length; i++) {
                                                a = stack[i].split('(');

                                                if (a.length === 1) {
                                                    cerr[error.message][stack[0]][a[0].substr(7)] = '';
                                                } else {
                                                    cerr[error.message][stack[0]][a[0].substr(7)] = a[1].substr(0, a[1].length - 1);
                                                }
                                            }
                                            error = cerr;
                                        }
                                    }
                                }
                            } else {
                                ctx.errorCode = error.errorCode || 500;
                                logger.error(sprintf('%-4s %-5d  %-30s  %-15s  %dms', ctx.request.method, error.errorCode || 500, ctx.request.url, ctx.request.header['x-forwarded-for'] || ctx.request.header['x-real-ip'], new Date() - start));
                            }
                            ctx.response.status = 200;
                            ctx.body = JSON.stringify({
                                error: error
                            });
                            ctx.result = {
                                error: error
                            };

                        case 17:
                            if (error === undefined) {
                                status = ctx.response.status;

                                logger.info(sprintf('%-4s %-5d  %-30s  %-15s  %dms', ctx.request.method, status, ctx.request.url, ctx.request.header['x-forwarded-for'] || ctx.request.header['x-real-ip'], new Date() - start));
                            }

                        case 18:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[3, 9]]);
        }));

        return function errorHandler(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
    return errorHandler;
};

exports.default = errorHanlder;