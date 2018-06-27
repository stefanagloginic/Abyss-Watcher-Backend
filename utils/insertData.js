var express = require('express')
	_ = require('lodash')
	db = require('./db')
	fs = require('fs');

var jsonPath = process.argv[2];
var collectionName = process.argv[3];

// obtain and try to insert the file
var mydocuments = fs.readFile(jsonPath, 'utf8', function(err, data) {
	if(err) {
		throw err;
	}

	insertDocument(JSON.parse(data));

});

function insertDocument(json) {
	var database = new db();
	
	database.connect('mongodb://localhost:27017')
		.then(
			function(){
				database.db.collection(collectionName, function(err, collection){
					if(err){
						console.log("Could not access collection: " + err.message);
						reject(err.message);
					}
					else{
						database.db.collection.update(collectionName, json, { upsert : true }, function(err, req){
							if(err){
								console.log("Failed to add record to database " + err);
								reject(err.message);
							}
							else if(req.insertedCount === 1){
								// success send back a status code and maybe the id of the object
								console.log("Added " + collectionName + " to database")
								resolve();
							}
							else{
								console.log("Failed to add record to database");
								reject(err.message);
							}
						})
					}
				})
			})

	database.close();
}