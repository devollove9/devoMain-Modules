"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by devollove9 on 2017/10/26.
 */
var send = function send(ctx, body) {
    ctx.response.status = 200;
    ctx.result = {
        data: body,
        error: {}
    };
    ctx.body = JSON.stringify({
        data: body,
        error: {}
    });
};

exports.default = send;