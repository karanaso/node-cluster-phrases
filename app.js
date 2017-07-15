'use strict';

const fileReader = require('./source/fileReader');
const phrasesAssessor = require('./source/phrasesAssessor');
const port = 3000;

// read phrases
const data = fileReader.readFile('./phrases');
phrasesAssessor.prepareData( data );

module.exports = {
    phrasesAssessor,
    port:port
}
