const config = require('../../config');
const {MongoClient} = require("mongodb");

// Connection URI
const uri = config.mongoDb.endpoint;
const options = config.mongoDb.options;

exports.client = new MongoClient(uri, options);
