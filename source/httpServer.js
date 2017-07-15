'use strict';

const http = require('http');
const url = require('url');
const helpers = require('./helpers');

const HttpServer = function(assessor) {
  return http.createServer(function (request, response) {
    response.writeHead(200, {
      'Content-type': 'text/plain'
    });
    
    const queryString = url.parse(request.url, true);
    const phrase = queryString.query.q;
    const assessorResponse = assessor.assessPhrase( phrase );
    response.end(helpers.ArrayToStringArrayRepresentation(assessorResponse));
  });
}

module.exports = HttpServer;