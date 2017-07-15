'use strict';

const http = require('http');
const url = require('url');
const helpers = require('./helpers');

function createCombinationsFromString(phrase) {
  const arrWords = phrase.split(' ');
  const phrases = [];
  for (let n1 = 0; n1 < arrWords.length; n1++) {
    phrases.push(arrWords[n1]);
    for (let n2 = 0; n2 < arrWords.length - n1; n2++) {
      if (n2 !== 0) {
        phrases.push(phrases[phrases.length - 1] + ' ' + arrWords[n1 + n2])
      }
    }
  }

  return phrases;
}

const HttpServer = function (assessor) {
  return http.createServer(function (request, response) {
    response.writeHead(200, {
      'Content-type': 'text/plain'
    });

    const queryString = url.parse(request.url, true);
    const phrase = queryString.query.q;
    const phrases = createCombinationsFromString(phrase);
    const assessorResponse = assessor.assessPhrase2(phrases);
    response.end(helpers.ArrayToStringArrayRepresentation(assessorResponse));
  });
}

module.exports = HttpServer;