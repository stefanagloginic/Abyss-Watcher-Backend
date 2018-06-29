'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _paths = require('../utils/paths');

var _paths2 = _interopRequireDefault(_paths);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var volcanoesRouter = _express2.default.Router();

volcanoesRouter.route('/').get(function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
		var year, qYear, query, mclient, collection, doesCollectionExist, features;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;

						// http://localhost:8000/abyss-watcher/v1/tornadoes?year=2012
						year = req.query.year;
						qYear = parseInt(year);
						query = Number.isInteger(qYear) ? { "properties.Year": qYear } : {};
						_context.next = 6;
						return _mongodb.MongoClient.connect(_paths2.default.mongodb, { useNewUrlParser: true });

					case 6:
						mclient = _context.sent;
						_context.next = 9;
						return mclient.db(_paths2.default.natural_disasters_db_str).collection("volcanoes");

					case 9:
						collection = _context.sent;
						_context.next = 12;
						return mclient.db(_paths2.default.natural_disasters_db_str).listCollections({ name: "volcanoes" }).hasNext();

					case 12:
						doesCollectionExist = _context.sent;


						if (!doesCollectionExist) {
							console.log("Collection volcanoes does not exist");
							process.exit();
						}

						// if year is specified find by the year against the available dates, 
						// otherwise find all instances
						_context.next = 16;
						return collection.find(query).toArray();

					case 16:
						features = _context.sent;


						res.status(200);
						res.json(features);
						_context.next = 27;
						break;

					case 21:
						_context.prev = 21;
						_context.t0 = _context['catch'](0);

						mclient && mclient.close();
						res.status(500).send("Internal server error: " + _context.t0.message);

						console.log(_context.t0);
						process.exit();

					case 27:

						mclient.close();

					case 28:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[0, 21]]);
	}));

	function getTornadoes(_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	}

	return getTornadoes;
}());

exports.default = volcanoesRouter;