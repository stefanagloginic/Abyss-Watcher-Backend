'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var MongoClient = require('mongodb').MongoClient;

var db = function db() {
	var _this = this;

	(0, _classCallCheck3.default)(this, db);

	this.connect = function (connection_string) {
		var self = _this;

		return new Promise(function (resolve, reject) {
			if (self.db) {
				resolve();
			} else {
				var _self = self;

				MongoClient.connect(connection_string).then(function (database) {
					_self.db = database;

					resolve();
				}, function (err) {
					console.log('Error connecting: ' + err.message);

					reject(err.message);
				});
			}
		});
	};

	this.close = function () {
		if (_this.db) {
			_this.db.close().then(function () {}, function (error) {
				console.log('failed to close the connection to the database: ' + error.message);
			});
		}
	};

	this.db = null;
};

exports.default = db;