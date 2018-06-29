import express from 'express'
import _ from 'lodash'
import fs from 'fs'
import { MongoClient } from 'mongodb'
import paths from './paths'

var jsonPath = process.argv[2];
var collectionName = process.argv[3];

async function main(){
// obtain and try to insert the file
try {
	var data = fs.readFileSync(jsonPath, 'utf8');
	var json = JSON.parse(data);
	_.forEach(json, (value, key) => {
		if(value.features) {
			json = value.features;
		}
	});

	var mclient = await MongoClient.connect(paths.mongodb, { useNewUrlParser: true });
	var collection = await mclient.db(paths.natural_disasters_db_str).collection(collectionName);
	
	// if collection already exists just delete it and re-insert..
	var doesCollectionExist = await mclient.db(paths.natural_disasters_db_str).listCollections({ name: collectionName }).hasNext();
	
	if(doesCollectionExist) {
		await collection.drop();
		collection = await mclient.db(paths.natural_disasters_db_str).collection(collectionName);
	}

	var updatedDoc = await collection.insertMany(json);
	
	if(updatedDoc.result.ok === 1) {
		console.log("successful insertion")
	}else {
		console.log("insertion failed");
	}
}
catch(e) {
	mclient || mclient.close();

	console.log(e);
	process.exit();
}

mclient.close();
};

main();