import express from 'express';
import _ from 'lodash';
import paths from '../utils/paths';
import { MongoClient } from 'mongodb'

var tornadoesRouter = express.Router();

tornadoesRouter.route('/')
	.get(
		async function getTornadoes(req, res, next){
			try {
				// http://localhost:8000/abyss-watcher/v1/tornadoes?year=2012
				const { year } = req.query;

				var qYear = parseInt(year);

				var mclient = await MongoClient.connect(paths.mongodb, { useNewUrlParser: true });
				var collection = await mclient.db(paths.natural_disasters_db_str).collection("tornadoes");

				var doesCollectionExist = await mclient.db(paths.natural_disasters_db_str).listCollections({ name: "tornadoes" }).hasNext();
				
				if(!doesCollectionExist) {
					console.log("Collection tornadoes does not exist");
					process.exit();
				}

				// if year is specified find by the year against the available dates, 
				// otherwise find all instances
				var features = (Number.isInteger(qYear)) ?
					await collection.find({"properties.Date" : new RegExp("." + qYear.toString()) }).toArray() : 
					await collection.find().toArray();

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

export default tornadoesRouter;