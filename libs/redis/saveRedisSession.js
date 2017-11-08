'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
}

/**
 * Created by devo on 10/31/2017.
 */

var saveRedisSession = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(session, redisInstance) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return redisInstance.sadd('TOKENS::' + session.userId, session.token);

                    case 2:
                        result = _context.sent;

                        if (!(result.toString() !== '1')) {
                            _context.next = 5;
                            break;
                        }

                        return _context.abrupt('return', result);

                    case 5:
                        _context.next = 7;
                        return redisInstance.setex(session.token, session.maxAge, JSON.stringify(session));

                    case 7:
                        result = _context.sent;

                        if (!(result.toString() !== 'OK')) {
                            _context.next = 10;
                            break;
                        }

                        return _context.abrupt('return', result);

                    case 10:
                        _context.next = 12;
                        return redisInstance.setex('KEY::' + session.token, session.maxAge + 20, session.userId);

                    case 12:
                        result = _context.sent;
                        return _context.abrupt('return', result);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function saveRedisSession(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = saveRedisSession;