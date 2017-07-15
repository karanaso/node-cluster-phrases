'use strict';

const should = require('should');
const helpers = require('../../../source/helpers');

describe('helpers.js', () => {
  it('should return an array like format in string', () => {
    helpers.ArrayToStringArrayRepresentation(
      [
        "a",
        "b",
        "c"
      ]
    ).should.equal('["a","b","c"]')
  });
})