import express from 'express';
import _ from 'lodash';
import paths from '../utils/paths';
import { MongoClient } from 'mongodb'

var volcanoesRouter = express.Router();

volcanoesRouter.route('/')
	.get(
		async function getTornadoes(req, res, next){
			try {
				// http://localhost:8000/abyss-watcher/v1/tornadoes?year=2012
				const { year } = req.query;

				var qYear = parseInt(year);

				var query = (Number.isInteger(qYear)) ? { "properties.Year" : qYear } : {}

				var mclient = await MongoClient.connect(paths.mongodb, { useNewUrlParser: true });
				var collection = await mclient.db(paths.natural_disasters_db_str).collection("volcanoes");

				var doesCollectionExist = await mclient.db(paths.natural_disasters_db_str).listCollections({ name: "volcanoes" }).hasNext();
				
				if(!doesCollectionExist) {
					console.log("Collection volcanoes does not exist");
					process.exit();
				}

				// if year is specified find by the year against the available dates, 
				// otherwise find all instances
				var features = await collection.find(query).toArray();

				res.status(200);
				res.json(features);
			}
			catch(e) {
				mclient && mclient.close();
				res.status(500).send("Internal server error: " + e.message);

				console.log(e);
				process.exit();
			}

			mclient.close();
		})

export default volcanoesRouter;