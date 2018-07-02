import express from 'express'
import bodyParser from 'body-parser'
import v1Routes from './v1Routes'
import cors from 'cors'
import path from 'path'


var app = express();

//check for port provided by env
const port = process.env.PORT || 8000;

/*--------------ADD Middleware----------------*/
app.use(bodyParser.urlencoded({ extended: true })); //parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); //parsing application/json

/*----------------ADD Routes-------------------*/
app.use('/abyss-watcher/v1', v1Routes);


/*--------------Integrate client----------------*/
if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'client/build')));
	// Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});
}

/*----------------START LISTENING---------------*/
app.listen(port, function () {
	console.log('Server listening on port ' + port + '!');
});
