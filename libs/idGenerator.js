'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = require('underscore');

var _microtime = require('microtime');

var _microtime2 = _interopRequireDefault(_microtime);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Created by devollove9 on 2017/10/27.
 */
exports.default = function (machineId, groupId) {
    machineId = machineId || ENV.MACHINE;
    groupId = groupId || ENV.GROUP;
    groupId = parseInt(groupId.toString().substr(0, 1)).toString();
    var machine = _underscore.string.pad(machineId.toString(16), 4, '0');
    var pid = _underscore.string.pad(process.pid.toString(16), 4, '0');
    var i = _microtime2.default.now().toString(16);
    return groupId + machine + pid + i;
};