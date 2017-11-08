'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _deepcopy = require('deepcopy');

var _deepcopy2 = _interopRequireDefault(_deepcopy);

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

/*
 * :key  req.params.key
 * key   permission.criteria.key
 * _key  token.key
 * $key  key
 */

var getDeep = function getDeep(obj, key) {
    var arr = key.split('.');
    if (arr.length == 1) {
        return obj[key];
    } else {
        return getDeep(obj[arr[0]], arr.slice(1).join('.'));
    }
};

var transcript = function transcript(perm, key) {
    if (!_underscore2.default.isString(key)) {
        return key;
    }
    if (key[0] === ':') {
        return getDeep(undefined.params, key.substr(1));
    } else if (key[0] === '_') {
        return undefined.token[key.substr(1)];
    } else if (key[0] === '$') {
        return key.substr(1);
    }
    return perm.criteria[key];
};

var matchWildcard = function matchWildcard(src, target) {
    var a1 = src.split('.');
    var a2 = target.split('.');
    for (var i = 0; i < a1.length; i++) {
        if (a1[i] == '*') return true;
        if (a1[i] != a2[i]) return false;
    }
    return true;
};

var validate = function validate(role, action, criteria, permission) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (permission || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var perm = _step.value;

            if (perm.role !== role) continue;
            var flag = false;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = perm.action[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var a = _step2.value;

                    flag |= matchWildcard(a, action);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (!flag) continue;
            flag = false;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = (perm.restrict || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _a = _step3.value;

                    flag |= matchWildcard(_a, action);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            if (flag) continue;
            var f = true;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = Object.keys(criteria)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var key = _step4.value;

                    var lhs = transcript.call(undefined, perm, key);
                    var rhs = transcript.call(undefined, perm, criteria[key]);
                    f &= lhs == rhs;
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            if (!f) continue;
            return true;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return false;
};

exports.default = function (permission) {
    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
            var userPermission, i, flag, _i, p, result;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            userPermission = [];

                            for (i = 0; i < permission.length; i++) {
                                userPermission.push((0, _deepcopy2.default)(permission[i]));
                            }
                            flag = false;

                            ctx.roles = [];
                            for (_i = 0; _i < userPermission.length; _i++) {
                                p = userPermission[_i];
                                result = validate.call(ctx, p.role, p.action, p.criteria, ctx.token.permission);

                                if (result) {
                                    ctx.roles.push(p.role);
                                }
                                flag = flag || result;
                            }

                            if (flag) {
                                _context.next = 9;
                                break;
                            }

                            throw {
                                "errorCode": 2001,
                                "errorMessage": "You are not authorized to this resource"
                            };

                        case 9:
                            _context.next = 11;
                            return next();

                        case 11:
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