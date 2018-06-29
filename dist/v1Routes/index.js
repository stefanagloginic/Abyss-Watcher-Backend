'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _EarthquakesRoute = require('./EarthquakesRoute');

var _EarthquakesRoute2 = _interopRequireDefault(_EarthquakesRoute);

var _TornadoesRoute = require('./TornadoesRoute');

var _TornadoesRoute2 = _interopRequireDefault(_TornadoesRoute);

var _VolcanoesRoute = require('./VolcanoesRoute');

var _VolcanoesRoute2 = _interopRequireDefault(_VolcanoesRoute);

var _TsunamisRoute = require('./TsunamisRoute');

var _TsunamisRoute2 = _interopRequireDefault(_TsunamisRoute);

var _paths = require('../utils/paths');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*make main router for v1 api*/
var watcher_V1_Router = _express2.default.Router();

/*import all routes that will be used here*/


var welcomeMessage = { message: 'Welcome to Abyss-Watcher!' };

watcher_V1_Router.get('/', function (req, res, next) {
	res.json(welcomeMessage);
});

watcher_V1_Router.use(_paths2.default.earthquakes, _EarthquakesRoute2.default);
watcher_V1_Router.use(_paths2.default.tsunamis, _TsunamisRoute2.default);
watcher_V1_Router.use(_paths2.default.volcanoes, _VolcanoesRoute2.default);
watcher_V1_Router.use(_paths2.default.tornadoes, _TornadoesRoute2.default);

exports.default = watcher_V1_Router;