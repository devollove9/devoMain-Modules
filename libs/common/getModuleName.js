'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

var getModuleName = function getModuleName(dir, tabCount, cap) {
    var p = '';
    var tab = '';
    for (var i = 0; i < tabCount; i++) {
        tab += '    ';
    }
    if (cap === undefined) cap = 'd';
    if (cap === 'c' || cap === 'd' || cap === 'C' || cap === 'n') {
        if (fs.lstatSync(dir).isDirectory()) {
            var pArray = dir.split('/');
            p = pArray.pop();
        } else if (!fs.lstatSync(dir).isDirectory()) {
            var _pArray = dir.split('/');
            p = _pArray.pop();
        } else {
            p = dir;
        }
    } else {
        p = dir;
    }

    if (cap && p) {
        switch (cap) {
            case 'b':
                break;
            case 'n':
                break;
            // Do fist character capital
            case 'c':
                p = tab + p[0].toUpperCase() + p.slice(1);
                break;
            // Do fist character capital with double brackets
            case 'd':
                p = tab + '[' + p[0].toUpperCase() + p.slice(1) + '] ';
                break;
            // Do all character capital
            case 'C':
                p = tab + p.toUpperCase();
                break;
        }
    }
    return p;
}; /**
    * Created by devo on 9/6/2016.
    * Get module name based on directory tabs and should it be capital
    */
exports.default = getModuleName;