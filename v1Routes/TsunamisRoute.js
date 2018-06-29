import express from 'express';
import _ from 'lodash';
import paths from '../utils/paths';
import { MongoClient } from 'mongodb'

var tsunamisRouter = express.Router();

tsunamisRouter.route('/')
	.get(
		async function getTsunamis(req, res, next){
			// http://localhost:8000/abyss-watcher/v1/tsunamis?year=2012
			const { year } = req.query;

			var qYear = parseInt(year);

			var query = (Number.isInteger(qYear)) ? { "properties.Year" : qYear } : {}

			try {
				var mclient = await MongoClient.connect(paths.mongodb, { useNewUrlParser: true });
				var collection = await mclient.db(paths.natural_disasters_db_str).collection("tsunamis");

				var doesCollectionExist = await mclient.db(paths.natural_disasters_db_str)
					.listCollections({ name: "tsunamis" }).hasNext();
				
				if(!doesCollectionExist) {
					console.log("Collection tsunamis does not exist");
					process.exit();
				}

				var features = await collection.find(query).toArray();
				res.json(features);
			}
			catch(e) {
				mclient && mclient.close();

				console.log(e);
				process.exit();
			}

			mclient.close();
		});

export default tsunamisRouter