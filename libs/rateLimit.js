'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _ratelimiter = require('ratelimiter');

var _ratelimiter2 = _interopRequireDefault(_ratelimiter);

var _ms = require('ms');

var _ms2 = _interopRequireDefault(_ms);

var _thenify = require('thenify');

var _thenify2 = _interopRequireDefault(_thenify);

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
   * Created by devollove9 on 2017/10/28.
   */
/**
 * Module dependencies.
 */

var debug = (0, _debug2.default)('koa-ratelimit');

/**
 * Initialize ratelimit middleware with the given `opts`:
 *
 * - `duration` limit duration in milliseconds [1 hour]
 * - `max` max requests per `id` [2500]
 * - `db` database connection
 * - `id` id to compare requests [ip]
 *
 * @param {Object} opts
 * @return {Function}
 * @api public
 */

var rateLimit = function rateLimit(opts) {
        opts = opts || {};

        return function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
                        var id, limiter, limit, remaining, delta, after;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                        switch (_context.prev = _context.next) {
                                                case 0:
                                                        id = opts.id ? opts.id(ctx) : ctx.ip;

                                                        if (!(id === false)) {
                                                                _context.next = 3;
                                                                break;
                                                        }

                                                        return _context.abrupt('return', Promise.all(next()));

                                                case 3:

                                                        // initialize limiter
                                                        limiter = new _ratelimiter2.default({ id: id, __proto__: opts });

                                                        limiter.get = (0, _thenify2.default)(limiter.get);

                                                        // check limit
                                                        _context.next = 7;
                                                        return limiter.get();

                                                case 7:
                                                        limit = _context.sent;

                                                        // check if current call is legit
                                                        remaining = limit.remaining > 0 ? limit.remaining - 1 : 0;

                                                        // header fields

                                                        ctx.set('X-RateLimit-Limit', limit.total);
                                                        ctx.set('X-RateLimit-Remaining', remaining);
                                                        ctx.set('X-RateLimit-Reset', limit.reset);
                                                        ctx.set('X-RateLimit-RemainingTime', limit.reset * 1000 - new Date().getTime());

                                                        debug('remaining %s/%s %s', remaining, limit.total, id);

                                                        if (!limit.remaining) {
                                                                _context.next = 16;
                                                                break;
                                                        }

                                                        return _context.abrupt('return', Promise.all(next()));

                                                case 16:
                                                        delta = limit.reset * 1000 - Date.now() | 0;
                                                        after = limit.reset - Date.now() / 1000 | 0;

                                                        if (!opts.throwable) {
                                                                _context.next = 20;
                                                                break;
                                                        }

                                                        throw opts.throwable(after, (0, _ms2.default)(delta, { long: true }));

                                                case 20:
                                                        ctx.set('Retry-After', after);
                                                        ctx.status = 429;
                                                        ctx.body = 'Rate limit exceeded, retry in ' + (0, _ms2.default)(delta, { long: true });

                                                case 23:
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

exports.default = rateLimit;