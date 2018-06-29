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

var tornadoesRouter = _express2.default.Router();

tornadoesRouter.route('/').get(function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
		var year, qYear, mclient, collection, doesCollectionExist, features;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;

						// http://localhost:8000/abyss-watcher/v1/tornadoes?year=2012
						year = req.query.year;
						qYear = parseInt(year);
						_context.next = 5;
						return _mongodb.MongoClient.connect(_paths2.default.mongodb, { useNewUrlParser: true });

					case 5:
						mclient = _context.sent;
						_context.next = 8;
						return mclient.db(_paths2.default.natural_disasters_db_str).collection("tornadoes");

					case 8:
						collection = _context.sent;
						_context.next = 11;
						return mclient.db(_paths2.default.natural_disasters_db_str).listCollections({ name: "tornadoes" }).hasNext();

					case 11:
						doesCollectionExist = _context.sent;


						if (!doesCollectionExist) {
							console.log("Collection tornadoes does not exist");
							process.exit();
						}

						// if year is specified find by the year against the available dates, 
						// otherwise find all instances

						if (!Number.isInteger(qYear)) {
							_context.next = 19;
							break;
						}

						_context.next = 16;
						return collection.find({ "properties.Date": new RegExp("." + qYear.toString()) }).toArray();

					case 16:
						_context.t0 = _context.sent;
						_context.next = 22;
						break;

					case 19:
						_context.next = 21;
						return collection.find().toArray();

					case 21:
						_context.t0 = _context.sent;

					case 22:
						features = _context.t0;


						res.status(200);
						res.json(features);
						_context.next = 33;
						break;

					case 27:
						_context.prev = 27;
						_context.t1 = _context['catch'](0);

						mclient && mclient.close();
						res.status(500).send("Internal server error: " + _context.t1.message);

						console.log(_context.t1);
						process.exit();

					case 33:

						mclient.close();

					case 34:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[0, 27]]);
	}));

	function getTornadoes(_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	}

	return getTornadoes;
}());

exports.default = tornadoesRouter;