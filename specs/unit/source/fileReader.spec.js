const should = require('should');
const fileReader = require('../../../source/fileReader');

describe('fileReader.js', () => {
    
    it('should return empty string if file does not exists', () => {
        const data = fileReader.readFile('./specs/unit//helpers/file-does-not-exists');
        data.should.equal('');
    });

    it('should return the contents of the file if they exist', () => {
        const data = fileReader.readFile('./specs/unit/helpers/data-phrases');
        data.should.equal('hypertensive disorder');
    });
})