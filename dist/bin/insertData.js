'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
		var data, json, mclient, collection, doesCollectionExist, updatedDoc;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						data = _fs2.default.readFileSync(jsonPath, 'utf8');
						json = JSON.parse(data);

						_lodash2.default.forEach(json, function (value, key) {
							if (value.features) {
								json = value.features;
							}
						});

						_context.next = 6;
						return _mongodb.MongoClient.connect(_paths2.default.mongodb, { useNewUrlParser: true });

					case 6:
						mclient = _context.sent;
						_context.next = 9;
						return mclient.db(_paths2.default.natural_disasters_db_str).collection(collectionName);

					case 9:
						collection = _context.sent;
						_context.next = 12;
						return mclient.db(_paths2.default.natural_disasters_db_str).listCollections({ name: collectionName }).hasNext();

					case 12:
						doesCollectionExist = _context.sent;

						if (!doesCollectionExist) {
							_context.next = 19;
							break;
						}

						_context.next = 16;
						return collection.drop();

					case 16:
						_context.next = 18;
						return mclient.db(_paths2.default.natural_disasters_db_str).collection(collectionName);

					case 18:
						collection = _context.sent;

					case 19:
						_context.next = 21;
						return collection.insertMany(json);

					case 21:
						updatedDoc = _context.sent;

						if (updatedDoc.result.ok === 1) {
							console.log("successful insertion");
						} else {
							console.log("insertion failed");
						}
						_context.next = 30;
						break;

					case 25:
						_context.prev = 25;
						_context.t0 = _context['catch'](0);

						mclient || mclient.close();

						console.log(_context.t0);
						process.exit();

					case 30:

						mclient.close();

					case 31:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[0, 25]]);
	}));

	return function main() {
		return _ref.apply(this, arguments);
	};
}();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mongodb = require('mongodb');

var _paths = require('./paths');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var jsonPath = process.argv[2];
var collectionName = process.argv[3];

;

main();