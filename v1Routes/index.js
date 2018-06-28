import express from 'express';
import earthquakesRouter from './EarthquakesRoute'
import tornadoesRouter from './TornadoesRoute'
import volcanoesRouter from './VolcanoesRoute'
import tsunamisRouter from './TsunamisRoute'

/*import all routes that will be used here*/
import paths from '../utils/paths';

/*make main router for v1 api*/
var watcher_V1_Router = express.Router();

var welcomeMessage = { message: 'Welcome to Abyss-Watcher!' };

watcher_V1_Router.get('/', function(req, res, next){
	res.json(welcomeMessage);
});

watcher_V1_Router.use(paths.earthquakes, earthquakesRouter);
watcher_V1_Router.use(paths.tsunamis, tsunamisRouter);
watcher_V1_Router.use(paths.volcanoes, volcanoesRouter);
watcher_V1_Router.use(paths.tornadoes, tornadoesRouter);

export default watcher_V1_Router;