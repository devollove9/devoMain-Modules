'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _devomainConstants = require('devomain-constants');

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
   * Created by devo on 10/31/2017.
   */

var s3Service = function s3Service(config) {
    this.config = config;
    if (!config.region) throw _devomainConstants.errors.SERVICES.S3SERVICE_REGION_NOT_DEFINED;
    if (!config.bucket) throw _devomainConstants.errors.SERVICES.S3SERVICE_BUCKET_NOT_DEFINED;
    _awsSdk2.default.config.update({
        accessKeyId: ENV.AWS_ACCESS_KEY_ID,
        secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY
    });
    this.s3 = new _awsSdk2.default.S3();
};

s3Service.prototype.uploadBase64Image = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(bucket, name, data) {
        var type, ext, buf;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = typeof data === 'string' ? data : data.toString();
                        type = data.substr(5, data.search(/;/) - 5);
                        ext = type.split('/')[1];
                        buf = Buffer.allocUnsafe(data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                        _context.next = 6;
                        return this.upload(bucket, name + '.' + ext, buf, {
                            ContentEncoding: 'base64',
                            ContentType: type
                        });

                    case 6:
                        return _context.abrupt('return', name + '.' + ext);

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function uploadBase64Image(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    }

    return uploadBase64Image;
}();

s3Service.prototype.upload = function upload(bucket, dest, data, config) {
    config = config || {};
    config.Bucket = bucket;
    config.Key = dest;
    config.Body = data;
    var self = this;
    return new Promise(function (resolve, reject) {
        self.s3.putObject(config, function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

s3Service.prototype.getSignedUrl = function () {
    return this.s3.getSignedUrl.apply(this.s3, arguments);
};

s3Service.prototype.download = function (bucket, key, file) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.s3.getObject({
            Bucket: bucket,
            Key: key
        }, function (err, data) {
            if (err) return reject(err);
            if (data) {
                console.log(data.Body);
                // fs.writeFileSync(file,data.)
            } else {
                return resolve(null);
            }
        });
    });
};

s3Service.prototype.update = function update(config) {
    if (config.region) {
        _awsSdk2.default.config.update({ region: config.region });
        this.s3 = null;
        this.s3 = new _awsSdk2.default.S3();
    }
    (0, _extend2.default)(true, this.config, config);
};

exports.default = s3Service;