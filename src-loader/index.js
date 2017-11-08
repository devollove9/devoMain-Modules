'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by devo on 4/21/2016.
 */
var loader = function loader(url) {
    try {
        return require(url);
    } catch (e) {
        if (e.code == 'MODULE_NOT_FOUND') {
            return require(process.env.PWD + '/' + url);
        }
        throw e;
    }
};
exports.default = loader;