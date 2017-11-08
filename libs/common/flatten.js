'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by devo on 11/1/2017.
 */

var flatten = function flatten(obj) {
    var toReturn = {};
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;

        if (obj[i].constructor == Object) {
            var flatObject = flatten(obj[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};

exports.default = flatten;