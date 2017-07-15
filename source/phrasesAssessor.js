'use strict';
const os = require('os');

let phrases = [];
let obj = {};
let arrayOfKeys = [];

function textDataToArray(textData) {
  return (textData) ? textData.split(os.EOL) : [];
}


function transformToObj(data) {
  //you can choose to clean or add data to obj here
  data.forEach(item => {
    const obj2String = item.replace(/ /g, '_');
    obj[obj2String] = 0;
  });
  
  arrayOfKeys = Object.keys(obj);
  return obj;
}

function prepareData(text) {
  return transformToObj(textDataToArray(text));
}

function increaseCounterForKeys( keys ) {
  keys.forEach( key => obj[key]++ );
}

function getCountersForKeys( keys ) {
  return keys.map( key => `${key}=${obj[key]}`);
}

function spacesToUnderScore( phrase ) {
  return phrase.split(' ').join('_');
}

function underScoresToSpaces( keys ) {
  return keys.map( key => key.split('_').join(' ') );
}

function assessPhrase( phrase, consoleStats ) {
  const phraseWithUnderScore = spacesToUnderScore(phrase);
  const keys = arrayOfKeys.filter( (key) => (key!=='') && (phraseWithUnderScore.includes(key)) );
  
  if (consoleStats) {
    increaseCounterForKeys(keys);
    console.log(getCountersForKeys(keys));
  }
  
  return underScoresToSpaces(keys);
}

module.exports = {
  prepareData,
  assessPhrase
}