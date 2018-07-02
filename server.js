import express from 'express'
import bodyParser from 'body-parser'
import v1Routes from './v1Routes'
import cors from 'cors'


var app = express();

//check for port provided by env
var port = process.env.PORT || 8000;

/*--------------ADD Middleware----------------*/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); //parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); //parsing application/json

/*----------------ADD Routes-------------------*/
app.use('/abyss-watcher/v1', v1Routes);

/*----------------START LISTENING---------------*/
app.listen(port, function () {
  console.log('Server listening on port ' + port + '!');
});