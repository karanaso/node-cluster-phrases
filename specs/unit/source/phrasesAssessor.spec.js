const should = require('should');
const rewire = require('rewire');
const os = require('os');

const phrasesAssessor = rewire('../../../source/phrasesAssessor');

describe('phrasesAssessor.js', () => {
  let textData;

  beforeEach(() => {
    textData = 'hypertensive disorder' + os.EOL +
      'acid reflosux' + os.EOL +
      'gastritus';
  });

  describe('textDataToArray', () => {
    it('should be an empyt array if no data are present', () => {
      const textDataToArray = phrasesAssessor.__get__('textDataToArray');
      textDataToArray().should.have.length(0);
    });

    it('should return an array with three objects', () => {
      const textDataToArray = phrasesAssessor.__get__('textDataToArray');
      const expectedResult = ['hypertensive disorder', 'acid reflosux', 'gastritus'];
      textDataToArray(textData).should.have.length(3);
    });

    it('first item should be "hypertensive disorder"', () => {
      const textDataToArray = phrasesAssessor.__get__('textDataToArray');
      textDataToArray(textData)[0].should.equal('hypertensive disorder')
    });

    it('second item should be "acid reflosux"', () => {
      const textDataToArray = phrasesAssessor.__get__('textDataToArray');
      textDataToArray(textData)[1].should.equal('acid reflosux');
    });

    it('third item should be "gastritus"', () => {
      const textDataToArray = phrasesAssessor.__get__('textDataToArray');
      textDataToArray(textData)[2].should.equal('gastritus');
    });
  });

  describe('transformToObj', () => {
    let transformToObj;
    let obj;

    beforeEach(() => {
      transformToObj = phrasesAssessor.__get__('transformToObj');
      obj = phrasesAssessor.__get__('obj');
    });

    it('should create an internal object "obj" to hold keys and values', () => {
      transformToObj(['a b c']);
      obj.should.exist;
      Object.keys(obj).should.have.length(1);
    });

    it('the key should be in lowerCase', () => {
      transformToObj(['A B C']);
      obj['a_b_c'].should.exist;
    });

    it('should replace spaces with underscore', () => {
      transformToObj(['a b c']);
      obj['a_b_c'].should.exist;
    });

    it('should set the value to 0 to for a non existing key', () => {
      transformToObj(['a b c']);
      obj['a_b_c'].should.equal(0);
    });

    it('should not increase the value of a key if found twice', () => {
      transformToObj(['a b c']);
      transformToObj(['a b c']);
      obj['a_b_c'].should.equal(0);
    });
  });

  describe('prepareData', () => {
    it('should prepare the data for processing into obj', () => {
      const obj = phrasesAssessor.prepareData(textData);
      Object.keys(obj).should.have.length(4);
      obj['a_b_c'].should.equal(0);;
      obj['hypertensive_disorder'].should.equal(0);
      obj['acid_reflosux'].should.equal[0];
      obj['gastritus'].should.equal(0);
    });
  });

  describe('increaseCounterForKeys', () => {
    it('should increase counters for ["gastritus","hypertensive_disorder"]', () => {
      const increaseCounterForKeys = phrasesAssessor.__get__('increaseCounterForKeys');
      const obj = phrasesAssessor.__get__('obj');
      increaseCounterForKeys(["gastritus", "hypertensive_disorder"]);
      obj['gastritus'].should.equal(1);
      obj['hypertensive_disorder'].should.equal(1);
    });
  });

  describe('underScoresToSpaces', () => {
    it('should return "hypertensive disorder" for key ["hypertensive_disorder"]', () => {
      const underScoresToSpaces = phrasesAssessor.__get__('underScoresToSpaces');
      const obj = phrasesAssessor.__get__('obj');
      underScoresToSpaces(["hypertensive_disorder"])[0].should.equal('hypertensive disorder')
    });
  });

  describe('assessPhrase', () => {
    it('should return only "gastritus" from phrase "I have gastritus"', () => {
      phrasesAssessor.assessPhrase('I have gastritus')[0].should.equal('gastritus');
    });

    it('should return only "hypertensive_disorder" phrase "I have hypertensive disorder"', () => {
      phrasesAssessor.assessPhrase('I have hypertensive disorder')[0].should.equal('hypertensive disorder');
    });

    it('should return ["gastritus","hypertensive disorder" from phrase "I think I gastritus and hypertensive disorder"', () => {
      const phrase = "I think I gastritus and hypertensive disorder";
      const results = phrasesAssessor.assessPhrase(phrase);
      results.indexOf('hypertensive disorder').should.be.above(-1);
      results.indexOf('gastritus').should.be.above(-1);
    });
  });
});