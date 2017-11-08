'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailService = undefined;

var _emailService = require('./emailService');

var _emailService2 = _interopRequireDefault(_emailService);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// import s3Service from './s3Service'
// import snsService from './snsService'

var services = {
  emailService: _emailService2.default
  // s3Service: s3Service,
  // snsService: snsService
}; /**
    * Created by devollove9 on 2017/10/26.
    * All services
    * Requested packages:
    *  nodemailer
    *  node-ses-transport
    *  aws-sdk
    *  extend
    */

exports.emailService = _emailService2.default;
exports.default = services;