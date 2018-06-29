import express from 'express';
import _ from 'lodash';
import paths from '../utils/paths';
import { MongoClient } from 'mongodb'

var earthquakesRouter = express.Router();

earthquakesRouter.route('/')
	.get(
		async function getEarthquakes(req, res, next){
			try {
				var mclient = await MongoClient.connect(paths.mongodb, { useNewUrlParser: true });
				var collection = await mclient.db(paths.natural_disasters_db_str).collection("earthquakes");

				var doesCollectionExist = await mclient.db(paths.natural_disasters_db_str).listCollections({ name: "earthquakes" }).hasNext();
				
				if(!doesCollectionExist) {
					console.log("Collection earthquakes does not exist");
					process.exit();
				}

				var features = await collection.find().toArray();
				res.json(features);
			}
			catch(e) {
				mclient || mclient.close();

				console.log(e);
				process.exit();
			}

			mclient.close();
		})

export default earthquakesRouter;