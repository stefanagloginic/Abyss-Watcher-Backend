import express from 'express';

/*import all routes that will be used here*/
import paths from '../utils/paths';

/*make main router for v1 api*/
var watcher_V1_Router = express.Router();

var welcomeMessage = { message: 'Welcome to Abyss-Watcher!' };

watcher_V1_Router.get('/', function(req, res, next){
	res.json(welcomeMessage);
});

export default watcher_V1_Router;