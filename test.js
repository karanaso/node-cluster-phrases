const fileReader = require('./source/fileReader');
const phrasesAssessor = require('./source/phrasesAssessor');
const port = 3000;

// read phrases
const data = fileReader.readFile('./phrases');
phrasesAssessor.prepareData( data );


const phrase = "I have a sore throat and headache";

arrWords = phrase.split(' ')

const phrases=[];
for(n1=0;n1<arrWords.length;n1++) {
    phrases.push( arrWords[n1] );
    for(n2=0;n2<arrWords.length-n1;n2++) {
        if (n2 !== 0) {
            phrases.push( phrases[phrases.length-1] +' '+ arrWords[n1+n2] )
        } 
    }
}

const result = phrasesAssessor.assessPhrase2( phrases );
console.log( result );

// console.log(phrases);