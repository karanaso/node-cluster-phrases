const should = require('should');
const request = require('request');
const { Before, Given, When, Then, } = require('cucumber');

const HttpServer = require('../../source/httpServer');
const app = require('../../app');

Before( () => {
  this.port = 3000;
});

Given('that the service is running', () => {
  const server = new HttpServer(app.phrasesAssessor);
  server.listen(this.port);
});

When(/^I call the server and pass to the query string (.*)$/, (param) => {
  this.queryString = param;
  this.url = `http://localhost:${this.port}/?q=${this.queryString}`;
});

Then(/^I should get back (.*)$/,  (validReponse,callback) => {
   request(this.url, (err,response,body) => {
    body.should.eql(validReponse);
    callback( null );
  });
});
