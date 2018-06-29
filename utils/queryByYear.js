import express from 'express'
import _ from 'lodash'
import { MongoClient } from 'mongodb'
import paths from './paths'

var collectionName = process.argv[2];
var year = parseInt(process.argv[3]);

async function main(){
// obtain and try to insert the file
try {
	var mclient = await MongoClient.connect(paths.mongodb, { useNewUrlParser: true });
	var collection = await mclient.db(paths.natural_disasters_db_str).collection(collectionName);
	
	// if collection already exists just delete it and re-insert..
	var doesCollectionExist = await mclient.db(paths.natural_disasters_db_str).listCollections({ name: collectionName }).hasNext();
	
	if (!doesCollectionExist) {
		console.log("Collection " + collectionName + " does not exist");
		process.exit();
	}

	var features = await collection.find({ "properties.Year" : year }).toArray();

	console.log(features);
	console.log(features.length);
}
catch(e) {
	mclient || mclient.close();

	console.log(e);
	process.exit();
}

mclient.close();
};

main();