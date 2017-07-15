'use strict';

const HttpServer = require('./source/httpServer');
const clusterServer = require('./source/clusterServer');
const app = require('./app')

// instantiate clusterServer with assessor
clusterServer.name = 'clusterServer'; // rename ClusterServer instance
clusterServer.start(new HttpServer(app.phrasesAssessor), app.port); // Start it up!
