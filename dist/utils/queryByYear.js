'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
		var mclient, collection, doesCollectionExist, features;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return _mongodb.MongoClient.connect(_paths2.default.mongodb, { useNewUrlParser: true });

					case 3:
						mclient = _context.sent;
						_context.next = 6;
						return mclient.db(_paths2.default.natural_disasters_db_str).collection(collectionName);

					case 6:
						collection = _context.sent;
						_context.next = 9;
						return mclient.db(_paths2.default.natural_disasters_db_str).listCollections({ name: collectionName }).hasNext();

					case 9:
						doesCollectionExist = _context.sent;


						if (!doesCollectionExist) {
							console.log("Collection " + collectionName + " does not exist");
							process.exit();
						}

						_context.next = 13;
						return collection.find({ "properties.Year": year }).toArray();

					case 13:
						features = _context.sent;


						console.log(features);
						console.log(features.length);
						_context.next = 23;
						break;

					case 18:
						_context.prev = 18;
						_context.t0 = _context['catch'](0);

						mclient || mclient.close();

						console.log(_context.t0);
						process.exit();

					case 23:

						mclient.close();

					case 24:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[0, 18]]);
	}));

	return function main() {
		return _ref.apply(this, arguments);
	};
}();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongodb = require('mongodb');

var _paths = require('./paths');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collectionName = process.argv[2];
var year = parseInt(process.argv[3]);

;

main();