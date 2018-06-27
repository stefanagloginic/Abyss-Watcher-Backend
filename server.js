import express from 'express'
import bodyParser from 'body-parser'
import v1Routes from './v1Routes'

var app = express();

//check for port provided by env
var port = process.env.PORT || 8000;

/*----------------ADD Routes-------------------*/
app.use('/abyss-watcher/v1', v1Routes);

/*----------------START LISTENING---------------*/
app.listen(port, function () {
  console.log('Server listening on port ' + port + '!');
});