'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerSesTransport = require('nodemailer-ses-transport');

var _nodemailerSesTransport2 = _interopRequireDefault(_nodemailerSesTransport);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Created by devo on 10/31/2017.
 */
function EmailService(config) {
    if (!(this instanceof EmailService)) return new EmailService(config);
    this.config = config;
    this.mailer = _nodemailer2.default.createTransport((0, _nodemailerSesTransport2.default)({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    }));
}

EmailService.prototype.send = function send(frm, to, subject, body, html, opts) {
    html = html || false;
    var mail = {};
    mail.from = frm;
    mail.to = to;
    mail.subject = subject;
    if (html) {
        mail.html = body;
    } else {
        mail.text = body;
    }
    opts = opts || {};
    Object.keys(opts).forEach(function (key) {
        mail[key] = opts[key];
    });
    var self = this;
    return new Promise(function (resolve, reject) {
        self.mailer.sendMail(mail, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
            self = null;
        });
    });
};

exports.default = EmailService;